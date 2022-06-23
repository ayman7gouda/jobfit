export function* combinations<T extends { credits: number | null | undefined }>(
  array: T[],
  length: number,
  creditLimit?: number,
  currentCredits = 0
  //check = ""
): IterableIterator<T[]> {
  for (let i = 0; i < array.length; i++) {
    // console.log(
    //   "LEVEL: " + currentCredits + " id: " + array[i].id + " length: " + length
    // );
    // console.log(
    //   `Checking ${check}${array[i].id} [${
    //     array[i].credit || 10
    //   }] <=> [${currentCredits}]`
    // );

    // this is here for the very last element, so that it is selected if it has the same amount of credits
    if (length === 1) {
      // console.log("YIELD 1: " + array[i].id);
      yield [array[i]];
    } else if (
      creditLimit &&
      currentCredits + (array[i].credits || 10) === creditLimit
    ) {
      yield [array[i]];
    } else if (
      !creditLimit ||
      currentCredits + (array[i].credits || 10) <= creditLimit
    ) {
      const remaining = combinations(
        array.slice(i + 1, array.length),
        length - 1,
        creditLimit,
        currentCredits + (array[i].credits || 10)
        // check + `${array[i].id} [${array[i].credit || 10}] - `
      );
      // console.log(currentCredits);
      for (let next of remaining) {
        const result = [array[i], ...next];

        if (creditLimit) {
          const credits = result.reduce(
            (prev, next) => prev + (next.credits || 10),
            currentCredits
          );

          // 1. this is the final element and we need to decide whether we
          //    yield the result back, the result must be bigger or equal of our credit limit
          if (currentCredits == 0) {
            if (credits == creditLimit) {
              // console.log("YIELD FINAL: " + JSON.stringify(result));
              yield result;
            }
          }
          // 2. we are in the process of generation
          //    continue only if we did not hit the generation limit
          else if (credits <= creditLimit) {
            // console.log("CONTINUE");
            yield result;
          }
          // 3. if we are over the credits just return the last element
          else {
            // console.log("BACK");
            yield [array[i]];
          }
        } else {
          yield result;
        }
      }
    }
  }
}

// TS
function* cartesianIterator<T>(items: T[][]): Generator<T[]> {
  const remainder = items.length > 1 ? cartesianIterator(items.slice(1)) : [[]];
  for (let r of remainder) for (let h of items.at(0)!) yield [h, ...r];
}

// get values:
export function cartesian<T>(items: T[][]) {
  return [...cartesianIterator(items)];
}

export function fact(num: number) {
  if (num === 0 || num === 1) return 1;
  for (var i = num - 1; i >= 1; i--) {
    num *= i;
  }
  return num;
}
