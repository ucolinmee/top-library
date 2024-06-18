var cardHTML = `<div class="card-body" id=${book.id}>
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

export default cardHTML;