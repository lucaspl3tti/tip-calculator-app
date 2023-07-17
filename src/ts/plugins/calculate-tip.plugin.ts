import Plugin from '../plugin-system/plugin.class.ts'
import Dom from '../helper/dom.helper.ts'
import Utilities from '../helper/utilities.helper.ts'

/**
 * This plugin handles the calculate tip functionality
 */
export default class CalculateTipPlugin extends Plugin {
  // define global container variables with default values
  private billContainer: HTMLElement | Element | false | null = null
  private tipOptionsContainer: HTMLElement | Element | false | null = null
  private peopleCountContainer: HTMLElement | Element | false | null = null

  // define global form variables
  private billInput: HTMLInputElement | HTMLElement | false | null = null
  private tipOptionsWrapper: HTMLElement | Element | false | null = null
  private tipOptions: (HTMLElement | Element | null)[] | false = false
  private customTipInput: HTMLInputElement | HTMLElement | false | null = null
  private peopleCountInput: HTMLElement | Element | false | null = null
  private tipAmount: HTMLElement | Element | false | null = null
  private tipResult: HTMLElement | Element | false | null = null
  private resetButton: HTMLElement | Element | false | null = null
  private currentSelectedOption: HTMLInputElement | null = null

  // define global value variables
  private billValue = 0.00
  private tipValue = 0.00
  private personValue = 0.00
  private tipAmountValue: number | string = 0.00
  private tipAmountValueRounded: number | string = this.tipAmountValue
  private tipResultValue: number | string = 0.00
  private tipResultValueRounded: number | string = this.tipResultValue

  static options = {
    selectors: {
      container: {
        bill: '.bill',
        selectTip: '.select-tip',
        peopleCount: '.number-of-people',
      },
      form: {
        billInput: '#billInput',
        tipOptionWrapper: '.select-tip__checkboxes',
        tipOption: '.btn-check',
        customTip: '#customTipInput',
        peopleCountInput: '#numberOfPeople',
        tipAmount: '#tipAmount',
        result: '#tipResult',
        resetButton: '.btn--reset',
      }
    },

    classes: {
      newElement: 'new-element',
    },
  }

  initPlugin() {
    console.log(this.el) // eslint-disable-line
    console.log(this.options) // eslint-disable-line

    this.queryInitialElements()
    this.registerEvents()
  }

  /**
   * get initial elements for global scope
   */
  queryInitialElements() {
    const { selectors } = this.options

    /* select all container elements*/
    // select bill container element
    this.billContainer = Dom.querySelector(
      this.el,
      selectors.container.bill
    )

    // select tip options container element
    this.tipOptionsContainer = Dom.querySelector(
      this.el,
      selectors.container.selectTip
    )

    // select people count container element
    this.peopleCountContainer = Dom.querySelector(
      this.el,
      selectors.container.peopleCount
    )

    /* select all form elements */
    // select bill input element
    this.billInput = Dom.querySelector(
      this.el,
      selectors.form.billInput
    ) as HTMLInputElement

     // select tip options wrapper element
    this.tipOptionsWrapper = Dom.querySelector(
      this.el,
      selectors.form.tipOptionWrapper
    )

    if (!this.tipOptionsWrapper)
      throw new Error('Tip Options container could not be found')

    // select tip options input elements
    this.tipOptions = Dom.querySelectorAll(
      this.tipOptionsWrapper,
      selectors.form.tipOption
    )

    // select custom tip input element
    this.customTipInput = Dom.querySelector(
      this.tipOptionsWrapper,
      selectors.form.customTip
    ) as HTMLInputElement

    // select people count input element
    this.peopleCountInput = Dom.querySelector(
      this.el,
      selectors.form.peopleCountInput
    ) as HTMLInputElement

    // select tip amount element
    this.tipAmount = Dom.querySelector(
      this.el,
      selectors.form.tipAmount
    )

    // select tip result element
    this.tipResult = Dom.querySelector(
      this.el,
      selectors.form.result
    )

    // select reset form button element
    this.resetButton = Dom.querySelector(
      this.el,
      selectors.form.resetButton
    )
  }

  /**
   * Register all events for the plugin instance
   */
  registerEvents() {
    // add event listener for bill input element
    if (!this.billInput) throw new Error('Bill Input element was not found')

    this.billInput.addEventListener('input', () => this.onInputBill())

    if (!this.tipOptions) throw new Error('Tip Options were not found')

    // add event listener for tip options
    Utilities.iterate(this.tipOptions, (tipOption: any) => {
      if (!tipOption) throw new Error('tip option is not valid')
      tipOption = tipOption as HTMLInputElement

      tipOption.addEventListener(
        'input',
        () => this.onInputTipOption(tipOption)
      )
    })

    // add event listener for custom tip input
    if (!this.customTipInput)
      throw new Error('Custom Tip element was not found')

    this.customTipInput.addEventListener(
      'input',
      () => this.onInputCustomTip()
    )

    // add event listener for people count input
    if (!this.peopleCountInput)
      throw new Error('Custom Tip element was not found')

    this.peopleCountInput.addEventListener(
      'input',
      () => this.onInputPeopleCount()
    )

    // add event listener for reset button
    if (!this.resetButton) throw new Error('Reset button element was not found')
    this.resetButton.addEventListener('click', () => this.onClickReset())
  }

