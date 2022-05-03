export function toUrlName(name: string) {
  let result = name.replace(/\:/g, "");
  result = result.replace(/ - /g, "-");
  result = result.replace(/\W/g, "-");
  do {
    result = result.replace(/--/g, "-");
  } while (result.indexOf("--") >= 0);
  return result.toLowerCase();
}

export function parseQuery(queryString: string) {
  var query: any = {};
  var pairs = (
    queryString[0] === "?" ? queryString.substring(1) : queryString
  ).split("&");
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split("=");
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
  }
  return query;
}
export type NoUndefinedField<T> = {
  [P in keyof T]-?: Exclude<T[P], null | undefined>;
};
