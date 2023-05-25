class MathCaptcha {
	public readonly MAX_NUMBER = 10;
	public readonly MIN_NUMBER = 2;

	public number1: number;
	public number2: number;
	public operator: REFERENCES.EOPERATOR;

	private _operators: REFERENCES.EOPERATOR[] = [
		REFERENCES.EOPERATOR.ADD,
		REFERENCES.EOPERATOR.MULTIPLY,
		REFERENCES.EOPERATOR.SUBSTRACT
	];

	constructor() {
		this.generate();
	}

	public generate() {
		this.number1 = Math.round(Math.random() * this.MAX_NUMBER) + this.MIN_NUMBER;
		this.number2 = Math.round(Math.random() * this.MAX_NUMBER) + this.MIN_NUMBER;

		const randomOperatorInder = Math.round(Math.random() * (this._operators.length - 1));
		this.operator = this._operators[randomOperatorInder];
	}

	public get message(): string {
		return `What's the result for ${this.number1} ${this.operatorText} ${this.number2}?`;
	}

	public get result(): number {
		switch (this.operator) {
			case REFERENCES.EOPERATOR.ADD: return this.number1 + this.number2;
			case REFERENCES.EOPERATOR.MULTIPLY: return this.number1 * this.number2;
			case REFERENCES.EOPERATOR.SUBSTRACT: return this.number1 - this.number2;
		}
	}

	private get operatorText(): string {
		switch (this.operator) {
			case REFERENCES.EOPERATOR.ADD: return '+';
			case REFERENCES.EOPERATOR.MULTIPLY: return 'x';
			case REFERENCES.EOPERATOR.SUBSTRACT: return '-';
		}
	}

	public validate(value): boolean {
		return this.result === value;
	}
}

function resetTemplate() {
	const ui = SpreadsheetApp.getUi();
	const captcha = new MathCaptcha();
	const promptTitle = 'Clear the current Template';
	const promptResult = ui.prompt(promptTitle, captcha.message, ui.ButtonSet.OK_CANCEL);

	const promptResponse = Number(promptResult.getResponseText());
	const selectedButton = promptResult.getSelectedButton();

	const isValidResponse = captcha.validate(promptResponse);

	if (selectedButton === ui.Button.OK) {
		if (isValidResponse) {
			Object.keys(REFERENCES.ESHEET).forEach(spreadsheetName => {
				const spreadSheet = SpreadsheetApp.getActiveSpreadsheet(),
					informationSheet = spreadSheet && spreadSheet.getSheetByName(spreadsheetName),
					ranges = REFERENCES.ESHEET[spreadsheetName.toUpperCase()].clean;
				if (Array.isArray(ranges)) {
					ranges.forEach(stringRange => {
						const currentRange = informationSheet?.getRange(stringRange);
						currentRange?.clearContent();
					});
				} else {
					const currentRange = informationSheet?.getRange(ranges);
					currentRange?.clearContent();
				}
			});
		} else {
			Browser.msgBox(`Your response was wrong! The right response was ${captcha.result}`);
		}
	}
}
