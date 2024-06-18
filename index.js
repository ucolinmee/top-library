const myLibrary = [];

function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = "";
    this.setReadStatus = function(status) {
        if (status == true)
            this.read = "Already Read";
        else
            this.read = "Not Read Yet";
    };
    this.setReadStatus(read);
    this.info = function() {
        return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read;
    }
}
function addBookToLibrary(book) {
    myLibrary.push(book);
}

function removeBookFromLibrary(id) {
    for (var i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id == id) {
            var index = i;
            break;
        }
    }
    myLibrary.splice(index, 1)
}

function displayBooks() {
    myLibrary.forEach((book) => {
        createCard(book);
    })
}

function createCard(book) {
    if (book.read === "Already Read") {
        var inputElement = `<input class="form-check-input" type="checkbox" checked>`
    } else {
        var inputElement = `<input class="form-check-input" type="checkbox">`
    }

    var booksDiv = document.querySelector('.books');
    var card = document.createElement('div');
    card.setAttribute('class', 'card');
    card.innerHTML =  `<div class="card-body" id=${book.id}> 
                            <div class="card-content">
                                <h5 class="card-title">${book.title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
                                <p class="card-text">Pages: ${book.pages}</p>
                                <div class="read-status">
                                    <p class="read-text">${book.read}</p> 
                                    ${inputElement}
                                </div>
                            </div>
                            <div class="remove-book">
                                <button class="btn btn-danger remove-book-btn">Remove</button>
                            </div>
                        </div>`;
    booksDiv.appendChild(card);
}

function deleteCard(id) {
    var element = document.getElementById(id);
    if (element !== null) {
        element.parentNode.remove();
    }
}

function updateCard(id, status) {
    for (var i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id == id) {
            myLibrary[i].setReadStatus(status);
            var bookDiv = document.getElementById(id);
            bookDiv.querySelector(".read-text").innerHTML = myLibrary[i].read;
        }
    }
}

function addBook(book) {
    addBookToLibrary(book);
    createCard(book);
}

function removeBook(id) {
    removeBookFromLibrary(id);
    deleteCard(id);
}

function showModal() {
    document.getElementById("modal").showModal();
}

function closeModal() {
    resetFormValues();
    document.getElementById("modal").close();
}

function resetFormValues() {
    var bookTitle = document.getElementById('title');
    var bookAuthor = document.getElementById('author');
    var bookPages = document.getElementById('num-pages');
    var read = document.getElementById('already-read')

    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
    read.checked = false;
}

function getNextBookId() {
    var nextId = 0;
    for (var i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id > nextId) {
            nextId = myLibrary[i].id;
        }
    }
    return ++nextId;
}

const theHobbit = new Book(1, "The Hobbit", "J.R.R. Tolkien", 295, false);
const cantHurtMe = new Book(2, "Can't Hurt Me", "David Goggins", 364, true);
const atomicHabits = new Book(3, "Atomic Habits", "James Clear", 320, true);

addBookToLibrary(theHobbit);
addBookToLibrary(cantHurtMe);
addBookToLibrary(atomicHabits);

displayBooks();

// Show modal
document.getElementById("open-form").addEventListener("click", showModal)

// Close modal
document.getElementById("close-form").addEventListener("click", closeModal)

// Submit form and add book to library
document.getElementById("submit-form").addEventListener("click", (e) => {
    e.preventDefault();
    
    var bookTitle = document.getElementById('title');
    var bookAuthor = document.getElementById('author');
    var bookPages = document.getElementById('num-pages');
    var read = document.getElementById('already-read');

    if (!bookTitle.checkValidity() || 
    !bookAuthor.checkValidity() ||
    !bookPages.checkValidity() || 
    !read.checkValidity) {
        alert('Form is missing info, please check that all fields are filled.')
    }
    else {
        var newBook = new Book(getNextBookId(), bookTitle.value, bookAuthor.value, bookPages.value, read.checked);
        addBook(newBook)

        closeModal();
    }
})

// DOM event delegation
document.querySelector(".books").addEventListener("click", (e) => {
    // Remove book from library
    if (e.target && e.target.nodeName === "BUTTON") {
        removeBook(e.target.parentNode.parentNode.id);
    }
    // Update read status
    if (e.target && e.target.nodeName === "INPUT") {
        var newReadStatus = e.target.checked;
        var bookId = e.target.parentNode.parentNode.parentNode.id;
        updateCard(bookId, newReadStatus);
    }
})

