const myLibrary = [];

function Book(title, author, numPages, alreadyRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = function() {
        if (alreadyRead) {
            return "Already Read";
        } else {
            return "Not Read Yet";
        }
    }
    this.info = function() {
        return this.title + " by " + this.author + ", " + this.numPages + " pages, " + this.read();
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    var booksDiv = document.querySelector(".books");
    booksDiv.innerHTML = "";
    myLibrary.forEach((book) => {
        var card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.innerHTML =  `<div class="card-body"> 
                                <h5 class="card-title">${book.title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
                                <p class="card-text">Pages: ${book.numPages}, ${book.read()}</p>
                            </div>`;
        booksDiv.appendChild(card);
    })
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const cantHurtMe = new Book("Can't Hurt Me", "David Goggins", 364, true);
const atomicHabits = new Book("Atomic Habits", "James Clear", 320, true);

addBookToLibrary(theHobbit);
addBookToLibrary(cantHurtMe);
addBookToLibrary(atomicHabits);

displayBooks();
var openFormBtn = document.querySelector("#open-form");
openFormBtn.addEventListener("click", () => {
    var form = document.querySelector("form");
    form.classList.remove("hidden");
})