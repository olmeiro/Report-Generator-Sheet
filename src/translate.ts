namespace TRANSLATE {
	export const KNOWLEDGE_LEVELS = {
		es: {
			1: 'no sabe',
			2: 'conoce vagamente',
			3: 'tiene comprensión',
			4: 'entiende',
			5: 'sabe',
		},
		en: {
			1: 'does not know',
			2: 'knows vaguely',
			3: 'has a good understanding',
			4: 'has a great understanding',
			5: 'knows',
		},
	};

	export const PLURALITY = {
		es: ['el tema', 'los temas'],
		en: ['the topic', 'those topics'],
	};

	export const COMPLEMENT_LEVELS = {
		es: {
			1: ' y debe mejorar sus conocimientos frente a ',
			2: ', entonces requiere apoyo para ejecutar tareas relacionadas con ',
			3: ', aunque puede requerir supervisión esporadica para llevar a cabo tareas relacionadas con ',
			4: ' y puede desarrollar actividades relacionadas con fluidez frente a ',
			5: ' y demostró poseer conocimientos excepcionales frente a ',
		},
		en: {
			1: ' and you must improve his/her knowledge against ',
			2: ', then it requires support to execute tasks related to ',
			3: ', although it may require sporadic supervision to carry out tasks related to ',
			4: ' and can develop activities related to fluency versus ',
			5: ' and proved to possess exceptional knowledge about ',
		},
	};

	export const HOWEVER = {
		es: 'sin embargo',
		en: 'however,',
	};

	export const KNOWLEDGE_GENERICS = {
		es: 'tiene conocimiento acerca del tema',
		en: 'have knowledge about the topic',
	};

	export const ENGLISH_LEVEL = {
		es: 'Su nivel de inglés es',
		en: 'The candidate english level is',
	};

	export const SENIORITY_TEXTS = {
		es: `De acuerdo a los datos recolectados en la entrevista el seniority del candidato es $seniority.`,
		en: `According to the collected data in the interview, the candidate's seniority is $seniority.`,
	};

	export const ABOUT_SENTENCES = {
		es: ['acerca de', 'sobre'],
		en: ['of'],
	};

	export const ALSO_SENTENCES = {
		es: ['además', 'también podemos decir', 'asimismo'],
		en: ['also', 'we can also say', 'likewise'],
	};
}
