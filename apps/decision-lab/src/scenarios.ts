export type Track = 'judgment' | 'communication';
export type Lens = 'reasoning' | 'evidence' | 'consequences' | 'people';
export interface Approach {
  id: string;
  title: string;
  detail: string;
  strength: string;
  risk: string;
  nextStep: string;
}
export interface Scenario {
  id: string;
  track: Track;
  title: string;
  description: string;
  context: string;
  facts: string[];
  unknown: string;
  focus: string;
  minutes: number;
  evidencePrompt: string;
  peoplePrompt: string;
  approaches: Approach[];
}

const approach = (id: string, title: string, detail: string, strength: string, risk: string, nextStep: string): Approach =>
  ({ id, title, detail, strength, risk, nextStep });

export const tracks: Record<Track, { title: string; description: string }> = {
  judgment: { title: 'Judgment', description: 'Weigh evidence. Recognise trade-offs. Choose deliberately.' },
  communication: { title: 'Communication', description: 'Listen carefully. Speak clearly. Protect the relationship.' },
};

export const scenarios: Scenario[] = [
  {
    id: 'competing-priorities', track: 'judgment', title: 'Two priorities. One afternoon.',
    description: 'Two important requests arrive. You have time for one.',
    context: 'You have three hours left today. A colleague needs help preparing tomorrow\'s presentation. You also promised your family that you would organise a plan they need tonight. Both requests matter, and neither person knows about the other commitment.',
    facts: ['You have three hours available.', 'The presentation is tomorrow.', 'Your family expects a plan tonight.'],
    unknown: 'How much work does each request need, and which parts could someone else do?',
    focus: 'Prioritisation', minutes: 5,
    evidencePrompt: 'Check actual deadlines, effort and the consequence of delay before labelling either request urgent.',
    peoplePrompt: 'Tell both people what you can realistically commit to. Include the effect on your existing promise.',
    approaches: [
      approach('clarify', 'Clarify, then negotiate', 'Ask what is essential and agree a realistic scope with both people.', 'You replace assumed urgency with evidence and make commitments explicit.', 'Clarification takes time. Set a short limit so that planning does not consume the afternoon.', 'Ask each person: what is the smallest useful outcome you need, and by when?'),
      approach('promise', 'Protect the earlier promise', 'Complete the family plan and offer a smaller contribution to your colleague.', 'You treat an existing commitment as meaningful and provide a clear boundary.', 'A genuinely higher-impact deadline might justify renegotiating the promise. Check that possibility.', 'Explain the commitment and offer a specific piece of help you can deliver.'),
      approach('split', 'Split the available time', 'Give each request a fixed time slot and deliver a smaller version of both.', 'You acknowledge both needs and use a time budget to avoid an open-ended yes.', 'Splitting attention can leave both outcomes incomplete. Agree minimum expectations first.', 'Write a time budget and agree what each person will receive within it.'),
    ],
  },
  {
    id: 'uncertain-claim', track: 'judgment', title: 'A confident claim. Thin evidence.',
    description: 'Everyone agrees with an idea, but the evidence is incomplete.',
    context: 'A group wants to switch to a new tool. One person says it will save everyone hours each week. Their only evidence is a short demonstration. The group wants an answer today, and you would be responsible for making the switch work.',
    facts: ['The group saw a short demonstration.', 'Nobody has tested the tool with their own workflow.', 'You would help implement the change.'],
    unknown: 'Does the benefit survive setup time, migration effort and ordinary daily use?',
    focus: 'Evidence', minutes: 5,
    evidencePrompt: 'Measure a representative task before and during a trial. Include setup effort and failures.',
    peoplePrompt: 'Invite the enthusiastic person to help test the claim. Challenge the evidence without attacking their competence.',
    approaches: [
      approach('pilot', 'Run a small trial', 'Test one representative workflow before committing the whole group.', 'A reversible experiment gives you evidence while limiting the cost of being wrong.', 'A narrow trial can hide problems at a larger scale. Record what the trial does not test.', 'Define one success measure and one condition that would stop the trial.'),
      approach('investigate', 'Investigate first', 'Request cost details, limitations and examples from similar users.', 'You look for missing information before making a commitment.', 'Research can become an excuse to delay. Set a decision deadline and a small evidence checklist.', 'List the three questions whose answers could change your decision.'),
      approach('adopt', 'Adopt with an exit plan', 'Switch a small group quickly, retaining a way back to the existing tool.', 'A fast move can be defensible when the change is cheap and genuinely reversible.', 'A promised exit plan is insufficient if data cannot be recovered or the group becomes dependent.', 'Verify that returning to the previous tool is possible before moving anything important.'),
    ],
  },
  {
    id: 'fair-resources', track: 'judgment', title: 'What does fair look like?',
    description: 'Three people need support. You cannot help everyone equally.',
    context: 'You coordinate a community project with six hours of mentoring available this week. One person is new and confused, one is experienced but blocked, and one has an urgent deadline. All three have asked for the same amount of time.',
    facts: ['You have six mentoring hours.', 'The requests come from people with different needs.', 'Each person requested equal time.'],
    unknown: 'What help would unlock each person, and who has other sources of support?',
    focus: 'Fairness', minutes: 6,
    evidencePrompt: 'Ask about the specific blocker, deadline and alternatives available to each person.',
    peoplePrompt: 'Explain the allocation rule openly. Give everyone a chance to describe their need without promising equal outcomes.',
    approaches: [
      approach('need', 'Allocate by need', 'Give more time where support would prevent the greatest avoidable harm.', 'You distinguish equal treatment from support proportionate to a person\'s situation.', 'Urgent voices can crowd out quieter needs. Check whose difficulties are less visible.', 'Write the criteria before choosing how many hours each person receives.'),
      approach('equal', 'Start with equal access', 'Offer an initial hour each, then allocate the remaining time after learning more.', 'Everyone gets a chance to be heard, and later decisions use better information.', 'An urgent blocker may need more than an hour immediately. Allow an explained exception.', 'Use the first meetings to identify what one additional hour could change.'),
      approach('group', 'Create shared support', 'Use a group session for shared questions and reserve individual help for specific blockers.', 'You increase the number of people supported without pretending time is unlimited.', 'Some problems are private or too specialised for a group. Ask before sharing them.', 'Ask which questions people are comfortable discussing together.'),
    ],
  },
  {
    id: 'change-mind', track: 'judgment', title: 'When the evidence changes',
    description: 'You backed a plan. New information challenges it.',
    context: 'You persuaded a group to hold an outdoor event. A reliable forecast now suggests heavy rain, and the venue has offered a smaller indoor space. Some attendees prefer keeping the original plan. You feel responsible for defending the decision you made.',
    facts: ['The latest forecast suggests heavy rain.', 'An indoor alternative is available.', 'The indoor space has less capacity.'],
    unknown: 'How many people can safely attend indoors, and when must the venue receive a final decision?',
    focus: 'Updating beliefs', minutes: 5,
    evidencePrompt: 'Check the forecast timing, indoor capacity and the venue\'s decision deadline.',
    peoplePrompt: 'Explain what changed and acknowledge the inconvenience. Help people affected by the smaller venue.',
    approaches: [
      approach('update', 'Update the plan now', 'Move indoors and explain why the new information changes your recommendation.', 'You prioritise the event\'s outcome over protecting your previous position.', 'A smaller venue can exclude people. Address that cost alongside the weather risk.', 'Tell the group which new fact changed your view and how you will handle capacity.'),
      approach('threshold', 'Set a decision threshold', 'Agree a forecast condition and time at which you will move indoors.', 'You make the decision rule explicit and allow useful evidence to arrive.', 'Waiting is only helpful if the indoor option remains available until that time.', 'Confirm the latest safe decision time with the venue before setting your threshold.'),
      approach('consult', 'Consult the affected people', 'Explain the new constraints and invite a short, informed discussion.', 'You hear information about people\'s needs that the forecast cannot tell you.', 'Popularity cannot settle a safety or capacity constraint. Keep those boundaries clear.', 'Present the constraints first, then ask which feasible option best serves the group.'),
    ],
  },
  {
    id: 'public-challenge', track: 'communication', title: 'Challenged in the room',
    description: 'Someone questions your work in front of other people.',
    context: 'During a meeting, a colleague says, "This plan does not look thought through." Their tone feels dismissive. You have supporting evidence, but you do not yet know which part concerns them. The group is waiting for your response.',
    facts: ['The comment happened in a meeting.', 'The colleague has not identified a specific concern.', 'You have evidence supporting the plan.'],
    unknown: 'Is there a genuine weakness in the plan, a misunderstanding, or an issue with how the concern was expressed?',
    focus: 'Responding under pressure', minutes: 5,
    evidencePrompt: 'Ask which assumption or part of the plan concerns them. Compare that concern with your evidence.',
    peoplePrompt: 'Keep the conversation specific and respectful. You can address the tone separately without ignoring a valid concern.',
    approaches: [
      approach('clarify', 'Ask for the specific concern', 'Invite them to identify the part they believe needs more thought.', 'You make room for a useful challenge and avoid guessing their intention.', 'If dismissive comments continue, clarification alone may fail to protect the discussion.', 'Try: "Which part concerns you? Let us examine that assumption together."'),
      approach('boundary', 'Set a calm boundary', 'Ask for specific, respectful feedback and then examine the concern.', 'You protect the quality of the discussion while remaining open to criticism.', 'A boundary can sound defensive if it displaces the substantive question. Address both.', 'Try: "I am open to challenge. Please make it specific so we can assess it."'),
      approach('followup', 'Offer a focused follow-up', 'State your key evidence and propose a short discussion after the meeting.', 'You protect the meeting\'s time and create space for a more considered exchange.', 'Deferring can leave the group with an unanswered concern. Name what still needs checking.', 'Summarise the relevant evidence and agree exactly what the follow-up will resolve.'),
    ],
  },
  {
    id: 'say-no', track: 'communication', title: 'A clear no. A kind delivery.',
    description: 'Someone needs help, and your capacity is already full.',
    context: 'A friend asks you to help with a project this weekend. You care about them, but you have already committed the time to rest and family. You are tempted to say yes and figure out the consequences later.',
    facts: ['You have existing weekend commitments.', 'Your friend has requested your help.', 'You have not agreed yet.'],
    unknown: 'Do they need you specifically, or would a smaller contribution or another source of help work?',
    focus: 'Boundaries', minutes: 4,
    evidencePrompt: 'Check what support they actually need before assuming that only a full weekend would help.',
    peoplePrompt: 'Acknowledge their need and be honest about your availability. Avoid an offer you will later resent or withdraw.',
    approaches: [
      approach('clear-no', 'Decline clearly', 'Explain that you cannot commit this weekend and acknowledge the request.', 'A clear answer lets your friend make another plan and protects an existing commitment.', 'An abrupt refusal can leave them feeling unseen. Warmth helps without changing the boundary.', 'Try: "I care about this, but I cannot help this weekend. I wanted to give you a clear answer."'),
      approach('small-help', 'Offer a bounded contribution', 'Offer one specific task you can genuinely fit into your available time.', 'You support the relationship while making the limit visible.', 'A small offer can grow into the original request. State the limit before agreeing.', 'Offer a specific task and time limit, then let your friend decide whether it helps.'),
      approach('later', 'Offer another time', 'Suggest a later date if you have capacity and the project timeline allows it.', 'You preserve the possibility of helping without promising unavailable time.', 'A later offer is only useful if it fits their deadline. Check before treating it as a solution.', 'Ask whether a later date would be useful, and only propose time you can protect.'),
    ],
  },
  {
    id: 'give-feedback', track: 'communication', title: 'Feedback they can use',
    description: 'A repeated problem needs an honest conversation.',
    context: 'A teammate has delivered their contribution late twice. That has delayed your own work. You want to address the pattern, but you do not know what caused the delays. They usually contribute well and may not realise the effect on you.',
    facts: ['Two contributions arrived later than agreed.', 'Your work was delayed as a result.', 'You have not asked what caused the delays.'],
    unknown: 'Was the delay caused by unclear expectations, capacity, a blocker, or something else?',
    focus: 'Useful feedback', minutes: 5,
    evidencePrompt: 'Use the agreed dates and actual impact. Avoid turning two examples into a claim about their character.',
    peoplePrompt: 'Make space for their explanation. Aim for an agreement that protects both people\'s ability to deliver.',
    approaches: [
      approach('specific', 'Describe the pattern and impact', 'Name the two examples, explain the effect and ask what would help next time.', 'Specific observations create a problem you can both examine.', 'You may still be missing a constraint. Listen before deciding what they should change.', 'Try: "The last two handovers were late, which delayed my work. What got in the way?"'),
      approach('curious', 'Start with their perspective', 'Ask how the handovers have been going, then share your observations.', 'Curiosity may uncover a blocker that direct instructions would miss.', 'A vague conversation can avoid the actual problem. Bring the examples into the discussion.', 'Ask an open question, then explain the concrete effect on your work.'),
      approach('agreement', 'Propose a clearer agreement', 'Suggest a handover time and an early warning when the deadline is at risk.', 'You turn frustration into an observable future expectation.', 'A new process will not solve an underlying capacity problem by itself.', 'Agree when to flag a risk and what both people will do after that warning.'),
    ],
  },
  {
    id: 'repair-misunderstanding', track: 'communication', title: 'Repair the misunderstanding',
    description: 'Your message landed differently from how you intended.',
    context: 'You sent a brief message saying, "Do it however you want." You meant to give someone freedom, but they heard it as irritation and withdrawal. They tell you that the message upset them. You feel misunderstood too.',
    facts: ['You sent a short written message.', 'They interpreted it as irritation.', 'They have explained its effect on them.'],
    unknown: 'What wording would communicate both trust in their choice and your willingness to help?',
    focus: 'Repairing trust', minutes: 4,
    evidencePrompt: 'Ask which part sounded dismissive. Your intention and their experience are different pieces of information.',
    peoplePrompt: 'Acknowledge the impact without pretending your intention was something it was not. Invite clarification in both directions.',
    approaches: [
      approach('acknowledge', 'Acknowledge and clarify', 'Recognise the effect, explain your intention and rephrase the message.', 'You take their experience seriously while preserving an honest account of what you meant.', 'An explanation can sound like an excuse if it comes before acknowledging the impact.', 'Try: "I can see how that sounded dismissive. I meant that I trust your choice and am happy to help."'),
      approach('listen', 'Listen before explaining', 'Ask what they heard and what they needed from your message.', 'You learn what needs repairing instead of debating which interpretation is correct.', 'Listening needs a follow-through. Clarify your intention and agree better wording afterwards.', 'Ask: "What did that message communicate to you, and what would have helped?"'),
      approach('call', 'Move to a conversation', 'Suggest a short call and open by acknowledging the misunderstanding.', 'A richer conversation can convey tone and allow immediate clarification.', 'Changing the channel does not itself repair the impact. Do not skip acknowledgement.', 'Ask whether a call would help, and start with the effect your message had.'),
    ],
  },
];

export const lenses: { id: Lens; title: string; prompt: string; placeholder: string }[] = [
  { id: 'reasoning', title: 'Reasoning', prompt: 'Why is this approach appropriate here?', placeholder: 'Connect your choice to the goal and constraints...' },
  { id: 'evidence', title: 'Evidence', prompt: 'What do you know, and what would you check?', placeholder: 'Separate a fact from an assumption...' },
  { id: 'consequences', title: 'Consequences', prompt: 'What could go wrong? What would change your mind?', placeholder: 'Name a trade-off and a condition for reconsidering...' },
  { id: 'people', title: 'People', prompt: 'Who is affected, and how will you treat them?', placeholder: 'Consider dignity, honesty and existing commitments...' },
];
