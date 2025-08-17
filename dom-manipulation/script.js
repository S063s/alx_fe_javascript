let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "the best way to predict the future is to create it.", category: "inspiration" },
    { text: "be nice to yourself.", category: "self-care" }
];

function showRandomQuote() {
    const randomQuote = Math.floor(Math.random() * quotes.length);
    return quotes[randomQuote].text
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

function addQuote(text, category) {
    if (!text || !category) {
        alert("Both fields are required.");
        return;
    }
    
    const newQuote = { text, category };
    quotes.push(newQuote);
    localStorage.setItem('quotes', JSON.stringify(quotes));
    alert("Quote added successfully!");
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }

  