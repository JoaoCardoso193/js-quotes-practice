document.addEventListener('DOMContentLoaded', () => {
    
    let quoteList = document.querySelector('ul#quote-list')
    let newQuoteForm = document.querySelector('form#new-quote-form')
    let sortButton = document.querySelector('button#author-sort')

    function ce(element){
        return document.createElement(element)
    }

    function fetchQuotes(sort = false){
        if (sortButton.innerText == "OFF"){
            sort = false
        }
        if (sortButton.innerText == "ON"){
            sort = true
        }
        quoteList.innerHTML = ""
        fetch('http://localhost:3000/quotes?_embed=likes')
        .then(res => res.json())
        .then(quotes => addQuotes(quotes, sort))
    }

    function addQuotes(quotes, sort){
        if (sort == true){
            quotes = quotes.sort((a,b) => (a.author > b.author) ? 1 : -1)
        }
        quotes.forEach(quote => addQuote(quote))
    }

    function addQuote(quote){

        let li = ce('li')
        li.className = 'quote-card'

        let blockquote = ce('blockquote')
        blockquote.className = 'blockquote'

        let p = ce('p')
        p.className = 'mb-0'
        p.innerText = quote.quote

        let footer = ce('footer')
        footer.className = 'blockquote-footer'
        footer.innerText = quote.author

        let br = ce('br')

        let likeBtn = ce('button')
        likeBtn.className = 'btn-success'
        likeBtn.innerText = 'Likes: '

        let span = ce('span')
        span.innerText = quote.likes.length
        
        likeBtn.append(span)

        let deleteBtn = ce('button')
        deleteBtn.className = 'btn-danger'
        deleteBtn.innerText = 'Delete'

        blockquote.append(p, footer, br, likeBtn, deleteBtn)
        li.append(blockquote)
        quoteList.append(li)

        likeBtn.addEventListener('click', () => {

            let configObj = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "quoteId": quote.id,
                    "createdAt": Date.now()
                })
            }
            fetch('http://localhost:3000/likes', configObj)
            .then(fetchQuotes())
        })

        deleteBtn.addEventListener('click', () => {

            let configObj = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }
            
            fetch(`http://localhost:3000/quotes/${quote.id}`, configObj)
            .then(fetchQuotes())
        })

    }

    fetchQuotes()

    newQuoteForm.addEventListener('submit', () => {
        event.preventDefault()
        let quoteText = event.target[0].value
        let quoteAuthor = event.target[1].value

        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "quote": quoteText,
                "author": quoteAuthor,
            })
        }

        fetch('http://localhost:3000/quotes?_embed=likes', configObj)
        .then(res => res.json())
        .then(quote => {
            quote.likes = []
            addQuote(quote)
        })
        .then(console.log)
        newQuoteForm.reset()
    })

    sortButton.addEventListener('click', () => {
        let sort = {
            "OFF": "ON",
            "ON": "OFF"
        }
        sortButton.innerText = sort[sortButton.innerText]
        if (sortButton.innerText == "ON"){
            fetchQuotes(sort = true)
        }
        if(sortButton.innerText == "OFF"){
            fetchQuotes()
        } 
       })
})