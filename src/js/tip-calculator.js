/**
 * This Plugin handles the custom calculating tip fuction for the tip calculator app
 */
export default class CalculateTipPlugin {
    constructor(el) {
        // select the element
        this.el = document.querySelector(el);

        // select all containers
        this.billContainer = this.el.querySelector('.bill');
        this.selectTipContainer = this.el.querySelector('.select-tip');
        this.personContainer = this.el.querySelector('.number-of-people');

        // select all form elements
        this.billInput = this.el.querySelector('#billInput');
        this.selectTipRadiosContainer = this.el.querySelector('.select-tip__checkboxes');
        this.selectTipRadioBtns = this.selectTipRadiosContainer.querySelectorAll('.btn-check');
        this.selectTipCustom = this.selectTipRadiosContainer.querySelector('#customTipInput');
        this.personInput = this.el.querySelector('#numberOfPeople');
        this.tipAmount = this.el.querySelector('#tipAmount');
        this.tipResult = this.el.querySelector('#tipResult');
        this.resetBtn = this.el.querySelector('.btn--reset');

        // set default values
        this.billValue = 0.00;
        this.tipValue = 0.00;
        this.personValue = 0.00;
        this.tipAmountValue = '0.00';
        this.tipResultValue = '0.00';

        this.registerEvents();
    }

    registerEvents() {
        this.getBillInputValue();
        this.getTipValue();
        this.getNumberOfPeopleValue();
        this.onClickReset();
    }

    getBillInputValue() {
        // listen for input changes and apply new value, then calculate the tip
        this.billInput.addEventListener('input', () => {
            this.billValue = this.billInput.value;
            this.calculateTip();
        });
    }

    getTipValue() {
        // set currentSelected to null
        let currentSelected = null;

        // listen for input changes
        this.selectTipRadioBtns.forEach(radioBtn => {
            radioBtn.addEventListener('input', () => {
                if (!radioBtn.checked) return

                // set currentSelected to checked radio input
                currentSelected = radioBtn;

                // apply new value, then calculate the tip
                this.tipValue = radioBtn.value / 100;
                this.calculateTip();
            });
        });

        // listen for input changes
        this.selectTipCustom.addEventListener('input', () => {
            // uncheck current selected element
            if (currentSelected != null) currentSelected.checked = false;

            // apply new value, then calculate the tip
            this.tipValue = this.selectTipCustom.value / 100;
            this.calculateTip();
        });
    }

    getNumberOfPeopleValue() {
        // listen for input changes and apply new value, then calculate the tip
        this.personInput.addEventListener('input', () => {
            this.personValue = this.personInput.value;
            this.calculateTip();
        });
    }

    calculateTip() {
        if (this.billValue < 0.01 || this.tipValue < 0.01 || this.personValue < 1) {
            // add error classes to the elements if needed
            this.handleErrorClass(this.billContainer, this.billValue, 0.01);
            this.handleErrorClass(this.selectTipContainer, this.tipValue, 0.01);
            this.handleErrorClass(this.personContainer, this.personValue, 1);
            this.resetResultValues();
            return
        }

        // calculate the tip amount and total
        this.tipAmountValue = this.billValue * this.tipValue / this.personValue;
        this.tipResultValue = this.billValue * (this.tipValue + 1) / this.personValue;

        // round the numbers to two digits after comma
        this.tipAmountValueRounded = this.tipAmountValue.toFixed(2);
        this.tipResultValueRounded = this.tipResultValue.toFixed(2);

        // remove error classes if needed
        this.billContainer.classList.remove('error');
        this.selectTipContainer.classList.remove('error');
        this.personContainer.classList.remove('error');

        // add the tip amount and total value to the html
        this.tipAmount.textContent = this.tipAmountValueRounded;
        this.tipResult.textContent = this.tipResultValueRounded;
    }

    handleErrorClass(containerEl, inputValue, minValue) {
        if (inputValue < minValue) return containerEl.classList.add('error');

        containerEl.classList.remove('error');
    }

    resetResultValues() {
        // set tip amount value and total value to default as well as the text content
        this.tipAmountValue = '0.00';
        this.tipResultValue = '0.00';
        this.tipAmount.textContent = this.tipAmountValue;
        this.tipResult.textContent = this.tipResultValue;
    }

    onClickReset() {
        this.resetBtn.addEventListener('click', () => {
            // set values to default
            this.billValue = 0.00;
            this.tipValue = 0.00;
            this.personValue = 0.00;
            this.resetResultValues();
        });
    }
}
