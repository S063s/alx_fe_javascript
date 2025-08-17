const quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "the best way to predict the future is to create it.", category: "inspiration" },
    { text: "be nice to yourself.", category: "self-care" }
];

async function fetchQuotesFromServer() {
    quoteDisplay.innerHTML = '<p class="loading">Loading...</p>';
    try {
        const response = await fetch ('https://jsonplaceholder.typicode.com/posts')

        if (!response.ok) {
            throw new error ('http error ! status')
            
        }
    } catch (error) {
        quoteDisplay.innerHTML = `<p class="error">Failed to fetch quotes: ${error.message}</p>`;
    }
}

function showRandomQuote() {
      const selectedCategory = categoryFilter.value;
        const filteredQuotes = filterQuotes(selectedCategory);

        if (filteredQuotes.length === 0) {
            quoteDisplay.innerHTML = `<p>No quotes found for this category.</p>`;
            return;
        }

        const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
        displayQuote(randomQuote);
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

async function postQuoteToServer(newQuote) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(newQuote) 
        });

        const data = await response.json();
        console.log('Server response:', data);
        showMessage("Quote added to server successfully!");

    } catch (error) {
        console.error('Error posting quote:', error);
        showMessage("Error adding quote to server.");
    }
}


function addQuote(text, category) {
    if (!text || !category) {
        alert("Both fields are required.");
        return;
    }

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

function populateCategories() {
    const allCategories = quotes.map(_quote => _quote.category)
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


 

