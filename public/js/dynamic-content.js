document.addEventListener("DOMContentLoaded", () => {
  function updateDynamicContent() {
    // Get the selected industry, problems, and features
    const industryInput = document.querySelector('input[name="industry"]:checked');
    const problemInputs = document.querySelectorAll('input[name="problem"]:checked');
    const featureInputs = document.querySelectorAll('input[name="feature"]:checked');

    const selectedIndustry = industryInput ? industryInput.value : null;
    const selectedProblems = Array.from(problemInputs).map(input => input.value);
    const selectedFeatures = Array.from(featureInputs).map(input => input.value);

    console.log("Selected Industry:", selectedIndustry);
    console.log("Selected Problems:", selectedProblems);
    console.log("Selected Features:", selectedFeatures);

    // Get all dynamic content sections
    const dynamicSections = document.querySelectorAll(".dynamic-content");

    // Iterate over each dynamic content section
    dynamicSections.forEach(section => {
      const sectionIndustry = section.getAttribute("data-industry");
      const sectionProblem = section.getAttribute("data-problem");
      const sectionFeature = section.getAttribute("data-feature");

      // Determine if the section should be visible
      const showSection =
        (!sectionIndustry || sectionIndustry === selectedIndustry) &&
        (!sectionProblem || selectedProblems.includes(sectionProblem)) &&
        (!sectionFeature || selectedFeatures.includes(sectionFeature));

      // Show or hide the section
      section.style.display = showSection ? "block" : "none";
      console.log(`Section ${section.getAttribute("data-section")} visibility: ${showSection}`);
    });
  }

  // Attach event listeners to form inputs
  const industryInputs = document.querySelectorAll('input[name="industry"]');
  const problemInputs = document.querySelectorAll('input[name="problem"]');
  const featureInputs = document.querySelectorAll('input[name="feature"]');

  industryInputs.forEach(input => input.addEventListener("change", updateDynamicContent));
  problemInputs.forEach(input => input.addEventListener("change", updateDynamicContent));
  featureInputs.forEach(input => input.addEventListener("change", updateDynamicContent));

  // Initial run to set visibility
  updateDynamicContent();
});
