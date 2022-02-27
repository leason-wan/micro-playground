import PatchListeners from "./listener.js";
import PatchIntervals from "./interval.js";

const noop = () => {};
let listenersFree = noop;
let intervalsFree = noop;

function beforeStart(proxyWindow) {
  // proxy listeners
  listenersFree = PatchListeners(proxyWindow);
  // proxy Intervals
  intervalsFree = PatchIntervals(proxyWindow);
}

function beforeDestroy() {
  listenersFree();
  intervalsFree();
}

export const corePlugin = {
  beforeStart,
  beforeDestroy
}