  /**
   * Handles onInput event for the bill input
   */
  onInputBill() {
    if (!this.billInput) throw new Error('Bill Input element was not found')
    if (!(this.billInput instanceof HTMLInputElement)) throw new Error(
      'The selected element ist not a type of HTMLInputElement'
    )

    this.billValue = Number(this.billInput.value)
    this.calculateTip()
  }

  /**
   * Handles onInput event for the tip option inputs
   */
  onInputTipOption(tipOption: HTMLInputElement) {
    if (!tipOption.checked) return

    // set currentSelectedOption to checked radio input
    this.currentSelectedOption = tipOption

    // apply new value, then calculate the tip
    this.tipValue = Number(tipOption.value) / 100;
    this.calculateTip();
  }

  /**
   * Handles onInput event for the custom tip input
   */
  onInputCustomTip() {
    if (!this.customTipInput)
      throw new Error('Custom Tip element was not found')

    if (!(this.customTipInput instanceof HTMLInputElement)) throw new Error(
      'The selected element ist not a type of HTMLInputElement'
    )

    // uncheck current selected element
    if (this.currentSelectedOption !== null)
      this.currentSelectedOption.checked = false

    // apply new value, then calculate the tip
    this.tipValue = Number(this.customTipInput.value) / 100
    this.calculateTip()
  }

  /**
   * Handles onInput event for the peoples count input
   */
  onInputPeopleCount() {
    if (!this.peopleCountInput)
      throw new Error('Custom Tip element was not found')

    if (!(this.peopleCountInput instanceof HTMLInputElement)) throw new Error(
      'The selected element ist not a type of HTMLInputElement'
    )

    this.personValue = Number(this.peopleCountInput.value)
    this.calculateTip()
  }

  /**
   * Handle on click event for reset button
   */
  onClickReset() {
    // set values to default
    this.billValue = 0.00
    this.tipValue = 0.00
    this.personValue = 0.00

    this.resetResultValues()
  }

  /**
   * Calculate the tip with the given values
   */
  calculateTip() {
    // add error classes to the elements if needed
    if (this.billValue < 0.01 || this.tipValue < 0.01 || this.personValue < 1)
      return this.checkForErrors(true)

    // calculate the tip amount and total
    this.tipAmountValue = this.billValue * this.tipValue / this.personValue
    this.tipResultValue =
      this.billValue * (this.tipValue + 1) / this.personValue

    // round the numbers to two digits after comma
    this.tipAmountValueRounded = this.tipAmountValue.toFixed(2)
    this.tipResultValueRounded = this.tipResultValue.toFixed(2)

    this.removeErrorClasses()

    // add the tip amount and total value to the html
    if (!this.tipAmount) throw new Error('Tip amount element was not found')
    this.tipAmount.textContent = this.tipAmountValueRounded

    if (!this.tipResult) throw new Error('Tip result element was not found')
    this.tipResult.textContent = this.tipResultValueRounded
  }

  checkForErrors(error: boolean) {
    if (!error) return

    this.toggleErrorClass(this.billContainer, this.billValue, 0.01)
    this.toggleErrorClass(this.tipOptionsContainer, this.tipValue, 0.01)
    this.toggleErrorClass(this.peopleCountContainer, this.personValue, 1)
    this.resetResultValues()
  }

  toggleErrorClass(
    containerEl: HTMLElement | Element | false | null,
    inputValue: number,
    minValue: number
  ) {
    if (!containerEl) throw new Error('Container element was not found')
    if (inputValue < minValue) return containerEl.classList.add('error')

    containerEl.classList.remove('error')
  }

  /**
   * Remove error classes from container elements
   */
  removeErrorClasses() {
    if (!this.billContainer)
      throw new Error('Bill Container element was not found')
    this.billContainer.classList.remove('error')

    if (!this.tipOptionsContainer)
      throw new Error('Options Container element was not found')
    this.tipOptionsContainer.classList.remove('error')

    if (!this.peopleCountContainer)
      throw new Error('People Count Container element was not found')
    this.peopleCountContainer.classList.remove('error')
  }

  /**
   * Reset tip amount value and total value to default as well as the text
   */
  resetResultValues() {
    this.tipAmountValue = '0.00'
    this.tipResultValue = '0.00'

    if (!this.tipAmount) throw new Error('Tip amount element was not found')
    this.tipAmount.textContent = this.tipAmountValue

    if (!this.tipResult) throw new Error('Tip result element was not found')
    this.tipResult.textContent = this.tipResultValue
  }
}
