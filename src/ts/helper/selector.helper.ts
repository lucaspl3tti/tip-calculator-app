/**
 * ##### Selector helper functions
 */
export default class Selector {
  /**
   * ## Helper function to check if a given selector is an Id
   */
  static isIdSelector(string: string): boolean {
    if (string.charAt(0) !== '#') return false
    return true
  }

  /**
   * ## Helper function to check if a given selector is a class
   */
  static isClassSelector(string: string) {
    if (string.charAt(0) !== '.') return false
    return true
  }

  /**
   * ## Remove the trailing hash sign from an id selector
   */
  static removeIdTrailingSymbol(string: string) {
    if (string.charAt(0) !== '#') return string
    return string.substring(1)
  }

  /**
   * ## Remove the trailing dot from a class selector
   */
  static removeClassTrailingSymbol(string: string) {
    if (string.charAt(0) !== '.') return string
    return string.substring(1)
  }
}
