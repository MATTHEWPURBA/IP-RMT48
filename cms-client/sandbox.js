import { legacy_createStore as createStore } from "redux";

/**
 * This is a reducer - a function that takes a current state value and an
 * action object describing "what happened", and returns a new state value.
 * A reducer's function signature is: (state, action) => newState
 *
 * The Redux state should contain only plain JS objects, arrays, and primitives.
 * The root state value is usually an object. It's important that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * You can use any conditional logic you want in a reducer. In this example,
 * we use a switch statement, but it's not required.
 */
const defaultState = {
  value: 0,
  data: [],
  dataCart: [],
  product: [],
};

function counterReducer(state = defaultState, action) {
  switch (action.type) {
    case "counter/incremented":
    //   return { ...state, value: state.value + 1 };
    //{ value: 1, data: [], dataCart: [], product: [] } //output
      return { ...state, value: state.value + 1 };
    //{ state: { value: 0, data: [], dataCart: [], product: [] }, value: 1 } kalo ga pake titik titik jadi begini output nya 
    case "counter/decremented":
      return { ...state,value: state.value - 1 };
      /** jadi kalo state nya versi kaya gini bukan yang ...state
       *  maka nantinya si default state akan masuk sejumlah 
       * dengan berapa kali dia dipanggil
       */

    case "product/fetchSuccess":
      console.log(action);
      return { state, data: action.payload };
    /** biar memberhentikan switch case dengan kasih object kosong*/
    default:
      return state;
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counterReducer);
console.log(store.getState(), "ini awalan");
// ini adalah store tanpa adanya state yang isinya udah banyak objek defaultstate

store.dispatch({ type: "counter/incremented" });

console.log(store.getState());

store.dispatch({ type: "counter/decremented" });
console.log(store.getState());

store.dispatch({
  /**type ini fungsi nya untuk memanggil dari atas 
sesuai dengan dispatch */
  type: "product/fetchSuccess",
  //disaat aku mau memanggil payload di return case, maka saya akan
  /** memanggil payload, maka saya akan return data.payload dan jika
   * saya aan memanggil type maka akan memanggil data.type
   */
  payload: [
    { name: "fluffy", age: 21 },
    { name: "tobrut", age: 22 },
  ],
});
console.log(store.getState());

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// There may be additional use cases where it's helpful to subscribe as well.

// store.subscribe(() => console.log(store.getState()))

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
// store.dispatch({ type: 'counter/incremented' })
// {value: 1}
// store.dispatch({ type: 'counter/incremented' })
// {value: 2}
// store.dispatch({ type: 'counter/decremented' })
// {value: 1}
