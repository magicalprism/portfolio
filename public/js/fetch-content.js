async function fetchContent() {
  try {
    const response = await fetch("/content.json");
    return await response.json();
  } catch (error) {
    console.error("❌ Error loading content:", error);
    return {};
  }
}

async function preloadContent(contentData) {
  const sections = {
      hero: { containerId: "dynamic-hero", templateId: "hero-template" },
      introduction: { containerId: "dynamic-introduction", templateId: "introduction-template" },
      problems: { containerId: "dynamic-problems", templateId: "loop-i-r-arrow-chart-4", hasCharts: true },
      features: { containerId: "dynamic-features", templateId: "loop-i-box-blue" },
      solutions: { containerId: "dynamic-solutions", templateId: "loop-i-box-blue" },
      objections: { containerId: "dynamic-objections", templateId: "loop-i-box-blue" }
  };

  for (const [key, config] of Object.entries(sections)) {
      const container = document.getElementById(config.containerId);
      const template = document.getElementById(config.templateId);

      if (!container || !template) continue;

      container.innerHTML = ''; // Clear previous content

      if (!contentData[key]) continue;

      Object.entries(contentData[key]).forEach(([industry, items]) => {
          Object.entries(items).forEach(([itemKey, data]) => {
              if (!data.title || !data.content) return;

              let sectionElement = template.content.cloneNode(true);
              let dynamicDiv = sectionElement.querySelector(".dynamic-content") || sectionElement.firstElementChild;

              if (!dynamicDiv) {
                  console.error(`❌ Template for '${key}' is missing .dynamic-content!`);
                  return;
              }

              // **Set filtering attributes**
              dynamicDiv.setAttribute("data-industry", industry || "undefined-industry");
              dynamicDiv.setAttribute("data-key", itemKey || "undefined-key");

              let titleElement = dynamicDiv.querySelector(".hero-title, .section-title");
              let contentElement = dynamicDiv.querySelector(".hero-content, .section-content");

              if (titleElement) titleElement.textContent = data.title;
              if (contentElement) contentElement.innerHTML = Array.isArray(data.content) ? data.content.join(" ") : data.content;

              // **If the section has charts, populate them**
              if (config.hasCharts) {
                  let chartContainer = dynamicDiv.querySelector(".row-chart-4");

                  if (data.charts && data.charts.length > 0) {
                      let chartHTML = "";
                      data.charts.forEach((chartData, index) => {
                          chartHTML += `
                              <div class="col-md-3">
                                  <canvas id="${chartData.id}"></canvas>
                                  <p class="chart-title">${chartData.label}</p>
                              </div>
                          `;
                          initializeChart(chartData);
                      });

                      chartContainer.innerHTML = chartHTML;
                  } else {
                      // **Hide chart section if no charts exist**
                      chartContainer.style.display = "none";
                  }
              }

              container.appendChild(sectionElement);
          });
      });
  }
}

// **Initialize Chart.js for dynamic charts**
function initializeChart(chartConfig) {
  const ctx = document.getElementById(chartConfig.id);
  if (ctx) {
      new Chart(ctx, {
          type: chartConfig.type || 'bar',
          data: chartConfig.data,
          options: chartConfig.options || {}
      });
  }
}


// **Initialize Chart.js for dynamic charts**
function initializeChart(chartConfig) {
  const ctx = document.getElementById(chartConfig.id);
  if (ctx) {
    new Chart(ctx, {
      type: chartConfig.type || "bar",
      data: chartConfig.data,
      options: chartConfig.options || {}
    });
  }
}
