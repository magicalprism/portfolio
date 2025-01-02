// First Impressions Chart
const firstImpressionsCtx = document.getElementById('firstImpressionsChart').getContext('2d');
new Chart(firstImpressionsCtx, {
    type: 'doughnut',
    data: {
        labels: ['Users Judging Credibility by Design', 'Other Factors'],
        datasets: [{
            data: [75, 25],
            backgroundColor: ['#4CAF50', '#FFC107'],
        }],
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    },
});

// Impact of Slow Load Times
const loadTimeCtx = document.getElementById('loadTimeChart').getContext('2d');
new Chart(loadTimeCtx, {
    type: 'bar',
    data: {
        labels: ['Conversion Loss', 'Page View Drop', 'Customer Satisfaction Drop'],
        datasets: [{
            label: 'Percentage Impact',
            data: [7, 11, 16],
            backgroundColor: ['#FF5722', '#03A9F4', '#8BC34A'],
        }],
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});

// Effect of Unclear Messaging
const unclearMessagingCtx = document.getElementById('unclearMessagingChart').getContext('2d');
new Chart(unclearMessagingCtx, {
    type: 'pie',
    data: {
        labels: ['Visitors Unlikely to Return After Bad Experience', 'Visitors Likely to Return'],
        datasets: [{
            data: [88, 12],
            backgroundColor: ['#E91E63', '#9C27B0'],
        }],
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    },
});

// Bounce Rates by Load Time
const bounceRateCtx = document.getElementById('bounceRateChart').getContext('2d');
new Chart(bounceRateCtx, {
    type: 'line',
    data: {
        labels: ['2 seconds', '3 seconds', '4 seconds', '5 seconds'],
        datasets: [{
            label: 'Bounce Rate (%)',
            data: [9, 15, 25, 38],
            borderColor: '#3F51B5',
            fill: false,
        }],
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});