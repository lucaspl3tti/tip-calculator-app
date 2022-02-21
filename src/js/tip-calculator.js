/**
 * This Plugin handles the custom calculating tip fuction for the tip calculator app
 */
 export default class CalculateTipPlugin {
    constructor(el) {
        // select the element
        this.el = document.querySelector(el);
        this.formEls = this.el.elements;

        // select all form elements
        this.billInput = this.el.querySelector('#billInput');
        this.selectTipContainer = this.el.querySelector('.select-tip__checkboxes');
        this.selectTipRadioBtns = this.selectTipContainer.querySelectorAll('.btn-check');
        this.selectTipCustom = this.selectTipContainer.querySelector('#customTipInput');
        this.personInput = this.el.querySelector('#numberOfPeople');
        this.tipAmount = this.el.querySelector('#tipAmount');
        this.tipResult = this.el.querySelector('#tipResult');

        // set default values
        this.billValue = 0.00;
        this.tipValue = 0;
        this.personValue = 0.00;
        this.tipAmountValue = 0.00;
        this.tipResultValue = 0.00;

        this.registerEvents();
    }

    registerEvents() {
        this.getBillInputValue();
        this.getTipValue();
        this.getNumberOfPeopleValue();
    }

    getBillInputValue() {
        this.billInput.addEventListener('input', () => {
            this.billValue = this.billInput.value;
            this.calculateTip();
        });
    }

    getTipValue() {
        let currentSelected = null;

        this.selectTipRadioBtns.forEach(radioBtn => {
            radioBtn.addEventListener('input', () => {
                if (radioBtn.checked) {
                    currentSelected = radioBtn;
                    this.tipValue = radioBtn.value / 100;
                    this.calculateTip();
                }
            });
        });

        this.selectTipCustom.addEventListener('input', () => {
            if (currentSelected != null) {
                currentSelected.checked = false;
            }

            this.tipValue = this.selectTipCustom.value / 100;
            this.calculateTip();
        });
    }

    getNumberOfPeopleValue() {
        this.personInput.addEventListener('input', () => {
            this.personValue = this.personInput.value;
            this.calculateTip();
        });
    }

    calculateTip() {
        if (this.personValue >= 1) {
            this.tipAmountValue = this.billValue * this.tipValue / this.personValue;
            this.tipResultValue = this.billValue * (this.tipValue + 1) / this.personValue;

            this.tipAmountValueRounded = this.tipAmountValue.toFixed(2);
            this.tipResultValueRounded = this.tipResultValue.toFixed(2);

            this.tipAmount.textContent = this.tipAmountValueRounded;
            this.tipResult.textContent = this.tipResultValueRounded;
        } else {
            console.log('ERROR: Person Value must be over 0');
        }
    }

}
