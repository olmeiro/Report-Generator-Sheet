namespace REFERENCES {
	export const ANSWER_TEMPLATE = {
		interviewId: -1,
		yearsOfExperience: -1,
		yearsOfExperienceComments: '',
		softSkills: null,
		techSkills: null,
		weaknesses: null,
		strengths: null,
		technicalEnglishLevel: -1,
		technicalEnglishLevelComments: null,
		evaluatedSeniority: -1,
		evaluationResult: true,
		evaluationResultComments: null,
		fitPosition: true,
		fitCompanyValue: true,
		otherPositionSuggested: null,
		suggestedStudioId: -1,
		overallComments: null,
		interviewLength: 5429908,
		skills: [],
		strengthSkillsComments: null,
		weakSkillsComments: null,
		lastEditedField: '1',
		gatekeeper: {
			id: '',
			completeName: '',
			username: '',
		},
		status: 3010,
		interviewLengthComments: null,
	};

	export const REPLACE_DATA = [
		'interviewId',
		'fullName',
		'finalSeniority',
		'appliesFor',
		'date',
		'english',
		'interviewers',
		'english',
		'yearsOfExperience',
		'studio'
	];

	export const ESHEET = {
		INFORMATION: {
			name: 'Information', range: 'A1:B', clean: [
				'B1:B2',
				'B3',
				'B4:B7',
				'B9',
				'B11',
				'B13',
				'B15'
			]
		},
		OTHERS: {
			name: 'Others', range: [
				{ name: 'Methodologies / Teamwork', range: 'A2:D8' },
				{ name: 'Personality traits', range: 'A10:D15' },
				{ name: 'Other Skills', range: 'A17:D24' },
			],
			clean: [
				'B2:D8',
				'C10:D15',
				'B17:D24',
			]
		},
		CHART: { name: 'Chart Export' },
	};

	export const EXPERIENCE = [
		{ id: 5429898, description: 'Less than a year' },
		{ id: 5429899, description: 'Between 1 or 2' },
		{ id: 5429900, description: 'Between 2 or 4' },
		{ id: 5429901, description: 'Between 4 or 8' },
		{ id: 5429902, description: 'More than 8' },
	];

	export const ENGLISH = [
		{ id: 60, description: "Doesn't Apply" },
		{ id: 65, description: 'Starter' },
		{ id: 61, description: 'Elementary' },
		{ id: 66, description: 'Pre Intermediate' },
		{ id: 62, description: 'Intermediate' },
		{ id: 63, description: 'Upper Intermediate' },
		{ id: 64, description: 'Advanced' },
		{ id: 869755, description: 'Native' },
	];

	export const SKILL_VALUES = {
		1: 0,
		2: 25,
		3: 50,
		4: 75,
		5: 100,
	};

	export const SKILL_VALUES_TO_TEXT = {
		0: 'Cannot perform',
		25: 'Can perform with supervision',
		50: 'Can perform with limited supervision',
		75: 'Can perform without supervision',
		100: 'Can teach',
	};

	export const SENIOTITIES = [
		{ id: 10, name: 'Architect' },
		{ id: 3, name: 'Jr' },
		{ id: 4, name: 'Jr Advance' },
		{ id: 49095800, name: 'SME - Level 4' },
		{ id: 9, name: 'Software Designer' },
		{ id: 7, name: 'Sr' },
		{ id: 5057105, name: 'Sr Adv' },
		{ id: 53914449, name: 'Sr Level 1' },
		{ id: 5, name: 'SSr' },
		{ id: 6, name: 'SSr Advance' },
		{ id: 26433000, name: 'Tech Manager - Level 4' },
		{ id: 1, name: 'Trainee' }
	];

	export const SRTY_LONG = {
		Trainee: 'Trainee',
		Jr: 'Junior',
		'Jr Advanced': 'Junior Advanced',
		SSr: 'Semi Senior',
		'SSr Advanced': 'Semi Senior Advanced',
		Sr: 'Senior',
		'Sr Adv': 'Senior Advanced',
		'Software Designer': 'Software Designer',
		Architect: 'Architect',
	};

	export const SRTY_RANGES = [
		{ min: 0, max: 0.8, value: 'Trainee' },
		{ min: 0.8, max: 1.6, value: 'Jr' },
		{ min: 1.6, max: 2.4, value: 'Jr Adv' },
		{ min: 2.4, max: 3.2, value: 'SSr' },
		{ min: 3.2, max: 4.0, value: 'SSr Adv' },
		{ min: 4.0, max: 4.5, value: 'Sr' },
		{ min: 4.5, max: 5, value: 'Software Designer' },
		{ min: 5, max: 6, value: 'Architect' }, // ridiculous rules...
	];

	export const INTERVIEW_LENGTH = [
		{ id: 5429903, description: '00:15' },
		{ id: 5429904, description: '00:30' },
		{ id: 5429905, description: '00:45' },
		{ id: 5429906, description: '01:00' },
		{ id: 5429907, description: '01:15' },
		{ id: 5429908, description: '01:30' },
		{ id: 5429909, description: '01:45' },
		{ id: 5429910, description: '02:00' },
		{ id: 5429911, description: '02:15' },
		{ id: 5429912, description: '02:30' },
		{ id: 5429913, description: '02:45' },
		{ id: 5429914, description: '03:00' }
	];

	export const enum EOPERATOR {
		ADD = 'ADD',
		MULTIPLY = 'MULTIPLY',
		SUBSTRACT = 'SUBSTRACT',
	}
	
	export const STUDIOS = [
		{ id: 57202756, name: 'Agile Delivery' },
		{ id: 120422913, name: 'Business Hacking' },
		{ id: 5288210, name: 'Cloud Ops' },
		{ id: 131859350 , name: 'Conversational Interfaces' },
		{ id: 186002407 , name: 'Cultural Hacking' },
		{ id: 183251717, name: 'Cybersecurity' },
		{ id: 5288207, name: 'Data and AI' },
		{ id: 5288204, name: 'Design' },
		{ id: 18474130, name: 'Digital Experience Platforms' },
		{ id: 146094332, name: 'Digital Marketing' },
		{ id: 182155956, name: 'Enterprise Apps' },
		{ id: 32666906, name: 'Future of Organizations' },
		{ id: 5288206, name: 'Gaming' },
		{ id: 5288208, name: 'Generic' },
		{ id: 138432776, name: 'Intelligent Enterprise' },
		{ id: 18474133, name: 'IOT' },
		{ id: 160090819, name: 'Life Sciences' },
		{ id: 189836358, name: 'Process Optimization' },
		{ id: 57202758, name: 'Product Acceleration' },
		{ id: 5288209, name: 'Quality Engineering' },
		{ id: 101886290, name: 'Salesforce' },
		{ id: 5288205, name: 'Scalable Platforms' },
		{ id: 35507020, name: 'Staff Generic' },
		{ id: 186002673, name: 'Sustainable Business' },
		{ id: 57202775, name: 'UI Engineering' }
	];
}
