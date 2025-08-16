let quotes = {
    text: "the best way to predict the future is to create it.",
    text: "be nice to yourself."
};

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.text.length);
    return quotes.text[randomIndex];
}

console.log(showRandomQuote());

function createAddQuoteForm() {
    const form = document.createElement('form');
    form.innerHTML = `
        <input type="text" id="newQuoteText" placeholder="Enter a new quote" required />
        <input type="text" id="newQuoteCategory" placeholder="Enter quote category" required />
        <button type="submit">Add Quote</button>
    `;
    document.body.appendChild(form);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const newQuoteText = document.getElementById('newQuoteText').value;
        const newQuoteCategory = document.getElementById('newQuoteCategory').value;
        addQuote(newQuoteText, newQuoteCategory);
    });
}