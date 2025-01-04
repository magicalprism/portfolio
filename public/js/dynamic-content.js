document.addEventListener("DOMContentLoaded", () => {
    fetch('/content.json')
      .then((response) => response.json())
      .then((contentData) => {
        clearDynamicSections();
        populateSectionWithTemplate(contentData.hero, "dynamic-hero", "hero-template");
        populateSectionWithTemplate(contentData.introduction, "dynamic-introduction", "introduction-template");
        populateSectionWithTemplate(contentData.problems, "dynamic-problems", "loop-i-r-arrow-chart-4");
        populateSectionWithTemplate(contentData.features, "dynamic-features", "loop-i-box-blue");
        populateSectionWithTemplate(contentData.solutions, "dynamic-solutions", "loop-i-box-blue");
        populateSectionWithTemplate(contentData.objections, "dynamic-objections", "loop-i-box-blue");
        
        attachEventListeners();
      })
      .catch((error) => console.error("❌ Error loading content:", error));
  
    // Clear all dynamic sections before repopulating
    function clearDynamicSections() {
      document.querySelectorAll('.dynamic-content-container').forEach((container) => {
        container.innerHTML = ''; // Remove previous content
      });
    }
  
    // **Populate Sections Using Templates**
    function populateSectionWithTemplate(sectionData, containerId, templateId) {
      const container = document.getElementById(containerId);
      const template = document.getElementById(templateId);
  
      if (!container || !template) {
        console.error(`❌ Missing container (${containerId}) or template (${templateId})`);
        return;
      }
  
      container.innerHTML = ''; // Clear before adding new content
  
      Object.entries(sectionData).forEach(([industry, items]) => {
        Object.entries(items).forEach(([key, data]) => {
          if (!data.title || !data.content) return;
  
          let section = template.content.cloneNode(true);
          let sectionDiv = section.querySelector('.dynamic-content') || section.firstElementChild;
  
          if (!sectionDiv) {
            console.error(`❌ No '.dynamic-content' found in template '${templateId}'.`);
            return;
          }
  
          // Fill in content
          let titleElement = sectionDiv.querySelector('.section-title');
          let contentElement = sectionDiv.querySelector('.section-content');
  
          if (titleElement) titleElement.textContent = data.title;
          if (contentElement) contentElement.innerHTML = Array.isArray(data.content) ? data.content.join(' ') : data.content;
  
          // Ensure proper attributes for filtering
          sectionDiv.setAttribute('data-industry', industry || "default");
          sectionDiv.setAttribute('data-key', key ? key.trim() : "general");
  
          sectionDiv.style.display = 'none'; // Hide until filters are applied
  
          container.appendChild(section);
        });
      });
  
      updateDynamicContent(); // Apply filtering after population
    }
  
    // **Attach event listeners for filtering**
    function attachEventListeners() {
      const inputs = document.querySelectorAll('input[name="industry"], input[name="problem"], input[name="feature"], input[name="solution"], input[name="objection"]');
  
      inputs.forEach(input => {
        input.addEventListener("change", () => {
          console.log(`📢 Input changed: ${input.name} = ${input.value}`);
          updateDynamicContent();
        });
      });
  
      console.log("✅ Event listeners attached to filters");
  
      updateDynamicContent(); // Apply filtering immediately after attaching
    }
  
    // **Update content visibility based on selected filters**
    function updateDynamicContent() {
      console.log("🚀 Running updateDynamicContent()");
      
      const selectedIndustry = document.querySelector('input[name="industry"]:checked')?.value;
      const selectedProblems = Array.from(document.querySelectorAll('input[name="problem"]:checked')).map(input => input.value);
      const selectedFeatures = Array.from(document.querySelectorAll('input[name="feature"]:checked')).map(input => input.value);
      const selectedSolutions = Array.from(document.querySelectorAll('input[name="solution"]:checked')).map(input => input.value);
      const selectedObjections = Array.from(document.querySelectorAll('input[name="objection"]:checked')).map(input => input.value);
  
      console.log("Selected Industry:", selectedIndustry);
      console.log("Selected Problems:", selectedProblems);
      console.log("Selected Features:", selectedFeatures);
      console.log("Selected Solutions:", selectedSolutions);
      console.log("Selected Objections:", selectedObjections);
  
      document.querySelectorAll('.dynamic-content').forEach((section, index) => {
        const sectionIndustry = section.getAttribute('data-industry');
        const sectionKey = section.getAttribute('data-key');
  
        console.log(`🔹 Checking Section ${index + 1}:`, { sectionIndustry, sectionKey });
  
        let showSection = !selectedIndustry || sectionIndustry === selectedIndustry;
  
        if (sectionKey) {
          showSection = showSection && (
            selectedProblems.includes(sectionKey) ||
            selectedFeatures.includes(sectionKey) ||
            selectedSolutions.includes(sectionKey) ||
            selectedObjections.includes(sectionKey)
          );
        }
  
        console.log(`➡ Section ${sectionKey}: ${showSection ? "SHOWING ✅" : "HIDING ❌"}`);
        section.style.display = showSection ? 'block' : 'none';
      });
    }
  });
  