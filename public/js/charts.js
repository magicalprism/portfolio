// Fetch colors from CSS variables
const styles = getComputedStyle(document.documentElement);
const chartColors = {
    doughnut: [styles.getPropertyValue('--doughnut-color-1').trim(), styles.getPropertyValue('--doughnut-color-2').trim()],
};

// Chart.js plugin for text in the center
Chart.register({
    id: 'centerText',
    beforeDraw(chart) {
        const { width } = chart;
        const { height } = chart;
        const ctx = chart.ctx;
        ctx.save();
        const text = `${chart.data.datasets[0].data[0]}%`;
        const fontSize = (height / 100).toFixed(2);
        ctx.font = `${fontSize}em Arial`;
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#000';
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.restore();
    },
});

// Create a doughnut chart
function createDoughnutChart(ctx, data, labels) {
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: chartColors.doughnut,
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false, // Hide legend
                },
            },
        },
    });
}

// Initialize charts
createDoughnutChart(
    document.getElementById('firstImpressionsChart').getContext('2d'),
    [75, 25],
    ['Credibility by Design', 'Other Factors']
);

createDoughnutChart(
    document.getElementById('loadTimeChart').getContext('2d'),
    [7, 93],
    ['Conversion Loss', 'No Impact']
);

createDoughnutChart(
    document.getElementById('unclearMessagingChart').getContext('2d'),
    [88, 12],
    ['Bad UX', 'Good UX']
);

createDoughnutChart(
    document.getElementById('bounceRateChart').getContext('2d'),
    [38, 62],
    ['Bounce Rate', 'Stayed']
);
