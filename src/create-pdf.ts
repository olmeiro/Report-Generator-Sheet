function createPDF(report: IGeneratedReport): ICreatePDFResult {
	const DOCUMENT_ID = 'IDDocumentGoogleScripts';
	const FOLDER_NAME = 'GK PDF';
	const PDF_MIME_TYPE = 'application/pdf';
	const personalData = report && report.personalData;
	const answer = report && report.answer;
	const technical = report && report.technical;
	const candidateChart = report && report.candidateChart;

	try {
		const pdfFileName = `${personalData.interviewId} - ${personalData.fullName}`;
		const copyFile = DriveApp.getFileById(DOCUMENT_ID).makeCopy();
		const copyId = copyFile.getId();
		const copyDoc = DocumentApp.openById(copyId);
		const body = copyDoc.getBody();

		// Parse date
		const dateInitialiser = personalData.date || new Date().getTime();
		const dateObj = new Date(dateInitialiser);
		const date = `${dateObj.getDate()}/${
			dateObj.getMonth() + 1
		}/${dateObj.getFullYear()}`;
		personalData.date = date;

		REFERENCES.REPLACE_DATA.forEach((field) => {
			const fieldValue = personalData[field] || '';
			body.replaceText(`{${field}}`, fieldValue);
		});

		// Replace skills values
		let skillsString = '';
		let skillsValue = '';

		Object.keys(technical).forEach((key) => {
			if (technical[key].length > 0) {
				skillsString += `\n${key} \n\n`.toUpperCase();
				skillsValue += `\n\n\n`;
				for (let skill of technical[key]) {
					skillsString += `${skill.topic}: \n`;
					skillsValue += `${skill.value} \n`;
				}
			}
		});

		let traitsString = '';
		let traitsValue = '';

		personalData.skills.forEach((trait) => {
			const skillValue = REFERENCES.SKILL_VALUES[trait.value];
			const skillWeightText =
				REFERENCES.SKILL_VALUES_TO_TEXT[skillValue || 0];
			traitsString += `${trait.topic}: \n`;
			traitsValue += `${trait.value}\n`;
		});
		// traitsString = traitsString.substr(0, traitsString.length - 3); // Remove the last comma

		const otherReplacements = {
			skills: skillsString,
			skillsValue: skillsValue,
			traits: traitsString,
			traitsValue: traitsValue,
			strengthSkillsComments: answer.strengthSkillsComments,
			weakSkillsComments: answer.weakSkillsComments,
			overallComments: answer.overallComments,
			evaluationResultComments: answer.evaluationResultComments,
			englishComments: personalData.englishComments,
			workExperienceNotes: personalData.workExperienceNotes,
			candidateChart: candidateChart,
		};

		Object.keys(otherReplacements).forEach((field) => {
			const fieldValue = otherReplacements[field] || '';
			body.replaceText(`{${field}}`, fieldValue);
		});

		// Just after Profile Overview
		if (candidateChart) {
			const childIndex = 4;
			let candidateChartContainer = body.getChild(childIndex);
			candidateChartContainer
				.asParagraph()
				.appendInlineImage(candidateChart)
				.setWidth(620)
				.setHeight(390);
		}

		copyDoc.saveAndClose();

		const folder = DriveApp.getFoldersByName(FOLDER_NAME).hasNext()
			? DriveApp.getFoldersByName(FOLDER_NAME).next()
			: DriveApp.createFolder(FOLDER_NAME);
		let pdfFile = null;

		if (folder.getFilesByName(pdfFileName).hasNext()) {
			pdfFile = folder.getFilesByName(pdfFileName).next();
			Drive.Files.update(
				{
					title: pdfFile.getName(),
					mimeType: pdfFile.getMimeType(),
				},
				pdfFile.getId(),
				copyFile.getBlob().copyBlob(),
			);
		} else {
			pdfFile = folder.createFile(copyFile.getAs(PDF_MIME_TYPE));
			pdfFile.setName(pdfFileName);
		}

		copyFile.setTrashed(true);
		//pdfFile.setTrashed(true);
		const pdfUrl = pdfFile.getUrl();
		Logger.log('pdfUrl: ' + pdfUrl);
		Logger.log('pdfName: ' + pdfFileName);

		return {
			url: pdfUrl,
			name: pdfFileName,
		};
	} catch (error) {
		Logger.log(error);
	}
}

function savePdfLocal() {
	const report = generateSummary();
	const pdf = createPDF(report);

	let template = HtmlService.createTemplateFromFile('report-pdf');
	template.allData = report.technical;
	template.pdf = pdf;
	template.seniority = report.seniority;
	SpreadsheetApp.getUi().showModelessDialog(
		template.evaluate().setHeight(50).setWidth(50),
		'Loading...',
	);
}

function savePdf() {
	const report = generateSummary();
	createPDF(report);
	SpreadsheetApp.getUi().alert('PDF saved in your Drive');
}
