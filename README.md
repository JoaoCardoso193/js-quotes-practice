# JavaScript Quotes Practice

## Introduction

Hello, let's build a simple app that allows us to keep track of our favorite quotes and who said them.


## Setup

- Fork and clone this repository
- Run `json-server --watch db.json` to get the backend started
- Open the `index.html` file on your browser

## Endpoints

* Populate page with quotes with a `GET` request to `http://localhost:3000/quotes?_embed=likes`. The query string in this URL tells `json-server` to include the likes for a quote in the JSON of the response. <b>You should not use this query string when creating or deleting a quote.</b>
* POST `http://localhost:3000/quotes`
* DELETE `http://localhost:3000/quotes/:id`
* POST `http://localhost:3000/likes`

## Core Deliverables
As a user, I can:

1. See all quotes by **requesting** data from the server.
  * Each quote should have the following structure:
    ```html
      <li class='quote-card'>
        <blockquote class="blockquote">
          <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
          <footer class="blockquote-footer">Someone famous</footer>
          <br>
          <button class='btn-success'>Likes: <span>0</span></button>
          <button class='btn-danger'>Delete</button>
        </blockquote>
      </li>
    ```
2. Submitting the form creates a new quote and adds it to the list of quotes
  without having to refresh the page. Pessimistic rendering is reccommended.

3. Clicking the delete button should delete the respective quote from the
  API and remove it from the page without having to refresh.

## Advanced Deliverables
As a user, I can:
- Clicking the like button will create a like for this particular quote in the
  API and update the number of likes displayed on the page without having to
  refresh.
  * Use a `POST` request to `http://localhost:3000/likes`
  * The body of the request should be a JSON object containing a key of
  `quoteId`, with an _integer_ value. Use the ID of the quote you're creating the like for — e.g. `{ quoteId: 5 }` to create a like for quote 5. 
  * IMPORTANT: if the `quoteID` is a string for some reason (for example, if you've pulled the ID from a dataset) the index page will not include the like you create on _any_ quote.

## Extend Your Learning

* Add a `createdAt` key to your object to track when the like was created. Use [UNIX time][] (the number of seconds since January 1, 1970). The  [documentation][] for the JS `Date` class may be helpful here!

* Add a sort button that can be toggled on or off. When off the list of quotes will appear sorted by the ID. When the sort is active, it will display the quotes by author's name, alphabetically.
  * One way of doing this is to make a fetch to `http://localhost:3000/quotes?_sort=author`
  * Also think about what are the other ways you can do this!

[UNIX time]: https://en.wikipedia.org/wiki/Unix_time
[documentation]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

## Rubric for Code Challenge

You can find the rubric for this assessment [here](https://github.com/learn-co-curriculum/se-rubrics/blob/master/module-3.md).