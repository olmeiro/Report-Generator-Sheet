interface ISkillDetails {
	topic: string;
	value: string | number;
	strengths: string;
	weaknesses: string;
}

interface ITechnicalInfo {
	[id: string]: ISkillDetails[];
}

interface ISkill {
	strength: string;
	weakness: string;
	evidentAdvantages: {
		[advantage: string]: string;
	};
	evidentFailures: {
		[failure: string]: string;
	};
}

interface IInformation {
	interviewId?: number;
	name?: string;
	fullName: string;
	studio?: string;
	appliesFor?: string;
	finalSeniority?: string;
	yearsOfExperience?: string;
	english?: string;
	englishComments?: string;
	workExperienceNotes?: string;
	summary?: string;
	date?: string;
	interviewLength?: string | number;
	jsFiddle?: string;
	interviewers?: string;
	gkTrainee?: string;
	skills?: ISkillDetails[];
	evaluationResultComments?: string;
	overallComments?: string;
}

interface IReportData {
	personal: IInformation;
	candidateChart: GoogleAppsScript.Base.Blob;
	technical: ITechnicalInfo;
	custom?: any;
}

interface IAnswer extends IInformation {
	suggestedStudioId: string;
	skills: any;
	strengthSkillsComments: string;
	weakSkillsComments: string;
}

interface IGeneratedReport {
	personalData: IInformation;
	candidateChart: GoogleAppsScript.Base.Blob;
	technical: ITechnicalInfo;
	answer: IAnswer;
	seniority: string;
	evidentAdvantages: string;
	evidentFailures: string;
}

interface ICreatePDFResult {
	url: string;
	name: string;
}
