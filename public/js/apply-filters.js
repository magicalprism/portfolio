function updateDynamicVisibility() {
  console.log("🚀 Running updateDynamicVisibility()");

  if (document.querySelectorAll(".dynamic-content").length === 0) {
      console.error("❌ ERROR: No dynamic-content sections found.");
      return;
  }

  const selectedIndustry = document.querySelector('input[name="industry"]:checked')?.value;
  const selectedProblems = Array.from(document.querySelectorAll('input[name="problem"]:checked')).map(input => input.value);
  const selectedFeatures = Array.from(document.querySelectorAll('input[name="feature"]:checked')).map(input => input.value);
  const selectedSolutions = Array.from(document.querySelectorAll('input[name="solution"]:checked')).map(input => input.value);
  const selectedObjections = Array.from(document.querySelectorAll('input[name="objection"]:checked')).map(input => input.value);

  console.log("🛠 Selected Filters:", { selectedIndustry, selectedProblems, selectedFeatures, selectedSolutions, selectedObjections });

  let foundVisible = false;

  document.querySelectorAll('.dynamic-content').forEach(section => {
      const sectionIndustry = section.getAttribute('data-industry');
      const sectionKey = section.getAttribute('data-key');

      let showSection = false;

      // **Forcefully Hide Everything First**
      section.style.display = "none";

      // **Filter Logic: Only Show Sections That Match Selected Industry & Keys**
      if (selectedIndustry && sectionIndustry === selectedIndustry) {
          if (!sectionKey || selectedProblems.includes(sectionKey) ||
              selectedFeatures.includes(sectionKey) ||
              selectedSolutions.includes(sectionKey) ||
              selectedObjections.includes(sectionKey)) {
              showSection = true;
          }
      }

      section.style.display = showSection ? "block" : "none";

      console.log(`🔎 Checking section: Industry=${sectionIndustry}, Key=${sectionKey}, Show=${showSection}, New Display=${section.style.display}`);

      if (showSection) {
          foundVisible = true;
          const parentContainer = section.closest('.dynamic-content[data-section]');
          if (parentContainer) {
              parentContainer.style.display = 'block';
              console.log(`✅ Ensuring parent container is also visible: ${parentContainer.getAttribute('data-section')}`);
          }
      }
  });

  // **If No Sections Are Visible, Show Everything as a Fallback**
  if (!foundVisible) {
      console.warn("⚠️ No matching content found. Resetting visibility.");
      document.querySelectorAll('.dynamic-content').forEach(section => {
          section.style.display = "block";
      });
  }

  console.log("✅ Visibility updated.");
}
