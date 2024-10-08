// Simple compose function (right-to-left function composition)
export const compose =
  <T>(...fns: Array<(arg: T) => T>) =>
  (x: T): T =>
    fns.reduceRight((acc, fn) => fn(acc), x);

// Simple curry function to handle partial application
export const curry =
  <T extends (...args: any[]) => any>(fn: T) =>
  (
    ...args: Parameters<T>
  ): Parameters<T>["length"] extends (typeof args)["length"]
    ? ReturnType<T>
    : (...rest: Parameters<T>) => ReturnType<T> =>
    args.length >= fn.length
      ? fn(...args)
      : (...rest: any[]) => curry(fn)(...([...args, ...rest] as Parameters<T>));
