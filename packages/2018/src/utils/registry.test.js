import React from 'react';
import Registry from './registry';

const ComponentOne = () => <div />;
ComponentOne.displayName = 'ComponentOne';

const ComponentTwo = () => <div />;
ComponentTwo.displayName = 'ComponentTwo';

const commonEntries = [
  {
    slug: 'slug-one',
    component: ComponentOne,
    project: '@hackoregon/project-one',
  },
  {
    slug: 'slug-two',
    component: ComponentTwo,
    project: '@hackoregon/project-two',
  },
];

describe('Registry class', () => {
  describe('The constructor', () => {
    it('takes a list of entries', () => {
      const registry = new Registry(commonEntries);

      expect(registry).to.have.lengthOf(commonEntries.length);
    });

    describe('when the entires contains duplicates', () => {
      it('throws an error', () => {
        const makeRegistry = () =>
          new Registry(
            commonEntries.concat([
              {
                slug: 'slug-one',
                component: ComponentTwo,
                project: '@hackoregon/project-three',
              },
            ])
          );

        expect(makeRegistry).to.throw(
          `Duplicate slugs found. All card slugs must be unique

slug-one
\t(ComponentOne) in @hackoregon/project-one
slug-one
\t(ComponentTwo) in @hackoregon/project-three
`
        );
      });

      it('throws an error for every duplicate', () => {
        const makeRegistry = () =>
          new Registry(
            commonEntries.concat([
              {
                slug: 'slug-one',
                component: ComponentTwo,
                project: '@hackoregon/project-three',
              },
              {
                slug: 'slug-two',
                component: ComponentOne,
                project: '@hackoregon/project-four',
              },
            ])
          );

        expect(makeRegistry).to.throw(
          `Duplicate slugs found. All card slugs must be unique

slug-one
\t(ComponentOne) in @hackoregon/project-one
slug-one
\t(ComponentTwo) in @hackoregon/project-three

slug-two
\t(ComponentTwo) in @hackoregon/project-two
slug-two
\t(ComponentOne) in @hackoregon/project-four
`
        );
      });
    });
  });

  describe('The add method', () => {
    it('takes an entry', () => {
      const registry = new Registry(commonEntries);

      registry.add({
        slug: 'slug-three',
        component: ComponentTwo,
        project: '@hackoregon/project-three',
      });

      expect(registry).to.have.lengthOf(commonEntries.length + 1);
    });

    describe('when the entry is a duplicate of an existing entry', () => {
      it('throws an error', () => {
        const registry = new Registry(commonEntries);

        const addDuplicate = () =>
          registry.add({
            slug: 'slug-one',
            component: ComponentTwo,
            project: '@hackoregon/project-three',
          });

        expect(addDuplicate).to.throw(
          `Duplicate slugs found. All card slugs must be unique

slug-one
\t(ComponentOne) in @hackoregon/project-one
slug-one
\t(ComponentTwo) in @hackoregon/project-three
`
        );
      });
    });
  });

  describe('The remove method', () => {
    it('takes a slug and removes the matching entry', () => {
      const registry = new Registry(commonEntries);
      registry.remove('slug-one');
      expect(registry).to.have.lengthOf(commonEntries.length - 1);
      expect(registry.entries.map(e => e.slug)).not.to.include('slug-one');
    });

    it('takes an object and removes the matching entry', () => {
      const registry = new Registry(commonEntries);
      registry.remove(commonEntries[0]);
      expect(registry).to.have.lengthOf(commonEntries.length - 1);
      expect(registry.entries.map(e => e.slug)).not.to.include('slug-one');
    });

    it('does nothing when there is no match', () => {
      const registry = new Registry(commonEntries);
      registry.remove('something-that-does-not-exist');
      expect(registry).to.have.lengthOf(commonEntries.length);
    });
  });

  describe('The find method', () => {
    it('takes a slug and returns the matching entry', () => {
      const registry = new Registry(commonEntries);
      expect(registry.find('slug-one')).to.deep.equal(commonEntries[0]);
    });

    it('returns undefined when there is no matching entry', () => {
      const registry = new Registry(commonEntries);
      expect(registry.find('something-that-does-not-exist')).to.be.undefined;
    });
  });
});
