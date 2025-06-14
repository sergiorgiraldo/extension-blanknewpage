const fs = require('fs');

// Read the JSON file
const jsonData = fs.readFileSync('movies.json', 'utf-8');
const movies = JSON.parse(jsonData);

// Iterate through the movies and print quotes with titles
movies.movieQuotes.forEach(movie => {
    movie.quotes.forEach(quote => {
        console.log(`"${quote}", ${movie.title}`);
    });
});
