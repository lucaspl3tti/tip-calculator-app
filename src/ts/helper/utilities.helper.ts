/**
 * ##### Utility helper functions
 */
export default class Utilities {
  /**
   * ## Helper function to block scope for a given amount of time in ms and run
   * next set piece of code only after given time has passed
   */
  static sleep(milliseconds: number): Promise<() => any> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  /**
   * ## Helper function to loop over iteratable sources
   */
  static iterate(source: any, callback: any) {
    /**
     * if source is either a Map, an Array or a NodeList run forEach with
     * callback on source
     */
    if (
      source instanceof Map ||
      Array.isArray(source) ||
      source instanceof NodeList
    ) return source.forEach(callback)

    // If source is of type FormData run a for of loop
    if (source instanceof FormData) {
      for (const entry of source.entries()) {
        callback(entry[1], entry[0])
      }

      return
    }

    // if source is a HTMLCollection run forEach with callback over new array
    if (source instanceof HTMLCollection) return [...source].forEach(callback)

    /**
     * if source is an Object run forEach with callback
     * over the object keys array
     */
    if (source instanceof Object) return Object.keys(source).forEach((key) => {
      callback(source[key], key)
    })

    // if source is not iterable throw error
    throw new Error(`The element type ${typeof source} is not iterable!`)
  }

  /**
   * ## Helper function to decode strings
   */
  static decodeString(string: string): string {
    if (string.length === 0) return string;

    /**
     * create textarea element (will not be appended to DOM) and set it's
     * innerHTML to the string value
     */
    const textarea = document.createElement("textarea");
    textarea.innerHTML = string;

    /**
     * get the decoded string via the textareas valiue and remove the
     * element again
     */
    const decodedString = textarea.value;
    textarea.remove();

    return decodedString;
  }

  /**
   * ## Helper function to get a random number between a given minimum value
   * and a given maximum value
   */
  static getRandomNumber(minimumValue: number, maximumValue: number): number {
    return Math.floor(
      Math.random() * (maximumValue - minimumValue + 1) + minimumValue
    );
  }
}
