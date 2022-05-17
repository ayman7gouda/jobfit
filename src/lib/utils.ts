import { NextRouter } from 'next/router';

export function toUrlName(name: string) {
  let result = name.replace(/\:/g, "");
  result = result.replace(/ - /g, "-");
  result = result.replace(/\W/g, "-");
  do {
    result = result.replace(/--/g, "-");
  } while (result.indexOf("--") >= 0);
  return result.toLowerCase();
}

export function parseQuery(router: NextRouter) {
  if (router.query) {
    return router.query;
  }
  let queryString = router.asPath;
  let query: any = {};
  let pairs = (
    queryString[0] === "?" ? queryString.substring(1) : queryString
  ).split("&");
  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split("=");
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
  }
  return query;
}

export interface Group<T> {
  key: string;
  values: T[];
}

export function groupByArray<T>(
  xs: T[],
  key: keyof T | ((e: T) => string)
): Array<Group<T>> {
  return xs.reduce(function (previous, current) {
    let v = key instanceof Function ? key(current) : (current as Any)[key];
    let el = previous.find((r) => r && r.key === v);
    if (el) {
      el.values.push(current);
    } else {
      previous.push({
        key: v,
        values: [current],
      });
    }
    return previous;
  }, [] as Group<T>[]);
}

export type NoUndefinedField<T> = {
  [P in keyof T]-?: Exclude<T[P], null | undefined>;
};
