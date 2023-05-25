namespace Topics {
	export function assembleSentence(name, topic, level, lang = 'en') {
		const about = Utils.random(TRANSLATE.ABOUT_SENTENCES[lang]);
		const knows = TRANSLATE.KNOWLEDGE_LEVELS[lang][level];
		const complement = TRANSLATE.COMPLEMENT_LEVELS[lang][level];
		const _topics = topic.split(',');
		const plurality = _topics.length === 1 ? TRANSLATE.PLURALITY[lang][0] : TRANSLATE.PLURALITY[lang][1];
		const t_topics = _topics.join(', ');
		return `${name} ${knows} ${about} ${t_topics}${complement}${plurality}`;
	}

	export function analizeTopics(candidate, topics, lang = 'en') {
		topics.sort((a, b) => b.value - a.value);
		let failures = {};
		let advantages = {};

		const resumeItems = topics.reduce((acc, el) => {
			// Logger.log("acc[el.value] :" + acc[el.value]);
			if (!acc[el.value]) {
				acc[el.value] = [];
			}
			const txt = el.topic;
			if (Boolean(el.weaknesses)) {
				const weaknesses = el.weaknesses.split(/\n/g).join(', ');  // join multiple lines into a single one
				failures[txt] = weaknesses;
			}
			if (Boolean(el.strengths)) {
				const strengths = el.strengths.split(/\n/g).join(', ');  // join multiple lines into a single one
				advantages[txt] = strengths;
			}
			acc[el.value].push(txt);
			//Logger.log("acc:" + acc); ,,HTML Multimedia,Basic HTML,Doctype,HTML Semantic Web,Accessibility,Multimedia, SVG & Canvas,DOM & CSSOM & render tree
			return acc;
		}, []).map((elms) => {
			return elms.map(x => {
				const failure = failures[x];
				const strength = advantages[x];

				// Logger.log("failure: " + failure);  Son los comentarios de cada topic
				// Logger.log("strength: " + strength);

				let message = strength ? strength : TRANSLATE.KNOWLEDGE_GENERICS[lang];
				if (failure) message += `, ${TRANSLATE.HOWEVER[lang]} ${failure}`;
				return `${x} (${message})`;
			});
		})
			.map(elms => elms.join(', '));

		const resumes = [];
		const skills: ISkill = {
			strength: '',
			weakness: '',
			evidentAdvantages: {},
			evidentFailures: {},
		};
		const POSSIBLE_VALUES = 5;
		for (let index = 0; index <= POSSIBLE_VALUES; index++) {
			const topic = resumeItems[index];
			resumes[index] = topic
				? Topics.assembleSentence(candidate, topic, index)
				: '';
		}
		skills.weakness = [resumes[1], resumes[2]]
			.filter(x => x)
			.join(', ' + Utils.random(TRANSLATE.ALSO_SENTENCES[lang]) + ' ');

		skills.strength = [resumes[3], resumes[4], resumes[5]]
			.filter(x => x)
			.join(', ' + Utils.random(TRANSLATE.ALSO_SENTENCES[lang]) + ' ');

		skills.evidentAdvantages = advantages;
		skills.evidentFailures = failures;
		// Logger.log("resume Skills: " + Object.entries(skills)); Devuelve advantages y failures
		return skills;
	}

  /**
   * @param topicName Topic name. e.g. HTML Basic Structure
   * @param topicValue Topic Value. Value beetween 1 - 5
   * @param skills
   */
	export function getSkillsForCatTopic(topicName, topicValue, skills) { //value,5,topic,Linters,
		const topic = topicName.toLowerCase();
		return skills
			.map(skill => {
				if (!skill.description) {
					skill.description = skill.name;
				}
				return skill; //linters
			})
			.filter(skill => skill.description)
			.filter(skill => {
				if (skill.description.toLowerCase() === topic.toLowerCase()) {
					return true;
				}
			})
			.map(skill => ({
				id: skill.id,
				name: skill.name,
				weight: REFERENCES.SKILL_VALUES[topicValue],
			}));
	}
}
