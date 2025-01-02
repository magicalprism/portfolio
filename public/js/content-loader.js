// Load content index JSON
const loadContentIndex = async () => {
  try {
    const response = await fetch('/content/content-index.json');
    if (!response.ok) {
      console.error(`Failed to load content index JSON: ${response.status} ${response.statusText}`);
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching content index JSON:', error);
    return [];
  }
};

// Match form answers to partials
const findPartialsByTags = (contentIndex, tags) => {
  return contentIndex.filter(item => tags.every(tag => item.tags.includes(tag)));
};

// Dynamically create or find a section in the DOM
const getOrCreateSection = (sectionIdentifier) => {
  let section = document.querySelector(`[data-section="${sectionIdentifier}"]`);

  if (!section) {
    const dynamicContentContainer = document.querySelector('.dynamic-sections .content');
    if (!dynamicContentContainer) {
      console.error('Dynamic content container not found.');
      return null;
    }

    // Create a new section if it doesn't exist
    section = document.createElement('div');
    section.classList.add('dynamic-content');
    section.setAttribute('data-section', sectionIdentifier);
    dynamicContentContainer.appendChild(section);
  }

  return section;
};

// Load a partial into a specific section
const loadPartialToSection = async (partialPath, sectionIdentifier) => {
  const section = getOrCreateSection(sectionIdentifier);
  if (!section) return;

  try {
    const response = await fetch(partialPath);
    if (!response.ok) {
      console.error(`Failed to load partial: ${partialPath}`);
      return;
    }
    const content = await response.text();
    section.innerHTML = content; // Append content
    section.style.display = 'block'; // Ensure the section is visible
  } catch (error) {
    console.error(`Error loading partial: ${partialPath}`, error);
  }
};

// Process form answers and load relevant content
const processQuizAndLoadContent = async (answers) => {
  try {
    const contentIndex = await loadContentIndex();
    const tags = extractTagsFromAnswers(answers);

    // Match the tags to the partials
    const matchingPartials = findPartialsByTags(contentIndex, tags);

    if (!matchingPartials.length) {
      console.warn('No matching partials found for tags:', tags);
      return;
    }

    // Load matching partials for each section
    for (const { partial, tags } of matchingPartials) {
      // Extract `industry` and `problem` tags to form section identifier
      const industryTag = tags.find(tag => tag.startsWith('industry:'));
      const problemTag = tags.find(tag => tag.startsWith('problem:'));
      const sectionIdentifier = [industryTag, problemTag]
        .filter(Boolean)
        .map(tag => tag.split(':')[1]) // Use only the value (e.g., "wellness")
        .join('-'); // Combine with a dash (e.g., "wellness-presence")

      console.log(`Loading partial for section: ${sectionIdentifier}`, partial);

      await loadPartialToSection(partial, sectionIdentifier);
    }
  } catch (error) {
    console.error('Error processing quiz answers and loading content:', error);
  }
};

// Extract tags from form input
const extractTagsFromAnswers = (answers) => {
  const tags = [];
  if (answers.industry) tags.push(`industry:${answers.industry}`);
  if (answers.problem) answers.problem.forEach(p => tags.push(`problem:${p}`));
  if (answers.feature) answers.feature.forEach(f => tags.push(`feature:${f}`));
  if (answers.website) tags.push(`website:${answers.website}`);
  return tags;
};

// Form submission handling
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quiz-form');
  const dynamicSection = document.getElementById('dynamic-section');

  if (!form) {
    console.error('Form with ID "quiz-form" not found');
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Gather user answers
    const formData = new FormData(form);
    const answers = {
      industry: formData.get('industry'),
      problem: formData.getAll('problem'),
      feature: formData.getAll('feature'),
      website: formData.get('website'),
    };

    console.log('Form answers:', answers);

    // Show the dynamic section and hide the form
    document.getElementById('form-section').style.display = 'none';
    dynamicSection.style.display = 'block';

    // Process and load dynamic content
    await processQuizAndLoadContent(answers);
  });
});
