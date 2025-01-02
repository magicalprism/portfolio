const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Route for the homepage
app.get('/', (req, res) => {
    res.render('pages/index', {
        pageMeta: {
            title: 'Home Page',
            permalink: '/',
            lastmod: '2024-12-31',
            priority: 1.0,
        },
    });
});

// Route for dynamic pages
app.get('/:page', (req, res) => {
    const page = req.params.page;
    const pagePath = path.join(__dirname, 'views', 'pages', `${page}.ejs`);

    if (fs.existsSync(pagePath)) {
        res.render(`pages/${page}`, {
            pageMeta: {
                title: `${page.charAt(0).toUpperCase() + page.slice(1)} Page`,
                permalink: `/${page}`,
                lastmod: new Date().toISOString().split('T')[0],
                priority: 0.5,
            },
        });
    } else {
        res.status(404).send('Page not found');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
