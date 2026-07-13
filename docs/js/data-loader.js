// Loads the taxonomy JSON (question bank) into IndexedDB on first run,
// and re-syncs when a newer data version is published (checked via index.json's "version" field).

async function fetchJSON(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.json();
}

async function loadTaxonomy(onProgress) {
  const index = await fetchJSON('data/taxonomy/index.json');
  const meta = await DB.get('meta', 'seeded');

  if (meta && meta.value && meta.version === index.version) {
    return { skipped: true, chapters: index.chapters.length };
  }

  const microSkills = [];
  const archetypes = [];
  let done = 0;

  for (const entry of index.chapters) {
    const chapterData = await fetchJSON(`data/taxonomy/${entry.file}`);
    for (const ms of chapterData.micro_skills || []) {
      microSkills.push({
        id: ms.id,
        chapter: chapterData.chapter,
        chapterTitle: chapterData.chapter_title,
        course: chapterData.course,
        section: ms.section,
        topic: ms.topic,
        subtopic: ms.subtopic,
        microSkill: ms.micro_skill,
        definitions: ms.definitions || [],
        theorems: ms.theorems || [],
        formulas: ms.formulas || [],
        prerequisites: ms.prerequisites || [],
        difficultyLevels: ms.difficulty_levels || [],
      });
      for (const a of ms.question_archetypes || []) {
        archetypes.push({
          id: a.id,
          microSkillId: ms.id,
          chapter: chapterData.chapter,
          course: chapterData.course,
          difficulty: a.difficulty || 'medium',
          promptTemplate: a.prompt_template,
          example: a.example,
          answer: a.answer,
          recognitionCue: a.recognition_cue,
          methodPlan: a.method_plan || [],
          fullMarkRubric: a.full_mark_rubric || [],
          commonErrors: a.common_errors || [],
          mergedTopics: a.merged_topics || [],
          similarPastExamQuestions: a.similar_past_exam_questions || [],
        });
      }
    }
    done += 1;
    if (onProgress) onProgress(done, index.chapters.length);
  }

  await DB.putAll('microSkills', microSkills);
  await DB.putAll('archetypes', archetypes);
  await DB.markSeeded(index.version);

  return { skipped: false, chapters: index.chapters.length, microSkills: microSkills.length, archetypes: archetypes.length };
}

window.DataLoader = { loadTaxonomy, fetchJSON };
