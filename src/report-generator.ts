class ReportGenerator {
	generateJSON(allData: IReportData): any {
		const data = allData.technical;
		delete data['personality traits'];		
		const candidateChart = allData.candidateChart;
		const customData = allData.custom;
		const personalData = allData.personal;

		let user_skills = [];
		let _answer = { ...REFERENCES.ANSWER_TEMPLATE };

		_answer.interviewId = personalData.interviewId;
		_answer.interviewLength = Number(personalData.interviewLength) || _answer.interviewLength;

		const strengths = [];
		const weaknesses = [];
		const scores = [];
		let evidentAdvantages: string = '';
		let evidentFailures: string = '';

		Object.keys(data).forEach(category => {			
			const children: ISkillDetails[] = data[category];
			const topics = Topics.analizeTopics(
				personalData.name,
				children
			);

			weaknesses.push(topics.weakness);
			strengths.push(topics.strength);

			for (let [key, value] of Object.entries(topics.evidentAdvantages)) {
				evidentAdvantages += `${key} - ${value}, \n `;
			}

			for (let [key, value] of Object.entries(topics.evidentFailures)) {
				evidentFailures += `${key} - ${value}, \n `;
			}

			children.forEach(element => {
				const nuserskills = user_skills.concat(
					Topics.getSkillsForCatTopic(
						element.topic,
						element.value,
						REPORT.SKILLS.data,
					),
				);
				user_skills = nuserskills;
			});
				
			const validChildrenLength = children.length;

			if (validChildrenLength) {
				let topicValuesSumatory = 0;
				children.forEach(child => topicValuesSumatory += +child.value);
				const topicValuesAvg = topicValuesSumatory / validChildrenLength;

				// const mainTopics = ['html', 'css', 'javascript'];
				const mainTopics = Object.keys(data);
				const index = mainTopics.indexOf(category) >= 0;
				if (index) {
					scores.push(topicValuesAvg);
				}
			}
		});

		const scoresAvg = scores.length ? scores.reduce((acc, val) => acc + val) / scores.length : 0;
		Logger.log("scoresAvg: " + scoresAvg);
		let assigned_seniority = null;
		REFERENCES.SRTY_RANGES.forEach(srty => {
			if (srty.min <= scoresAvg && scoresAvg < srty.max) {
				assigned_seniority = srty.value;
			}
		});

		Logger.log("assigned_seniority: " + assigned_seniority); //Jr Adv

		_answer.weakSkillsComments = weaknesses
			.filter(x => x)
			.join('.\n \n')
			.replace(/\.\./g, '.');

		if (customData && customData.strengths) {
			_answer.weakSkillsComments += '\n' + customData.strengths;
		}

		_answer.strengthSkillsComments = strengths
			.filter(x => x)
			.join('.\n \n')
			.replace(/\.\./g, '.');

		if (customData && customData.weaknesses) {
			_answer.strengthSkillsComments += '\n' + customData.weaknesses;
		}

		const suggestedStudio = personalData && personalData.studio && personalData.studio.toLowerCase();
		const studio = REFERENCES.STUDIOS.find(studio => studio.name.toLowerCase() === suggestedStudio);
		//Logger.log('Studio: ' + suggestedStudio);

		const yearsOfExperience = personalData && personalData.yearsOfExperience && personalData.yearsOfExperience.toLowerCase();
		const experience = REFERENCES.EXPERIENCE.find(exp => exp.description.toLowerCase() === yearsOfExperience);

		const candidateEnglish = personalData && personalData.english && personalData.english.toLowerCase();
		const english = REFERENCES.ENGLISH.find(x => x.description.toLowerCase() === candidateEnglish);

		// seniorities
		// Logger.log('Defined Seniority: ' + personalData.finalSeniority);
		// Logger.log('Calculated Seniority:' + assigned_seniority + ' es ' + scoresAvg);

		const seniority = REFERENCES.SENIOTITIES.find(x => x.name.toLowerCase() === personalData.finalSeniority.toLowerCase());
		const getSeniorityMessage = (seniority: string): string => TRANSLATE.SENIORITY_TEXTS['en'].replace('$seniority', seniority);
		const seniorityMessage = getSeniorityMessage(personalData.finalSeniority);

		_answer.yearsOfExperienceComments = personalData.workExperienceNotes;
		_answer.yearsOfExperience = experience && experience.id;
		_answer.technicalEnglishLevel = english && english.id;
		_answer.evaluatedSeniority = seniority && seniority.id;
		_answer.fitPosition = true;
		_answer.fitCompanyValue = true;
	    _answer.overallComments = `${personalData.summary}\n\n`; // Interview Summary
		_answer.evaluationResultComments = personalData.evaluationResultComments;
		_answer.technicalEnglishLevelComments = personalData.englishComments;
		_answer.interviewId = personalData.interviewId || -1;
		_answer.suggestedStudioId = studio.id;

		_answer.skills = user_skills.concat(
			personalData.skills.map(gskill => {
				const topic = gskill && gskill.topic && gskill.topic.toLowerCase();
				const skill = REPORT.SKILLS.data.find(sk => sk.name.toLowerCase() === topic);

				if (skill) {
					return {
						id: skill.id,
						name: skill.name,
						weight: REFERENCES.SKILL_VALUES[gskill.value],
					};
				}
			}),
		);
		return {
			personalData,
			candidateChart,
			answer: _answer,
			seniority: assigned_seniority,
			technical: data,
			evidentAdvantages,
			evidentFailures
		};
	}

	generate(summary: IReportData): IGeneratedReport {
		return this.generateJSON(summary);
	}
}