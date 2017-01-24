(function(){
  var ref$, all, any, drop, camelize, difference, filter, find, findIndex, id, last, map, reject, isEqualToObject, React, createFactory, div, img, span, ReactSelectize, cancelEvent, toString$ = {}.toString;
  ref$ = require('prelude-ls'), all = ref$.all, any = ref$.any, drop = ref$.drop, camelize = ref$.camelize, difference = ref$.difference, filter = ref$.filter, find = ref$.find, findIndex = ref$.findIndex, id = ref$.id, last = ref$.last, map = ref$.map, reject = ref$.reject;
  isEqualToObject = require('prelude-extension').isEqualToObject;
  React = require('react'), createFactory = React.createFactory, ref$ = React.DOM, div = ref$.div, img = ref$.img, span = ref$.span;
  ReactSelectize = createFactory(require('./ReactSelectize'));
  cancelEvent = require('./utils').cancelEvent;
  module.exports = React.createClass({
    displayName: 'SimpleSelect',
    getDefaultProps: function(){
      return {
        delimiters: [],
        filterOptions: curry$(function(options, search){
          var this$ = this;
          return filter(function(it){
            return it.label.toLowerCase().trim().indexOf(search.toLowerCase().trim()) > -1;
          })(
          options);
        }),
        firstOptionIndexToHighlight: id,
        onBlur: function(e){},
        onBlurResetsInput: true,
        onFocus: function(e){},
        onKeyboardSelectionFailed: function(which){},
        onPaste: function(e){
          true;
        },
        placeholder: "",
        renderValue: function(arg$){
          var label;
          label = arg$.label;
          return div({
            className: 'simple-value'
          }, span(null, label));
        },
        serialize: function(it){
          return it != null ? it.value : void 8;
        },
        style: {},
        tether: false,
        uid: id
      };
    },
    render: function(){
      var ref$, filteredOptions, highlightedUid, onHighlightedUidChange, onOpenChange, onSearchChange, onValueChange, open, options, search, value, values, autofocus, autosize, cancelKeyboardEventOnSelection, delimiters, disabled, dropdownDirection, groupId, groups, groupsAsColumns, hideResetButton, name, inputProps, onBlurResetsInput, renderToggleButton, renderGroupTitle, renderResetButton, serialize, tether, tetherProps, theme, transitionEnter, transitionLeave, transitionEnterTimeout, transitionLeaveTimeout, uid, this$ = this;
      ref$ = this.getComputedState(), filteredOptions = ref$.filteredOptions, highlightedUid = ref$.highlightedUid, onHighlightedUidChange = ref$.onHighlightedUidChange, onOpenChange = ref$.onOpenChange, onSearchChange = ref$.onSearchChange, onValueChange = ref$.onValueChange, open = ref$.open, options = ref$.options, search = ref$.search, value = ref$.value, values = ref$.values;
      if ((ref$ = this.props) != null) {
        autofocus = ref$.autofocus, autosize = ref$.autosize, cancelKeyboardEventOnSelection = ref$.cancelKeyboardEventOnSelection, delimiters = ref$.delimiters, disabled = ref$.disabled, dropdownDirection = ref$.dropdownDirection, groupId = ref$.groupId, groups = ref$.groups, groupsAsColumns = ref$.groupsAsColumns, hideResetButton = ref$.hideResetButton, name = ref$.name, inputProps = ref$.inputProps, onBlurResetsInput = ref$.onBlurResetsInput, renderToggleButton = ref$.renderToggleButton, renderGroupTitle = ref$.renderGroupTitle, renderResetButton = ref$.renderResetButton, serialize = ref$.serialize, tether = ref$.tether, tetherProps = ref$.tetherProps, theme = ref$.theme, transitionEnter = ref$.transitionEnter, transitionLeave = ref$.transitionLeave, transitionEnterTimeout = ref$.transitionEnterTimeout, transitionLeaveTimeout = ref$.transitionLeaveTimeout, uid = ref$.uid;
      }
      return ReactSelectize(import$(import$({
        autofocus: autofocus,
        autosize: autosize,
        cancelKeyboardEventOnSelection: cancelKeyboardEventOnSelection,
        className: "simple-select" + (!!this.props.className ? " " + this.props.className : ""),
        delimiters: delimiters,
        disabled: disabled,
        dropdownDirection: dropdownDirection,
        groupId: groupId,
        groups: groups,
        groupsAsColumns: groupsAsColumns,
        hideResetButton: hideResetButton,
        highlightedUid: highlightedUid,
        onHighlightedUidChange: onHighlightedUidChange,
        inputProps: inputProps,
        name: name,
        onBlurResetsInput: onBlurResetsInput,
        renderGroupTitle: renderGroupTitle,
        renderResetButton: renderResetButton,
        renderToggleButton: renderToggleButton,
        scrollLock: this.state.scrollLock,
        onScrollLockChange: function(scrollLock){
          return this$.setState({
            scrollLock: scrollLock
          });
        },
        tether: tether,
        tetherProps: tetherProps,
        theme: theme,
        transitionEnter: transitionEnter,
        transitionEnterTimeout: transitionEnterTimeout,
        transitionLeave: transitionLeave,
        transitionLeaveTimeout: transitionLeaveTimeout,
        ref: 'select',
        anchor: last(values),
        onAnchorChange: function(arg$, callback){
          return callback();
        },
        open: open,
        onOpenChange: onOpenChange,
        firstOptionIndexToHighlight: function(){
          return this$.firstOptionIndexToHighlight(options, value);
        },
        options: options,
        renderOption: this.props.renderOption,
        renderNoResultsFound: this.props.renderNoResultsFound,
        search: search,
        onSearchChange: function(search, callback){
          return onSearchChange(search, callback);
        },
        values: values,
        onValuesChange: function(newValues, callback){
          var newValue, changed;
          if (newValues.length === 0) {
            return onValueChange(undefined, function(){
              return callback();
            });
          } else {
            newValue = last(newValues);
            changed = !isEqualToObject(newValue, value);
            return function(){
              return function(callback){
                if (changed) {
                  return onValueChange(newValue, callback);
                } else {
                  return callback();
                }
              };
            }()(function(){
              callback();
              return onOpenChange(false, function(){});
            });
          }
        },
        renderValue: function(item){
          if (open && (!!this$.props.editable || search.length > 0)) {
            return null;
          } else {
            return this$.props.renderValue(item);
          }
        },
        onKeyboardSelectionFailed: function(which){
          return onSearchChange("", function(){
            return onOpenChange(false, function(){
              return this$.props.onKeyboardSelectionFailed(which);
            });
          });
        },
        uid: function(item){
          return {
            uid: this$.props.uid(item),
            open: open,
            search: search
          };
        },
        serialize: function(items){
          return serialize(items[0]);
        },
        onBlur: function(e){
          var onBlurResetsInput;
          onBlurResetsInput = this$.props.onBlurResetsInput;
          (function(){
            return function(callback){
              if (search.length > 0 && onBlurResetsInput) {
                return onSearchChange("", callback);
              } else {
                return callback();
              }
            };
          })()(function(){
            return this$.props.onBlur({
              value: value,
              open: open,
              originalEvent: e
            });
          });
        },
        onFocus: function(e){
          this$.props.onFocus({
            value: value,
            open: open,
            originalEvent: e
          });
        },
        onPaste: (function(){
          var ref$;
          switch (false) {
          case typeof ((ref$ = this.props) != null ? ref$.valueFromPaste : void 8) !== 'undefined':
            return this.props.onPaste;
          default:
            return function(e){
              var clipboardData, valueFromPaste;
              clipboardData = e.clipboardData;
              valueFromPaste = this$.props.valueFromPaste(options, value, clipboardData.getData('text'));
              if (valueFromPaste) {
                (function(){
                  return onValueChange(valueFromPaste, function(){
                    return onSearchChange("", function(){
                      return onOpenChange(false);
                    });
                  });
                })();
                return cancelEvent(e);
              }
            };
          }
        }.call(this)),
        placeholder: this.props.placeholder,
        style: this.props.style
      }, (function(){
        switch (false) {
        case typeof this.props.restoreOnBackspace !== 'function':
          return {
            restoreOnBackspace: this.props.restoreOnBackspace
          };
        default:
          return {};
        }
      }.call(this))), (function(){
        switch (false) {
        case typeof this.props.renderNoResultsFound !== 'function':
          return {
            renderNoResultsFound: function(){
              return this$.props.renderNoResultsFound(value, search);
            }
          };
        default:
          return {};
        }
      }.call(this))));
    },
    getComputedState: function(){
      var highlightedUid, open, search, value, values, ref$, onHighlightedUidChange, onOpenChange, onSearchChange, onValueChange, optionsFromChildren, unfilteredOptions, filteredOptions, newOption, options, this$ = this;
      highlightedUid = this.props.hasOwnProperty('highlightedUid')
        ? this.props.highlightedUid
        : this.state.highlightedUid;
      open = this.isOpen();
      search = this.props.hasOwnProperty('search')
        ? this.props.search
        : this.state.search;
      value = this.value();
      values = !!value || value === 0
        ? [value]
        : [];
      ref$ = map(function(p){
        var result;
        return result = (function(){
          switch (false) {
          case !(this.props.hasOwnProperty(p) && this.props.hasOwnProperty(camelize("on-" + p + "-change"))):
            return function(o, callback){
              this$.props[camelize("on-" + p + "-change")](o, function(){});
              return this$.setState({}, callback);
            };
          case !(this.props.hasOwnProperty(p) && !this.props.hasOwnProperty(camelize("on-" + p + "-change"))):
            return function(arg$, callback){
              return callback();
            };
          case !(!this.props.hasOwnProperty(p) && this.props.hasOwnProperty(camelize("on-" + p + "-change"))):
            return function(o, callback){
              var ref$;
              return this$.setState((ref$ = {}, ref$[p + ""] = o, ref$), function(){
                callback();
                return this$.props[camelize("on-" + p + "-change")](o, function(){});
              });
            };
          case !(!this.props.hasOwnProperty(p) && !this.props.hasOwnProperty(camelize("on-" + p + "-change"))):
            return function(o, callback){
              var ref$;
              return this$.setState((ref$ = {}, ref$[p + ""] = o, ref$), callback);
            };
          }
        }.call(this$));
      })(
      ['highlightedUid', 'open', 'search', 'value']), onHighlightedUidChange = ref$[0], onOpenChange = ref$[1], onSearchChange = ref$[2], onValueChange = ref$[3];
      optionsFromChildren = (function(){
        var ref$;
        switch (false) {
        case !((ref$ = this.props) != null && ref$.children):
          return map(function(it){
            var ref$, value, children;
            if ((ref$ = it != null ? it.props : void 8) != null) {
              value = ref$.value, children = ref$.children;
            }
            return {
              label: children,
              value: value
            };
          })(
          toString$.call(this.props.children).slice(8, -1) === 'Array'
            ? this.props.children
            : [this.props.children]);
        default:
          return [];
        }
      }.call(this));
      unfilteredOptions = this.props.hasOwnProperty('options') ? (ref$ = this.props.options) != null
        ? ref$
        : [] : optionsFromChildren;
      filteredOptions = this.props.filterOptions(unfilteredOptions, search);
      newOption = (function(){
        switch (false) {
        case typeof this.props.createFromSearch !== 'function':
          return this.props.createFromSearch(filteredOptions, search);
        default:
          return null;
        }
      }.call(this));
      options = (!!newOption
        ? [(ref$ = import$({}, newOption), ref$.newOption = true, ref$)]
        : []).concat(filteredOptions);
      return {
        highlightedUid: highlightedUid,
        open: open,
        search: search,
        value: value,
        values: values,
        onHighlightedUidChange: onHighlightedUidChange,
        onOpenChange: function(open, callback){
          onOpenChange(open, function(){
            callback();
            if (!!this$.props.editable && (this$.isOpen() && !!value)) {
              return onSearchChange(this$.props.editable(value) + "" + (search.length === 1 ? search : ''), function(){
                return this$.highlightFirstSelectableOption(function(){});
              });
            }
          });
        },
        onSearchChange: onSearchChange,
        onValueChange: onValueChange,
        filteredOptions: filteredOptions,
        options: options
      };
    },
    getInitialState: function(){
      var ref$;
      return {
        highlightedUid: undefined,
        open: false,
        scrollLock: false,
        search: "",
        value: (ref$ = this.props) != null ? ref$.defaultValue : void 8
      };
    },
    firstOptionIndexToHighlight: function(options, value){
      var index, optionIndexToHighlight, search, this$ = this;
      index = !!value ? findIndex(function(it){
        return isEqualToObject(it, value);
      }, options) : undefined;
      optionIndexToHighlight = (function(){
        var ref$;
        switch (false) {
        case typeof index === 'undefined':
          return index;
        case options.length !== 1:
          return 0;
        case typeof ((ref$ = options[0]) != null ? ref$.newOption : void 8) !== 'undefined':
          return 0;
        default:
          if (all(function(it){
            return typeof it.selectable === 'boolean' && !it.selectable;
          })(
          drop(1)(
          options))) {
            return 0;
          } else {
            return 1;
          }
        }
      }());
      search = this.props.hasOwnProperty('search')
        ? this.props.search
        : this.state.search;
      return this.props.firstOptionIndexToHighlight(optionIndexToHighlight, options, value, search);
    },
    focus: function(){
      this.refs.select.focus();
    },
    blur: function(){
      this.refs.select.blur();
    },
    highlightFirstSelectableOption: function(callback){
      var ref$, options, value;
      callback == null && (callback = function(){});
      if (this.state.open) {
        ref$ = this.getComputedState(), options = ref$.options, value = ref$.value;
        this.refs.select.highlightAndScrollToSelectableOption(this.firstOptionIndexToHighlight(options, value), 1, callback);
      } else {
        callback();
      }
    },
    value: function(){
      if (this.props.hasOwnProperty('value')) {
        return this.props.value;
      } else {
        return this.state.value;
      }
    },
    isOpen: function(){
      if (this.props.hasOwnProperty('open')) {
        return this.props.open;
      } else {
        return this.state.open;
      }
    }
  });
  function curry$(f, bound){
    var context,
    _curry = function(args) {
      return f.length > 1 ? function(){
        var params = args ? args.concat() : [];
        context = bound ? context || this : this;
        return params.push.apply(params, arguments) <
            f.length && arguments.length ?
          _curry.call(context, params) : f.apply(context, params);
      } : f;
    };
    return _curry();
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
