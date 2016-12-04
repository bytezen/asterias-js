/* 
* from here:
https://github.com/reactjs/redux/issues/303#issuecomment-125184409
*
*/

/* ES6
function observeStore(store, select, onChange) {
  let currentState;

  function handleChange() {
    let nextState = select(store.getState());
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(currentState);
    }
  }

  let unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}
*/

//ES5
//Select extracts the state subtree that you are interested in
//onChange is what you want to run if it changes
function observeStore(store, select, onChange) {
  var currentState;

  function handleChange() {
    var nextState = select(store.getState());
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(currentState);
    }
  }

  var unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}

function dispatchWatcher(actionsToWatch) {     
    return function(action) {
        return _.some(actionsToWatch,function(a) {return a == action.type})
    }
}    