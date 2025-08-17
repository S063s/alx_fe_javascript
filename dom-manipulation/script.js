const quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "the best way to predict the future is to create it.", category: "inspiration" },
    { text: "be nice to yourself.", category: "self-care" }
];

function showRandomQuote() {
    const randomQuote = Math.floor(Math.random() * quotes.length);
    return quotes[randomQuote]

}


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

    populateCategories(),

    alert("quote added successfully");
    showRandomQuote();
    
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
  
document.getElementById("exportQuotesBtn").addEventListener("click", function () {
    const quotes = JSON.parse(localStorage.getItem("quotes")) || [];
    const jsonString = JSON.stringify(quotes, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json"; 
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

function populateCategories(allCategories) {
    const uniqueCategories = [...new Set(allCategories)];
    const categoryFilter = document.getElementById("category-filter");
    categoryFilter.innerHTML = '<option value="all">All</option>';

    uniqueCategories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}


 

