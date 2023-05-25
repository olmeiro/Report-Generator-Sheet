namespace Utils {
	export function getSpreadSheetUrl(): string {
		const SS = SpreadsheetApp.getActiveSpreadsheet();
		const ss = SS.getActiveSheet();
		let url = '';
		url += SS.getUrl();
		// url += '#gid=';
		// url += ss.getSheetId();
		return url;
	}

	export function getCellValue(sheet: GoogleAppsScript.Spreadsheet.Sheet, row: number, col: number): string {
		const cell = sheet && sheet.getRange(row, col);
		return cell && cell.getValue();
	}

	function parseRange(
		sheet: GoogleAppsScript.Spreadsheet.Sheet,
		range: string
	): ISkillDetails[] {
		const currentRange = sheet.getRange(range);
		const rangeValues = currentRange.getValues();
		const topics = [];

		if (rangeValues && rangeValues.length) {
			rangeValues.forEach(item => {
				const topic = item && item[0];
				const value = item && +item[1];
				const strengths = (item && item[2]) || '';
				const weaknesses = (item && item[3]) || '';
				if (value) {
					topics.push({
						value,
						topic,
						weaknesses,
						strengths,
					});
				}
			});
		}
		return topics;
	}

	export function sheetSummaryOthers(
		rangeName: string,
		dynamicObject: object
	): ITechnicalInfo {
		const spreadSheet = SpreadsheetApp.getActiveSpreadsheet(),
			currentSheet = spreadSheet && spreadSheet.getSheetByName(rangeName),
			collectedData: ITechnicalInfo = {},
			// ranges = REFERENCES.ESHEET[rangeName.toUpperCase()].range;
			ranges = dynamicObject[rangeName].range;
	
		if (!currentSheet) {
			return collectedData;
		}
	
		if (Array.isArray(ranges)) {
			for (const item of ranges) {
				const rangeNameLowerCase = item.name && item.name.toLowerCase();
				const topics = parseRange(currentSheet, item.range);
				collectedData[rangeNameLowerCase] = topics;
			}
		} else {
			const rangeNameLowerCase = rangeName.toLowerCase();
			const topics = parseRange(currentSheet, ranges);
			collectedData[rangeNameLowerCase] = topics;
		}
		return collectedData;
	}

	export function objTechnical(arrSheets, dynamicRanges ):ITechnicalInfo{

		let technicalObject = {};
		let technical: ITechnicalInfo = {};

		arrSheets.forEach((sheet, index) => {//[Information, HTML, CSS, JS, Others]

			if (sheet === 'Information') {
				return
			}
			else {
				const nameTopic = dynamicRanges[`${sheet}`].name;
				const summaryByRange = Utils.sheetSummaryByRanges(sheet, dynamicRanges); 
				sheet = {...summaryByRange};
				const newTech = Object.assign(technicalObject, sheet);
			}
			technical = {...technicalObject}	
		});
		return  technical;
	}

	export function sheetSummaryByRanges(
		rangeName: string,
		objectTopics: object
	): ITechnicalInfo {
		const spreadSheet = SpreadsheetApp.getActiveSpreadsheet(),
			currentSheet = spreadSheet && spreadSheet.getSheetByName(rangeName),
			collectedData: ITechnicalInfo = {};
			const nameTopic = rangeName;
			const myObject = objectTopics;
			const ranges = objectTopics[nameTopic].range;

			if (!currentSheet) {
				return collectedData;
			}
	
			if (Array.isArray(ranges)) {
				for (const item of ranges) {
					const rangeNameLowerCase = item.name && item.name.toLowerCase();
					const topics = parseRange(currentSheet, item.range);
					collectedData[rangeNameLowerCase] = topics;
				}
			} else {
				const rangeNameLowerCase = rangeName.toLowerCase();
				const topics = parseRange(currentSheet, ranges);
				collectedData[rangeNameLowerCase] = topics;
			}
		return collectedData;
	}

	export function getChart(
		chartname: string
	): GoogleAppsScript.Base.Blob {
		const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
		const chartSpreadsheet = spreadSheet && spreadSheet.getSheetByName(chartname);
		const chart = chartSpreadsheet?.getCharts()[0];
		const slides = SlidesApp.create("temp");
		const imageBlob = slides.getSlides()[0].insertSheetsChartAsImage(chart).getAs('image/png');

		DriveApp.getFileById(slides.getId()).setTrashed(true);
		return imageBlob;
	}

	export function random(options: string[]) {
		const goal = Math.random() * options.length - 1;
		const pos = parseInt(`${goal}`, 10);
		return options[pos];
	}

	export function isEmptyObject(obj: Object) {
		// because Object.keys(new Date()).length === 0;
		// we have to do some additional check
		return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
	}

	export function getStudioFolder(){
		const ss = SpreadsheetApp.getActiveSpreadsheet();
		const informationSheet = ss.getSheetByName('Information');
		const studioInformation = informationSheet.getRange('B3').getValue();

		// Log the id of folder in the Drive.
		var studioFolder = DriveApp.getFolderById('1gnV0yG97-cgmZs1fUUhrXw2d6V77Q14Z');
		var files = studioFolder.getFiles();
		// Logger.log("files :" + files)
		while (files.hasNext()) {
			var file = files.next();

			if (file.getName().toLocaleLowerCase() == studioInformation.toLowerCase()) {
				const idStudio = file.getId();
				return idStudio;
			}else{
				Logger.log("Studio doesn't exist");
			}
		}
	}

	export function getSheetsStudio(id: string) {
		const Foreing = SpreadsheetApp.openById(id);
		// const sheets = Foreing.getSheets();
		const sheets = Foreing.getSheets();

		const arraySheets = [];

		for (var i = 0; i < sheets.length; i++)
			arraySheets.push([sheets[i].getName()]);

		const nameSheet = Object.values(arraySheets);
		const sheetsStudio = [];

		for (let i = 0; i < nameSheet.length; i++) {
			for (let j = 0; j < nameSheet[i].length; j++) {
				sheetsStudio.push(nameSheet[i][j]);
			}
		}
		return sheetsStudio;
	}

	export function getSheetsNotOpt(iDForeignSheet:string) {
		const Foreing = SpreadsheetApp.openById(iDForeignSheet);
		const sheets = Foreing.getSheets();
		const arraySheets = [];
	
		for (var i = 0; i < sheets.length; i++)
			arraySheets.push([sheets[i].getName()]);
	
		const nameSheet = Object.values(arraySheets);
	
		const optSheets = [];
	
		for (let i = 0; i < nameSheet.length; i++) {
			for (let j = 0; j < nameSheet[i].length; j++) {
				let subString = "";
	
				if (nameSheet[i][j].includes("-opt")) {
					optSheets.push(nameSheet[i][j]);
				}
			}
		}
		return optSheets;
	}

	export function dynamicRanges(idStudio: string) {
		const DYNAMIC_SHEET = {};
		try {
			const sheetsStudio = Utils.getSheetsStudio(idStudio); //HTML,CSS,JS,Others: Sheets document outsider
			const ss = SpreadsheetApp.getActiveSpreadsheet(); //current document

			sheetsStudio.forEach(sheet => {
				const hasSheet = ss.getSheetByName(sheet);

				if (hasSheet != null) {
					const informationSheet = ss.getSheetByName(sheet);
					const lastRow = informationSheet.getLastRow();
					let numberTopics = 0;
					const arrayTopics = [];
					const rows = [];

					const rangeColumnB = informationSheet.getRange(`B1:B${lastRow}`).getValues();
					const rangeColumnA = informationSheet.getRange(`A1:A${lastRow}`).getValues();

					rangeColumnB.forEach((cell, index) => {
						if (cell.toString() == 'Score' || cell.toString() == 'Comments') {
							numberTopics += 1;
							rows.push(index + 1);
							arrayTopics.push(rangeColumnA[index].toString());
						}
					});

					const ranges = [];
					const toClean = [];

					rows.forEach(function (elem, index) {
						let lengthRows = rows.length;
						let nextElement = rows[index + 1];
						let range = "";
						const nameTopic = arrayTopics[index];

						if (lengthRows == 1) {

							nextElement = lastRow;
							range = `A2:D${lastRow}`;
							let clean = `B2:D${lastRow}`;
							DYNAMIC_SHEET[sheet] = { name: sheet, range: range, clean: clean };

						} else if (lengthRows > 1) {

							const Topic = {
								name: "",
								range: ""
							};

							if (nextElement != undefined) {
								range = `A${elem + 1}:D${nextElement - 1}`;
								Topic.name = nameTopic;
								Topic.range = range;
								const rangeToClean = `B${elem + 1}:D${nextElement - 1}`;
								toClean.push(rangeToClean);

							} else if (elem == rows[rows.length - 1]) {
								range = `A${elem + 1}:D${lastRow}`;
								Topic.name = nameTopic;
								Topic.range = range;
								const rangeToClean = `B${elem + 1}:D${lastRow}`;
								toClean.push(rangeToClean);
							}
							ranges.push(Topic);
							DYNAMIC_SHEET[sheet] = { name: sheet, range: ranges, clean: toClean };
						}
					});
				}

			})
			return DYNAMIC_SHEET;
		} catch (error) {
			Logger.log(error);
		}
	}
}