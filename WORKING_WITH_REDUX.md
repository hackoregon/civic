# Working with Redux

Redux is how state flows through Civic applications. It is an implementation of the [Flux Architecture](https://facebook.github.io/flux/) that's used to handle user and API interactions ([actions](https://redux.js.org/basics/actions)), manage state transformations ([reducers](https://redux.js.org/basics/reducers)), and provide data to UI components ([selectors](https://redux.js.org/recipes/computing-derived-data)). It does this by maintaining a single global, immutable store.



## Brief Glossary

- **Flux:** A pattern for maintaining application state that mandates unidirectional data flow. Data is provided to components and instead of components mutating that data, components instead communicate intent. Those intentions are handled by a system outside of components that mutates data. Once mutated, that data is provided back to components to update the components state.

- **State**: The representation of user interface as a data structure. A radio group with an active selection may look like this:

  ````js
  {
    radioOptions: [
      { name: 'One' },
      { name: 'Two', selected: true },
      { name: 'Three' }
    ]
  }
  ````

- **Actions:** Plain objects that act as messages. They get dispatched by components and interpreted by reducers.

- **Action Emitter:** A pure function that generates an action. Action emitters typically operate on a single type of action and are used to attach a payload.

- **Reducers:** Pure functions that take a state object and an action. The reducer creates a derivative of the supplied state object based on the action. The derivative of the supplied state object is returned.

- **Store:** A single immutable plain object that represents all application state. This can be a very large object, but only pieces of it are used at a time.

- **Selectors:** Memoized functions that take a state object and return either a piece of the full state object or derived state.

- **Derived State:** A computed value from stored state. To use the radio group example above, it may be useful to know the total count of options. This count property doesn't need to be in the state object. If it were, that's a place where state can get out of sync. Instead it can be computed on demand:

  ```js
  getCountOfRadioOptions = state => state.radioOptions.length
  ```



## Architecture

Using only the primitives described above, entire applications can be organized and constructed. The sequence of events goes:

1. The initial store state is used to render React components
2. A component dispatches an action
3. The action is handled by the global reducer
4. The global reducer takes the current state and the action to compute the new state
5. The new state returned from the global reducer is the new store state
6. This new store state is used to re-render React components

## Integrating Redux with React

At this point, it's clear that React is used for rendering the UI and Redux is used for managing application state. What hasn't been addressed yet is how React and Redux communicate with each other.

The answer is `connect`.

`connect` is a higher-order function that is used to connect the Redux store with a React component. It does this by mapping dispatch to props (actions) and mapping state to props (selectors). Redux takes separation of concerns very seriously, which is why `connect` returns a function, not a component. In theory, this returned function that closes over the mapped dispatch and state can be used for any number of components. In practice, the mapping of dispatch and state is very specific to components.

The function returned by `connect` needs to be called with a component as the only argument, which yields a new component that is connected to the redux store. The whole thing looks like this:

```js
import { setSelectedOpion } from './actions';
import { getAvailableRadioOptions, getSelectedRadioOption } from './selectors';

const RadioGroup = ({ selectOption, allOptions, selectedOption }) => (
  {allOptions.map(option => (
    <label>
      <input
         type="radio"
         selected={option === selectedOption}
         key={option.name}
         value={option.name} />
      <span>{option.name}</span>
    </label>
  ))}
);

const mapDispatchToProps = dispatch => ({
  selectOption: option => dispatch(setSelectedOption(option))
});
const mapStateToProps = state => ({
  allOptions: getAvailableRadioOptions(state),
  selectedOption: getSelectedRadioOption(state),
});

const reusableConnector = connect(mapDispatchToProps, mapStateToProps);
export default reusableConnector(RadioGroup);
```



Redux likes to use the terms Presentational Component and Container Component to differentiate components that aren't connected to the store (Presentational) from those that are (Container). It's important to remember that this differentiation is only used to explain how each type of component is used. Under the hood, both types of components are the one and only React Component.

[Further reading on integrating React and Redux](https://redux.js.org/basics/usage-with-react)

## How Civic Uses Redux

Redux leaves a fair amount of room for interpretation when it comes to file layout, asynchronous behaviors, and general best practices.

Some common patterns that work for Civic have emerged over the course of 2017.

### Where to put Redux code

In each project there is a `src/state` directory that is dedicated to Redux-specific code. This means actions, reducers, and selectors. The `index.js` file in this directory has to export the combined reducer for the entire project. That is all that this file is for.

Beyond that, Civic uses a loose riff on the [Ducks](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be) pattern, which organizes Redux code separate from React code and by feature, not Redux primitive. This means each concept (e.g., a story card) gets its own directory in `src/state`. In that directory there is:

1. An `index.js` file that exports the feature's reducer
2. An `actions.js` file that exports the feature's actions
3. A `selectors.js` file that exports the feature's selectors
4. A test file named after the feature that includes unit tests for the actions, the selectors, and the reducer.

Common utilities can still be kept outside of the feature directory and imported. A great aspect of Redux is how simple all the data structures are. It makes writing new features ripe with opportunities for extracting reusable code or importing general solutions to common problems from npm.

Writing all the code for a feature in its own directory isn't quite enough to get things working. Recall that the `index.js` file in `src/state` is just there to combine reducers. The reducers that file combines are the reducers defined in each duck's `index.js` file.

This ends up looking something like this:

```js
import { combineReducers } from 'redux';
import duckOne from './duck-one';
import duckTwo from './duck-two';

export default function createReducer(asyncReducers) {
  return combineReducers({
    duckOne,
    duckTwo,
    ...asyncReducers,
  });
}
```

[See this in action](https://github.com/hackoregon/civic/tree/master/packages/2018-example-farmers-markets/src/state/portland-farmers-markets).

### Fetching data from an API

Redux doesn't have an out-of-the-box solution for asynchronous actions. From the Redux point-of-view there is no such thing as an asynchronous action. Every action is synchronous, and if you are working with asynchronous code, then you will want to dispatch actions during different phases of the async control flow.

A concrete example of this is an API call. Redux implementation aside, an API call works like this:

1. Based on a user action or initial page load, an API call is made
2. A loading state (be it a loading spinner or skeleton component) is shown while the API call is waiting for a response.
3. The API response arrives either successfully or with an error.
4. Upon success, the loading state goes away and is replaced with the loaded state
5. Upon failure, the loading state goes away and is replaced with an error message.

To look at this flow with Redux goggles on, there are three actions and some reactions.

1. **Action:** API request is made

   **Reaction:** UI shows a loading state

2. **Action:** API request succeeds

   **Reaction:** The data from the API response is used to show the UI loaded state

3. **Action:** API request fails

   **Reaction:** UI shows an error state

Knowing what we know about how Redux and React integrate, we can imagine how each of these actions affect the store and in turn are provided to components via `mapStateToProps`.

The tricky part is where does the asynchronous code live? Is it the component that makes the API request? That seems wrong, since components are for presentation, not data loading. Is it a Redux action that makes this request? That seems right, but we already deemed that not possible since actions are always synchronous.

There are various libraries that extend the utility of actions to better handle asynchronous control flow. The one we use is [Thunk](https://github.com/reduxjs/redux-thunk), named after a [similar concept in other places in computer science](https://en.wikipedia.org/wiki/Thunk). Thunks essentially introduce a new kind of action emitter.

In plain Redux, action emitters are functions that return actions. Typically in one of these two forms:

```js
const ACTION_ONE = 'ACTION/ONE';
const ACTION_TWO = 'ACTION/TWO';

// Return a static action
const emitterOne = () => ({ type: ACTION_ONE });

// Return a dynamic action that requires additional information
// known at the callsite.
const emitterTwo = context => ({ type: ACTION_TWO, context: { ...context } });
```

The new kind of action emitter introduced by Thunks is a function that returns a function that dispatches actions. This can be hard to follow, so here is an example of how this plays out.

```js
// This code builds on the previous snippet

const emitterThree = () => dispatch => {
  dispatch(emitterOne());
  return fetch('/some/url')
    .then(res => res.json())
    .then(json => emitterTwo(json));
}

//
// Breaking down how emitterThree is called
//

// emitterThree is a function that takes no arguments and returns a function
const actionEmitter = emitterThree();

// The returned function from emitterThree requires the dispatch function as
// its only argument. Redux handles calling the action emitter as well as calling
// this resulting function with the dispatch function when emitter three is dispatched.
actionEmitter(dispatch);

//
// The following is the order of events when the thunk is called
//

// First, emitterOne is dispatched
dispatch(emitterOne());

// Second, the fetch request is made
fetch('/some/url');

// Time passes, since fetch is asynchronous

// Once the fetch promise resolves, the response is parsed as JSON
// This isn't related to Redux or Thunks, it's just part of the fetch API
.then(res => res.json());

// Once the response is parsed as JSON, emitterTwo is dispatched
.then(json => emitterTwo(json));
```

Since the result of `emitterOne` and `emitterTwo` are objects, Redux knows to handle these the normal way by providing the action to the reducer. Since the result of `emitterThree` is a function, the Thunk middleware intercepts the action and calls it with the dispatch function, avoiding the reducer altogether.

This way, in our actions, we have a reference to `dispatch` where we can manage asynchronous control flow while dispatching any number of synchronous actions when needed.

[See this in action](https://github.com/hackoregon/civic/blob/master/packages/2018-example-farmers-markets/src/state/import-adapter.js).

### Integrating Redux with the Component Library

Every component in the component library has been written to be as stateless as possible. Instead of user actions within components calling `setState` to mutate state and affect visual representation, components expect all state as props AND expect all event handlers as props.

By using this type of interface, components in the component library are already designed with Redux in mind. Using `mapDispatchToProps` to provide event handlers as props and `mapStateToProps` to provide state props results in a component from the component library connected to the Redux store.

More often than not, it is an unnecessary level of abstraction to create a container component one-to-one for every presentation component in the component library. Instead, components that represent fully-enclosed behaviors (e.g., a story card) will connect to the store and provide state and actions down to the component library components.

[See this in action](https://github.com/hackoregon/civic/blob/master/packages/2018-example-farmers-markets/src/components/PortlandFarmersMarkets/index.js).

### Making client-side calculations

APIs don't always return data in the expect form we need it for the UI. It is unrealistic to expect API developers to cater to our every need, so instead we need a way to transform data somewhere between the point where we get data from the API and we pass data to components.

If you recall, selectors are pure functions that take state and return substate or derived state. This makes selectors the perfect primitive for this work.

```js
const highSchoolData = {
  classes: [
    { name: 'English', passing: 25, failing: 5 },
    { name: 'Math', passing: 20, failing: 7 },
    { name: 'Band', passing: 40, failing: 0 },
    { name: 'Chemistry', passing: 15, failing: 10 },
  ],
};

// A simple selector that works directly off of state
const getClasses = state => state.classes;

// A selector that builds off of the getClasses selector
const getClassStats = createSelector(
  getClasses,
  classes => state.map(classObj => ({
    name: classObj.name,
    totalStudents: classObj.passing + classObj.failing,
    percentPassing: classObj.passing / (classObj.passing + classObj.failing),
  }))
);

getClassStats(highSchoolData);
// [
//   { name: 'English', totalStudents: 30, percentPassing: 0.8333 },
//   { name: 'Math', totalStudents: 27, percentPassing: 0.7407 },
//   { name: 'Band', totalStudents: 40, percentPassing: 1 },
//   { name: 'Chemistry', totalStudents: 25, percentPassing: 0.6 }
// ]
```

By using `createSelector`, the task of finding classes within in state and calculating class statistics are separated.

`createSelector` can take any number of selectors as arguments. The last argument to `createSelector` will always be the new selector with the return value of all selectors passed in as arguments.

Here is an example that requires two selectors:

```js
const highSchoolData = {
  classes: [
    { name: 'English', passing: 25, failing: 5 },
    { name: 'Math', passing: 20, failing: 7 },
    { name: 'Band', passing: 40, failing: 0 },
    { name: 'Chemistry', passing: 15, failing: 10 },
  ],
  students: [
    { name: 'Alice', classes: [ 'English', 'Band' ] },
    { name: 'Bob', classes: [ 'Chemistry', 'Math' ] },
    { name: 'Carol', classes: [ 'Band', 'Chemistry' ] },
  ],
};

// Get classes from state
const getClasses = state => state.classes;

// Get students from state
const getStudents = state = state.students;

// createSelector result functions don't get props
const forwardStudentName = (state, name) => name;

// Combine selectors to get a single student
// Any arguments passed to this selector will be passed down
// to each dependent selector.
const getStudentByName = createSelector(
  getStudents,
  forwardStudentName,
  (students, name) => students.find(student => student.name === name)
);

// Combine selectors again to get student's classes
const getClassesForStudent = createSelector(
  getClasses,
  getStudentByName,
  (classes, student) => {
    // Get all classes
    return classes.filter(c => {
      // Where the class name is in the student's class list
      return student.classes.includes(c.name);
    });
  }
);

getClassesForStudent(highSchoolData, 'Carol');
// [
//   { name: 'Band', passing: 40, failing: 0 },
//   { name: 'Chemistry', passing: 15, failing: 10 },
// ]
```

[Read more about the selector library, Reselect](https://github.com/reduxjs/reselect).

### Managing a global store across projects

Everything up to this point has assumed one project and one store. However, Civic has many projects that come together to create Year packages. If we have many stores but Redux only has a single global store per application, what do we do?

The answer is `combineReducers` and some strict naming conventions.

`combineReducers` is a useful utility that is also used in the Ducks pattern to take multiple pure reducer functions and merge them into a single function that nests each reducer function under a new state key.

This allows us to take each project's reducer and combine them all into a single reducer where each project's reducer is now operating on substate of the global state under a key that represents that project.

This can be [seen in action in the 2018 project `index.js` file](https://github.com/hackoregon/civic/blob/master/packages/2018/src/index.js). The `combineReducers` part looks like this:

```js
combineReducers({
  routing: routerReducer,
  disaster: DisasterReducers(),
  housing: HousingReducers(),
  elections: ElectionsReducers(),
  neighborhood: NeighborhoodReducers(),
  transportation: TransportationReducers(),
  farmersMarkets: FarmersMarketsReducers(),
});
```

A couple things to note here are

1. Each project reducer amounts to a function call. These functions are being exported in the `index.js` file for each project. This way 2018 can expect to import them from a common place.
2. There is a `routerReducer` that is unrelated to our projects. This is because routing is a form of state change, and state change is handled by Redux. This reducer comes from a third-party project that gives a Redux interface to React Router.

This solves the problem of combining all the reducers, but it introduces the problem of all state for a project being under a project key _only_ when merged in a year package.

This new problem can be solved with selectors.

```js
// The root state for a package is namespaced in the 2018 package
// and the root state object when developing a package in isolation
export const rootState = state => state.projectKey || state;
```

As long as every selector for every project is [reselected] from the `rootState` selector, whether or not the project's root is `state` or `state.projectKey` is inconsequential.

