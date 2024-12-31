//only needed for dev- exclude git
const express = require('express'); // Import Express
const path = require('path'); // Import Path module for handling paths

const app = express(); // Create an instance of Express
const PORT = process.env.PORT || 3000; // Define the server port

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// Serve static files (e.g., CSS, JS, images) from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
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

app.get('/:page', (req, res) => {
    const page = req.params.page;
    try {
        res.render(`pages/${page}`, {
            pageMeta: {
                title: `${page.charAt(0).toUpperCase() + page.slice(1)} Page`,
                permalink: `/${page}`,
                lastmod: new Date().toISOString().split('T')[0],
                priority: 0.5,
            },
        });
    } catch (err) {
        res.status(404).send('Page not found');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
