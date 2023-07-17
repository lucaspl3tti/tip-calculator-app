import Utilities from "./utilities.helper.ts";

/**
 * ##### Array helper functions
 */
export default class Array {
  /**
   * ## Helper function to get either the first element in the array, or the
   * first ~given amount~ items in the array
   */
  static first(array: any[], amount = 1): any {
    if (amount === 1) return array[0];

    return array.slice(0, amount);
  }

  /**
   * ## Helper function to get either the last element in the array, or the
   * last ~given amount~ items in the array
   */
  static last(array: any[], amount = 1): any {
    if (amount === 1) return array[array.length - 1];

    return array.slice(-amount);
  }

  /**
   * ## Helper function to get random item in array
   */
  static getRandomArrayItem(array: any[]): any {
    return array[Utilities.getRandomNumber(0, array.length - 1)];
  }
}
