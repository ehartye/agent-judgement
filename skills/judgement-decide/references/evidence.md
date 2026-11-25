# Why each step is there

Read this when someone asks why. Each row gives the step, what was found, how it was found, and where
to read it. Many rows on AI give the model and year, because results about models age faster than
results about people.

- [Frame](#frame) · [Lean](#lean) · [Widen](#widen) · [Weigh](#weigh) · [Test](#test) ·
  [Commit](#commit) · [Return](#return)
- [Where AI in decisions has paid off](#where-ai-in-decisions-has-paid-off)
- [What nobody has tested yet](#what-nobody-has-tested-yet)

## Frame

| Step | Found | How | Source |
| ---- | ----- | --- | ------ |
| Ask whether it can be known before talking about options | A one-paragraph triage instruction cut commitments on questions nobody could answer from 54.0% to 10.2% | Benchmark, market price questions, 2026 | [Aggarwal 2026](https://arxiv.org/abs/2608.27167) |
| Match effort to how hard it is to undo | Records are graded: a memo may do for more minor decisions | Official handbook | [NASA 2024](https://ntrs.nasa.gov/api/citations/20240014019/downloads/SP-20240014019.pdf) |
| Keep who analyses apart from who checks | Analyst and assurer are separate people in every case | Government guidance | [UK AQuA Book 2025](https://www.gov.uk/guidance/the-aqua-book) |

## Lean

| Step | Found | How | Source |
| ---- | ----- | --- | ------ |
| Views recorded before the model speaks | Analysts matched the agent's planted lean on 86% of analysis choices; 77% reused its argument and 15% credited it. The final recommendation moved less, from 36% to 54% | Experiment, 50 analysts, Claude Opus 4.8 (vendor study) | [Anthropic 2026](https://www.anthropic.com/research/agents-judgment-calls) |
| Ask later which fact moved you | In 38 cases with a stated view, 60% switched if the agent disagreed and 6% if it agreed; in a trial, putting people first or the model first made no significant difference (3.0 points, p = 0.22) | Not randomised, Claude Opus 4.8 (vendor study); trial, GPT-4 | [Anthropic 2026](https://www.anthropic.com/research/agents-judgment-calls), [Everett et al. 2026](https://www.nature.com/articles/s41746-026-02545-1) |
| Alone, then compared | Structured anonymous rounds beat ordinary groups five studies to one; sharing reasons helped, sharing averages alone did not | Review | [Rowe and Wright 2001](https://gwern.net/doc/statistics/prediction/2001-rowe.pdf) |
| Count agreement reached before talking | Talking after independent judging left accuracy at 62% (63.0 to 62.2) and raised confidence from 65.8 to 71.1 | Experiment, 127 people | [Carro et al. 2026](https://arxiv.org/abs/2610.28539) |
| Trust a gut feeling only with practice and quick feedback | Skilled intuition needs regular cues and "feedback that is both rapid and unequivocal"; feeling sure is not a sign of being right | Joint paper by two rival schools | [Kahneman and Klein 2009](https://doi.org/10.1037/a0016755) |
| Keep confidence apart from quality | A three-agent system raised managers' belief in their plans by 3.3 points, with no significant gain in expert-rated quality on average | Randomised, 976 managers, GPT-4o | [Camuffo et al. 2026](https://doi.org/10.1287/stsc.2025.0432) |

## Widen

| Step | Found | How | Source |
| ---- | ----- | --- | ------ |
| Criteria set first, rated one at a time, overall view last | The method used here | Expert proposal | [Kahneman, Lovallo and Sibony 2019](https://sloanreview.mit.edu/article/a-structured-approach-to-strategic-decisions/) |
| Bring the model's options in early | Help before the screen beat help after it (g = 0.62); late help gave 73% more proposals than no help, with no detectable gain in quality | Randomised, 148 teams, DeepSeek V3.2 | [Huang et al. 2026](https://arxiv.org/abs/2610.14984) |
| Make "do both" say what it gives up | Asked freely, ChatGPT often recommended doing both; the authors call that a red flag | Simulations, ChatGPT | [HBR 2026](https://hbr.org/2026/03/researchers-asked-llms-for-strategic-advice-they-got-trendslop-in-return) |

## Weigh

| Step | Found | How | Source |
| ---- | ----- | --- | ------ |
| Lay out options, odds and what matters to you | Patients' informed choices matched their values more often (risk ratio 1.75) | 21 health trials of 209, moderate certainty | [Stacey et al. 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC10823577/) |
| Look at similar cases | 62% of projects planned this way finished in budget, against a 50% target | 39 UK transport projects | [Park 2021](https://journals.open.tudelft.nl/ejtir/article/download/5504/5000/18137) |
| Pool facts, then score separately | Help raised facts shared by 2.9, with no significant effect on the choice | Experiment, 281 groups, GPT-4o | [Alsobay et al. 2026](https://arxiv.org/abs/2508.08242) |
| Open the source, not the note about it | After a step was logged as done but had failed, decision models still went ahead 53% to 100% of the time | Benchmark, 4 models, 2026 | [Khezresmaeilzadeh et al. 2026](https://arxiv.org/abs/2610.25947) |
| Gather apart, then compare side by side | Gathering blind before sharing added 3.8 points; 58% of wrong answers had already had the right one in hand | Benchmark, Qwen 3.5 and GPT-5, 2026 (vendor study) | [Yoon et al. 2026](https://arxiv.org/abs/2609.01870) |
| Say what each piece changes | Evidence that had been gathered went unused in 68% of traces | Benchmark, 3 models, 2026 | [Ríos-García et al. 2026](https://arxiv.org/abs/2604.18805) |
| Ask the same questions about every option | An AI interviewer covered 45% of its guide's topics against 38% for people; its applicants got more offers, 9.73% against 8.70% | Field experiment, 67,056 applications, 2025 | [Jabarian and Henkel 2026](https://www.ifo.de/DocDL/cesifo1_wp12984.pdf) |
| Change the order | Flipping the order of two options cut the favoured answer by 19% | Simulations, ChatGPT-5 | [HBR 2026](https://hbr.org/2026/03/researchers-asked-llms-for-strategic-advice-they-got-trendslop-in-return) |

## Test

| Step | Found | How | Source |
| ---- | ----- | --- | ------ |
| Both sides of every option | Two-sided debate took people from 41.3% to 57.6% correct; one-sided advice raised confidence and not accuracy | Experiments, 92 and 80 people | [Carro et al. 2026](https://arxiv.org/abs/2610.28539) |
| Only evidence moves a verdict | In 25 turns on false premises, four 2026 models ended wrong in 65% to 97% of cases | Benchmark, 2026 | [Tang et al. 2026](https://arxiv.org/abs/2609.09090) |
| Change when the evidence is good | Claude Opus 5.5 followed 0.8% of unsound arguments and 32.2% of sound ones; GPT-6 Astra followed 0.15% and 88.3% | Benchmark, 2026 | [Ballon et al. 2026](https://arxiv.org/abs/2610.15634) |
| A model's stated confidence does not settle it | Thresholds picked by point estimate broke their promised accuracy in 147 of 190 checks; a rule with a guarantee kept it in all | Benchmark, decision models, 2026 | [Brom 2026](https://arxiv.org/abs/2610.36311) |
| Flatten the wording | Rewriting an answer in an emotional tone moved verdicts in 29 to 38 of 100 cases beyond chance | Benchmark, 5 current judges, 2026 | [Lukassen et al. 2026](https://arxiv.org/abs/2610.18122) |
| A fresh start for the model's own view | Having seen the person's answer, the model held all their diagnoses in 48% of cases, against 3% | Trial, 58 cases looked at afterwards, GPT-4 | [Everett et al. 2026](https://www.nature.com/articles/s41746-026-02545-1) |
| Models agreeing is about two votes | Nine models from seven families were worth about two independent votes | Benchmark | [Kohli 2026](https://arxiv.org/abs/2605.29800) |
| One strong model rather than a panel | Two vendors' models disagreed on 1 of 20 decisions; the panel never outscored the better one | Pre-registered, with deviations, 20 decisions | [Tribunal 2026](https://github.com/kdoubt/tribunal) |
| Name the conflict before solving it | Models detect that a conflict exists (F1 0.75 to 0.90) far better than which one (0.29 to 0.45) | Benchmark, 2026 | [Wang and Uzzi 2026](https://aclanthology.org/2026.findings-acl.1798.pdf) |
| Tell the failure story | Both Kahneman and Klein see potential in it | Expert agreement | [Kahneman and Klein 2009](https://doi.org/10.1037/a0016755) |

## Commit

| Step | Found | How | Source |
| ---- | ----- | --- | ------ |
| Forecast with numbers | Under an hour of training improved forecasts by 6% to 12% in each of four years | Randomised, real outcomes | [Chang et al. 2016](https://journal.sjdm.org/16/16511/jdm16511.pdf) |
| Keep likelihood and grounds apart | Analysts must not state both in one sentence | Intelligence standard | [ICD 203](https://www.dni.gov/files/documents/ICD/ICD-203.pdf) |
| Signs that would reopen it | Vulnerable assumptions under the plan get signposts and hedges | Method chapter | [Lempert 2019](https://link.springer.com/chapter/10.1007/978-3-030-05252-2_2) |
| A person's own reason before a serious commitment | Written justification can be required; a low override rate may mean rubber-stamping | Government framework | [Singapore IMDA 2026](https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf) |
| A second account of what happened | An account written outside the agent exposed 64 of 66 altered records and flagged none of 84 honest ones | Benchmark, 2026 | [Dai et al. 2026](https://arxiv.org/abs/2609.32495) |
| "Not yet" is an answer | The best of 17 agents acted and abstained correctly on 59.5% of paired tasks | Benchmark, to mid 2026 | [Liu et al. 2026](https://arxiv.org/abs/2607.10059) |

## Return

| Step | Found | How | Source |
| ---- | ----- | --- | ------ |
| Find out what happened | With explanations, people with AI fell behind the better of the two when there was no feedback on outcomes (g = −0.31); with feedback, 0.3 and the interval crosses 0 | Re-analysis of 74 studies, 10 with feedback | [Berger et al. 2026](https://arxiv.org/abs/2512.13253) |
| Judge by outcomes, not by how good it looks | Rated treatment plans improved (odds 1.71, 2,000 visits); treatment failure did not change significantly | Trial, 9,691 patients, GPT-4o | [Agweyu et al. 2026](https://www.nature.com/articles/s41591-026-04503-6) |
| Compare people with and without it, at the same time | All 8 users found the tool useful; drafts were not significantly better (p = 0.37) | Randomised, 788 drafts | [Magesh et al. 2026](https://dho.stanford.edu/wp-content/uploads/CDLE.pdf) |

## Where AI in decisions has paid off

| What | Found | How | Source |
| ---- | ----- | --- | ------ |
| A model collects, a person decides | 12% more offers, and 18% more people starting and still there a month later | 67,056 job applications, 2025 | [Jabarian and Henkel 2026](https://www.ifo.de/DocDL/cesifo1_wp12984.pdf) |
| Judges given a source-linked assistant and training | 6.3% more cases resolved at median exposure, an association | 118 districts, 2024 | [Mehmood et al. 2026](https://elliottash.com/papers/Mehmood-Goessmann-Ash-Courts-of-Tomorrow-Evidence-Nationwide-Rollout-Generative-AI.pdf) |
| A model running the process, not giving the answer | Correct group choices rose from 32.6% to 56.5% | Randomised, 138 groups, GPT-5 | [Córdova et al. 2026](https://arxiv.org/abs/2611.19652) |
| People with AI | Better than people alone (g = 0.53); behind the better of the two where both were tested (g = −0.35) | 420 papers, generative AI, automated review | [Vaccaro et al. 2026](https://arxiv.org/abs/2610.42001) |

As we read them, the first three share a bounded job for the model and a person who decides.

## What nobody has tested yet

We found no test of a complete guide like this one, on real one-off decisions, judged by how they turned out. Keeping
the record and coming back is how you start to find out.
