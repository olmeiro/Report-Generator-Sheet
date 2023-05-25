namespace GeneralInfo {

	export function get(personalityTraits: ISkillDetails[] = []): IInformation {
		const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
		const informationSheet = spreadSheet && spreadSheet.getSheetByName(REFERENCES.ESHEET.INFORMATION.name);

		const candidateInformation: IInformation = {
			interviewId: 0,
			fullName: '',
			studio: '',
			appliesFor: '',
			finalSeniority: '',
			yearsOfExperience: '',
			english: '',
			englishComments: '',
			workExperienceNotes: '',
			summary: '',
			date: '',
			interviewLength: '',
			jsFiddle: '',
			interviewers: '',
			gkTrainee: '',
		};
		
		const informationRange = REFERENCES.ESHEET.INFORMATION.range;
		const rangeData = informationSheet.getRange(informationRange);
		const rangeValues = rangeData.getValues();

		Object.keys(candidateInformation).forEach((key, index) => {
			const fieldData = rangeValues[index];
			const fieldValue = (fieldData && fieldData.length > 1 && fieldData[1]) || '';
			candidateInformation[key] = fieldValue;
		});

		candidateInformation.skills = personalityTraits;

		const fullNameParts = candidateInformation.fullName.split(' ');
		const name = (fullNameParts && fullNameParts.length && fullNameParts[0]) || '';
		candidateInformation.name = name;

		candidateInformation.interviewLength = getInterviewLengthId(candidateInformation.interviewLength);

		const spreadSheetUrl = Utils.getSpreadSheetUrl();
		candidateInformation.evaluationResultComments = `You could find all the interview details in ${spreadSheetUrl}`;

		return candidateInformation;
	}

	function getInterviewLengthId(interviewLength: string | number): number {
		const item = REFERENCES.INTERVIEW_LENGTH.find(interview => interview.description === interviewLength);

		return item && item.id || null;
	}
}
