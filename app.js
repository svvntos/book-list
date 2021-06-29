class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');
        // create tr element
        const row = document.createElement('tr');
        //  insert cols
        row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class='delete'>X<a></td>
    `;

        list.appendChild(row);
    }
    showAlert(message, className) {
        // create div
        const div = document.createElement('div');
        div.className = `alert ${className}`;

        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');

        const form = document.querySelector('#book-form');

        container.insertBefore(div, form);

        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 2000);
    }
    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    };
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}


//  localStorage

class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        }else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(function(book) {
            const ui = new UI;

            ui.addBookToList(book);

        })
    }
    static addbook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));

    }
    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach(function(book, index) {
        if(book.isbn === isbn) {
            books.splice(index, 1);
        };
        });

        localStorage.setItem('books', JSON.stringify(books));

    }
}
 document.addEventListener('DOMContentLoaded', Store.displayBooks);


document.getElementById('book-form').addEventListener('submit',
    function (e) {
        //get form values
        const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value
        //    console.log(title, author, isbn);

        // Instantiate book
        const book = new Book(title, author, isbn);
        // console.log(book)

        //  Instantiate UI
        const ui = new UI();

        if (title === '' || author === '' || isbn === '') {
            ui.showAlert('Please fill in all fields', 'error')
        } else {
            //Add book to list
            ui.addBookToList(book);
            Store.addbook(book);
            ui.showAlert('Book Added!', 'success');
            //  Clear feilds
            ui.clearFields();


        }
        e.preventDefault();
    });
document.getElementById('book-list').addEventListener('click' || 'touchstart', function (e) {
    const ui = new UI();
    ui.deleteBook(e.target);

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    ui.showAlert('Book Removed!', 'success');


    e.preventDefault();
})


