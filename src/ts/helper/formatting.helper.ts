/**
 * ##### Formatting helper functions
 */
export default class Formatting {
  /**
   * ## Helper function to format a given date string
   */
  static formatDate(value: string | Date, options = {}) {
    if (value === null || value === '')
      throw new Error('Date value must not be null')

    // create new date from given value
    const date = new Date(value)

    // get the current language from user
    const languageCode = navigator.language

    // set default options for language formatter and append special options
    const defaultOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }
    options = { ...defaultOptions, ...options, }

    // create new formatter instance
    const dateTimeFormatter = new Intl.DateTimeFormat(languageCode, options)

    return dateTimeFormatter.format(date)
  }

  /**
   * ## Helper function to truncate string to a given amount of characters
   */
  static  truncateString(
    string: string,
    maxCharacters: number,
    useWordBoundary = true
  ): string {
    if (string.length <= maxCharacters) return string

    // shorten string to given length
    let newString = string.slice(0, maxCharacters - 1)

    // if useWordBoundary is true shorten string to the last full word
    if (useWordBoundary)
      newString = newString.slice(0, newString.lastIndexOf(' '))

    // append html entity for "..." to newString
    newString = newString + '\u2026'

    return newString
  }
}
