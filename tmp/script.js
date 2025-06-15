const fs = require('fs');

// Read the JSON file
const jsonData = fs.readFileSync('quotes.json', 'utf-8');
const movies = JSON.parse(jsonData);

movies.movieQuotes.forEach(movie => {
    movie.quotes.forEach(quote => {
        fs.appendFileSync('more-quotes.json', `"\\\"${quote.replace(/"/g, "'")}\\\" ${movie.title}",\n`, );
        //console.log(`"\\\"${quote}\\\" ${movie.title}"`);
    });
});
