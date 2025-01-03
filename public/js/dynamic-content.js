async function fetchContent() {
  try {
    const response = await fetch("/content.json");
    return await response.json();
  } catch (error) {
    return {};
  }
}

async function preloadContent(contentData) {
  const sections = {
    problems: {
      containerId: "dynamic-problems",
      templateId: "loop-i-r-arrow-chart-4",
      hasCharts: true,
    },
    features: {
      containerId: "dynamic-features",
      templateId: "loop-i-box-blue",
    },
    solutions: {
      containerId: "dynamic-solutions",
      templateId: "loop-i-box-blue",
    },
    objections: {
      containerId: "dynamic-objections",
      templateId: "loop-i-box-blue",
    },
  };

  for (const [key, config] of Object.entries(sections)) {
    const container = document.getElementById(config.containerId);
    const template = document.getElementById(config.templateId);

    if (!container || !template) continue;

    container.innerHTML = ""; // Clear previous content

    if (!contentData[key]) continue;

    Object.entries(contentData[key]).forEach(([industry, items]) => {
      Object.entries(items).forEach(([itemKey, data]) => {
        if (!data.title || !data.content) return;

        // **Clone the correct template**
        let sectionElement = template.content.cloneNode(true);
        let dynamicDiv =
          sectionElement.querySelector(".dynamic-content") ||
          sectionElement.firstElementChild;

        if (!dynamicDiv) return;

        // **Set filtering attributes**
        dynamicDiv.setAttribute("data-industry", industry);
        dynamicDiv.setAttribute("data-key", itemKey);

        // **Populate content**
        let titleElement = dynamicDiv.querySelector(".section-title");
        let contentElement = dynamicDiv.querySelector(".section-content");

        if (titleElement) titleElement.textContent = data.title;
        if (contentElement)
          contentElement.innerHTML = Array.isArray(data.content)
            ? data.content.join(" ")
            : data.content;

        // **If the section has charts, populate them**
        if (config.hasCharts && data.charts) {
          let chartContainers = dynamicDiv.querySelectorAll(".col-md-3 canvas");

          data.charts.forEach((chartData, index) => {
            if (chartContainers[index]) {
              chartContainers[index].setAttribute("id", chartData.id);
              let chartTitle = chartContainers[index].nextElementSibling;
              if (chartTitle) chartTitle.textContent = chartData.label;
              initializeChart(chartData);
            }
          });
        }

        // **Append to container**
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
      type: chartConfig.type || "bar",
      data: chartConfig.data,
      options: chartConfig.options || {},
    });
  }
}
