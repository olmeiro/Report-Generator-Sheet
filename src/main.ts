function generateSummary() {

	const idStudio = Utils.getStudioFolder(); 
	const dynamicRanges = Utils.dynamicRanges(idStudio);
	Logger.log("dynamic: " + Object.entries(dynamicRanges));
	Logger.log(JSON.stringify(dynamicRanges));
	Logger.log(dynamicRanges['Others'].name);

	try {
		const sheets = Object.keys(dynamicRanges);
	
	const technical: ITechnicalInfo = Utils.objTechnical(sheets, dynamicRanges);

	const candidateChart = Utils.getChart(REFERENCES.ESHEET.CHART.name);

	const PERSONALITY_TRAITS = 'personality traits';
	const others = Utils.sheetSummaryOthers(dynamicRanges['Others'].name, dynamicRanges);
	const personalityTraits = others[PERSONALITY_TRAITS] || [];
	delete others[PERSONALITY_TRAITS];
	const generalInfo = GeneralInfo.get(personalityTraits);

	const summary: IReportData = {
		personal: generalInfo,
		candidateChart,
		technical,
	};

	const reportGenerator = new ReportGenerator();
	return reportGenerator.generate(summary);
	} catch (error) {
		SpreadsheetApp.getUi().alert("😬 It seems you're missing data in interview!");
	}
}

function createFetchScript() {
	const report = generateSummary();
	const personalData = report && report.personalData;
	const pdf = createPDF(report);

	try {
		const glow = {
			...report.answer,
			strengthSkillsComments: report.evidentAdvantages,
			weakSkillsComments: report.evidentFailures
		};
	
		let template = HtmlService.createTemplateFromFile('report');
		template.data = glow;
		template.allData = report.technical;
		template.pdf = pdf;
		template.seniority = report.seniority;
	
		SpreadsheetApp.getUi().showModalDialog(template.evaluate(), `${personalData.fullName} Summary Report`);
	} catch (error) {
		Logger.log(error);
	}
}