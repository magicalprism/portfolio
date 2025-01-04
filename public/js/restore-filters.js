function restoreFiltersFromStorage() {
  const savedFilters = JSON.parse(localStorage.getItem("savedFilters"));
  if (!savedFilters) {
      console.warn("⚠️ No saved filters found in localStorage.");
      return;
  }

  console.log("🔄 Restoring filters from storage:", savedFilters);

  function restoreCheckboxes(name, values) {
      values.forEach(value => {
          const checkbox = document.querySelector(`input[name="${name}"][value="${value}"]`);
          if (checkbox) {
              checkbox.checked = true;
              console.log(`✅ Restored checkbox: ${name} = ${value}`);
              checkbox.dispatchEvent(new Event("change"));
          } else {
              console.warn(`⚠️ Checkbox not found: ${name} = ${value}`);
          }
      });
  }

  if (savedFilters.selectedIndustry) {
      const industryInput = document.querySelector(`input[name="industry"][value="${savedFilters.selectedIndustry}"]`);
      if (industryInput) {
          industryInput.checked = true;
          console.log(`✅ Restored industry: ${savedFilters.selectedIndustry}`);
          industryInput.dispatchEvent(new Event("change"));
      } else {
          console.warn(`⚠️ Industry radio button not found: ${savedFilters.selectedIndustry}`);
      }
  }

  restoreCheckboxes("problem", savedFilters.selectedProblems);
  restoreCheckboxes("feature", savedFilters.selectedFeatures);
  restoreCheckboxes("solution", savedFilters.selectedSolutions);
  restoreCheckboxes("objection", savedFilters.selectedObjections);

  // **Ensure Visibility Is Updated After Filters Are Restored**
  setTimeout(() => {
      console.log("🔁 Running updateDynamicVisibility() after restoring filters.");
      updateDynamicVisibility();
  }, 100);
}
