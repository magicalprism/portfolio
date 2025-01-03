document.addEventListener("DOMContentLoaded", () => {
  const businessInput = document.getElementById("business");
  const businessDisplay = document.getElementById("business-name");

  // Function to update the business name dynamically
  businessInput.addEventListener("input", () => {
    businessDisplay.textContent = businessInput.value || "[Your Business Name]";
  });
});
