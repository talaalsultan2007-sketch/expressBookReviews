const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post('/register', (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {

        return res.status(400).json({

            message: "Username and password are required"

        });

    }

    if (isValid(username)) {

        return res.status(409).json({

            message: "User already exists!"

        });

    }

    users.push({ username, password });

    return res.status(201).json({

        message: "User successfully registered!"

    });

});
// Get the book list available in the shop
public_users.get('/', function (req, res) {
    return res.status(200).json(books);
});


 // Get book details based on ISBN

public_users.get('/isbn/:isbn', function (req, res) {

    const isbn = req.params.isbn;

    const book = books[isbn];

    if (book) {

        return res.status(200).json(book);

    }

    return res.status(404).json({

        message: "Book not found"

    });

});


  
// Get book details based on author

public_users.get('/author/:author', function (req, res) {

    const author = req.params.author;

    const results = Object.values(books).filter(

        book => book.author === author

    );

    return res.status(200).json(results);

});

// Get all books based on title

public_users.get('/title/:title', function (req, res) {

    const title = req.params.title;

    const results = Object.values(books).filter(

        book => book.title === title

    );

    return res.status(200).json(results);

});

// Get book review

public_users.get('/review/:isbn', function (req, res) {

    const isbn = req.params.isbn;

    const book = books[isbn];

    if (book) {

        return res.status(200).json(book.reviews);

    }

    return res.status(404).json({

        message: "Book not found"

    });

});

const axios = require('axios');

// Get all books using async/await

async function getAllBooks() {

    const response = await axios.get('http://localhost:5000/');

    return response.data;

}

// Get book by ISBN using async/await

async function getBookByISBN(isbn) {

    const response = await axios.get(

        `http://localhost:5000/isbn/${isbn}`

    );

    return response.data;

}

// Get books by author using async/await

async function getBooksByAuthor(author) {

    const response = await axios.get(

       
return response.data;

}

// Get book by ISBN using async/awai
    );

    return response.data;

}

// Get books by title using async/await

async function getBooksByTitle(title) {

    const response = await axios.get(

       
   return response.data;

}

// Get book by ISBN using async
    );

    return response.data;

}

module.exports.general = public_users;
