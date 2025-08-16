const quotes = {}
// quote = {(category): random quote from that category}
quotes['inspirational'] = [
  "The best way to predict the future is to create it.",
  "You are never too old to set another goal or to dream a new dream.",
  "Believe you can and you're halfway there."
]


function showRandomQuote(category) {
  const quotesByCategory = quotes[category] || []
  const randomIndex = Math.floor(Math.random() * quotesByCategory.length)
  return quotesByCategory[randomIndex]
}
console.log(showRandomQuote('inspirational'))