// @ts-nocheck
export default function debounce(fn, ms) {
  let timer;
  let debouncedArguments;
  let debouncedThis;
  let result;

  function invokeFunction() {
    result = fn.apply(debouncedThis, debouncedArguments);
    return result;
  }

  function debounced() {
    debouncedArguments = arguments;
    debouncedThis = this;
    result = invokeFunction;

    clearTimeout(timer);
    timer = setTimeout(_ => {
      timer = null;
      result();
    }, ms);
  }

  function cancel() {
    clearTimeout(timer);
  }

  debounced.cancel = cancel;

  return debounced;
}
