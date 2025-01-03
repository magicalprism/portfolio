function attachEventListeners() {
  document
    .querySelectorAll(
      'input[name="industry"], input[name="problem"], input[name="feature"], input[name="solution"], input[name="objection"]',
    )
    .forEach((input) =>
      input.addEventListener("change", () => {
        updateDynamicVisibility();
        saveFiltersToStorage();
      }),
    );
}

function saveFiltersToStorage() {
  const selectedIndustry =
    document.querySelector('input[name="industry"]:checked')?.value || "";
  const selectedProblems = Array.from(
    document.querySelectorAll('input[name="problem"]:checked'),
  ).map((input) => input.value);
  const selectedFeatures = Array.from(
    document.querySelectorAll('input[name="feature"]:checked'),
  ).map((input) => input.value);
  const selectedSolutions = Array.from(
    document.querySelectorAll('input[name="solution"]:checked'),
  ).map((input) => input.value);
  const selectedObjections = Array.from(
    document.querySelectorAll('input[name="objection"]:checked'),
  ).map((input) => input.value);

  const filterData = {
    selectedIndustry,
    selectedProblems,
    selectedFeatures,
    selectedSolutions,
    selectedObjections,
  };

  localStorage.setItem("savedFilters", JSON.stringify(filterData));
}
