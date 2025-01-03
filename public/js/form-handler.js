document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("quiz-form");
  const formSection = document.getElementById("form-section");
  const dynamicSection = document.getElementById("dynamic-section");
  const userSelections = {}; // Store user answers for external use

  // Handle form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Capture form data
    const formData = new FormData(form);
    userSelections.industry = formData.get("industry"); // Single value (radio buttons)
    userSelections.problem = formData.getAll("problem"); // Array of values (checkboxes)

    // Hide form and show dynamic content section
    formSection.style.display = "none";
    dynamicSection.style.display = "block";

    // Trigger dynamic content update (emit event for logic handling)
    const updateEvent = new CustomEvent("updateContent", {
      detail: userSelections,
    });
    document.dispatchEvent(updateEvent);
  });
});
