import { ElementCreateOptions } from '../interfaces/plugin.interface.ts'
import Selector from './selector.helper.ts'

/**
 * ##### Element helper functions
 */
export default class Dom {
  /**
   * ## Helper function to check if a given element is an HTML node
   */
  static isNode(element: HTMLElement | Document | Element | null) {
    if (!(element instanceof Object) || element === null) return false

    return element instanceof Node
  }

  /**
   * ## Helper function to query element by selector
   */
  static querySelector(
    parent: HTMLElement|Element|Document = document,
    selector: string,
    strict = true
  ): HTMLElement|Element|false|null {
    // when strict is enabled check if parent node is a valid element
    if (strict && !this.isNode(parent))
      throw new Error('The parent element is not a valid HTML Node!')

    /**
     * get element with searched selector by using querySelector if no elements
     * were found set it to false
     */
    const element = parent.querySelector(selector) || false

    // when strict is enabled throw an error when no elements were found
    if (strict && element === false) throw new Error(
      `The required element "${selector}" does not exist in parent node!`
    )

    return element
  }

  /**
   * ## Helper function to query all elements of given selector and turn
   * NodeList into Array
   */
  static querySelectorAll(
    parent: HTMLElement|Element|Document = document,
    selector: string,
    strict = true
  ): Array<HTMLElement|Element|null>|false {
    // when strict is enabled check if parent node is a valid element
    if (strict && !this.isNode(parent))
      throw new Error('The parent element is not a valid HTML Node!')

    // get all elements with searched selector by using querySelectorAll
    const nodeList = parent.querySelectorAll(selector)
    let elements: Element[]|boolean = [...nodeList]

    // if no elements were found set elements to false
    if (elements.length === 0) elements = false

    // when strict is enabled throw an error when no elements were found
    if (strict && elements === false) throw new Error(
      `At least one item of "${selector}" must exist in parent node!`
    )

    return elements
  }

  /**
   * ## Helper function to create a new element in the DOM
   */
  static createElement(type: string, options: ElementCreateOptions) {
    if (type === '')
      throw new Error('Element type for new element must not be empty')

    // create new element of given type
    const element = document.createElement(type)

    // Loop over options obejct
    Object.entries(options).forEach(([key, value]) => {
      const optionKey = key as string
      let optionValue

      switch (optionKey) {
        case 'id':
          optionValue = value as string
          if (optionValue.length === 0) break

          element.id = optionValue
          break
        case 'classes':
          if (value.length === 0) break

          if (value instanceof Array) {
            optionValue = value
            element.classList.add(...optionValue)
            break
          }

          optionValue = value as string
          element.classList.add(optionValue)
          break
        case 'text':
          optionValue = value as string
          if (optionValue.length === 0) break

          element.textContent = optionValue
          break
        case 'dataset':
          optionValue = value as object
          if (Object.keys(optionValue).length === 0 ) break

          console.log(Object.keys(optionValue).length)
          Object.entries(optionValue).forEach(([dataKey, dataValue]) => {
            element.dataset[dataKey] = dataValue
          })
          break
        default:
          optionValue = value as any
          element.setAttribute(optionKey, optionValue)
          break
      }
    })

    return element
  }

  /**
   * ## Helper function to hide an element in the dom
   */
  static hideElement(element: HTMLElement, hiddenClass = '') {
    if (hiddenClass === '') return element.style.display = 'none'
    element.classList.add(hiddenClass)
  }

  /**
   * ## Helper function to show an element in the dom
   */
  static showElement(
    element: HTMLElement,
    showClass = '',
    displayStyle = 'block'
  ) {
    if (showClass === '') return element.style.display = displayStyle
    element.classList.add(showClass)
  }

  /**
   * ## Helper function to find parent of an element by a given selector
   * (either id or class)
   */
  static findParent(
    childElement: HTMLElement,
    searchedSelector: string,
    iterationLimit = 5,
    currentIterationCount = 0
  ): HTMLElement | null {
    if (iterationLimit <= ++currentIterationCount) return null

    let isSearchedElement: boolean | undefined = false
    const parentElement = childElement.parentElement

    // check if given selector is either an id or a class, if not throw error
    if (
      !Selector.isClassSelector(searchedSelector) &&
      !Selector.isIdSelector(searchedSelector)
    ) throw new Error('The given selector is not valid, please check if it is an id or class selector') // eslint-disable-line

    if (Selector.isClassSelector(searchedSelector)) {
      // remove trailing dot from class selector
      const searchedClassName =
        Selector.removeClassTrailingSymbol(searchedSelector)

      // check if current element in iteration has selector in classList
      isSearchedElement = parentElement?.classList.contains(searchedClassName)
    } else if (Selector.isIdSelector(searchedSelector)) {
      // remove trailing hash sing from id selector
      const searchedIdName = Selector.removeIdTrailingSymbol(searchedSelector)

      // check if current element in iteration has given id
      isSearchedElement = parentElement?.id === searchedIdName
    }

    // if searched element was found or if parent element is null return parent
    if (isSearchedElement || !parentElement) return parentElement

    // if element was not found in current iteration run next iteration
    return this.findParent(
      parentElement,
      searchedSelector,
      iterationLimit,
      currentIterationCount
    )
  }

  /**
   * ## Helper function to get a parent by going up in the document by a
   * given number of iterations
   */
  static getParent(
    childElement: HTMLElement,
    iterationLimit = 5,
    currentIterationCount = 0
  ): HTMLElement | null {
    ++currentIterationCount

    // get parent element from current iteration
    const parentElement = childElement.parentElement

    // if last iteration was run or if parent element is null return parent
    if (currentIterationCount === iterationLimit || !parentElement)
      return parentElement

    // if last iteration was not reached run next iteration
    return this.getParent(parentElement, iterationLimit, currentIterationCount)
  }
}
