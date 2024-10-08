const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader');


let apiQuotes = [];

// show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// show new quote
function newQuote(){
    loading();
    // pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    

    // checking quote length
    if (quote.quote.length > 100){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // set quote, hide loader
    authorText.textContent = quote.author;
    quoteText.textContent = quote.quote;
    complete();
    
}
// Getting quotes from API
async function getQuotes(){
    loading();
    const apiUrl = 'https://dummyjson.com/quotes';
    try{
        const response = await fetch(apiUrl);
        apiObject = await response.json();
        apiQuotes = apiObject.quotes
        
        newQuote();
        // console.log(apiQuotes.quotes[0]);
        // console.log(apiQuotes.quotes.length);
        
    } catch (error){
        // catch error here
            console.log(error);
            
    }
}

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// event listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote)

// on Load
getQuotes();