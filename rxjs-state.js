import state from "./state";

state.subscribe(state => {
  console.log(state.get("pos"));
});
