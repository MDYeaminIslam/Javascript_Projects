//Get the UI elements
let form = document.querySelector('#book-form'); //Select the entire form
let bookList = document.querySelector('#book-list'); //Select the entire book list



//Book Class
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI Class
class UI{
    constructor(){

    }
    addToBookList(book){
        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href = "#" class = "delete">X</a></td>`;
        list.appendChild(row);
        
    }
    clearFields(){
        document.querySelector('#title').value = ''; //Select the title field and set its value to empty string
        document.querySelector('#author').value = '';//Select the author field and set its value to empty string
        document.querySelector('#isbn').value = '';//Select the isbn field and set its value to empty string
    }
    showAlert(message, className) {
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    deleteFormBook(target){
        if(target.hasAttribute('href')){
            console.log(target.parentElement.parentElement.remove());
        }
    }
}

//Add Event Listener
form.addEventListener('submit', newBook);
bookList.addEventListener('click', removeBook);

//Define the function
function newBook(e){
    let title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;

    let ui = new UI(); //Create a new UI object

    if (title === '' || author === '' || isbn === ''){
        ui.showAlert('Please fill all the fields', 'error');
    }
    else {
        let book = new Book(title, author, isbn); //Create a new book object
        ui.addToBookList(book); //Add the book to the list
        ui.clearFields(); //Clear the fields of the form
        ui.showAlert('Book Added!', 'success'); //Show the alert.Here two classes are passed as arguments
    }
    e.preventDefault(); //Prevent the default behaviour of the form which again reloads the page
}
function removeBook(e){
    let ui = new UI(); //Create a new UI object
    ui.deleteFormBook(e.target); //Delete the book from the list
    ui.showAlert('Book Removed!', 'success'); //Show the alert.Here two classes are passed as arguments
    e.preventDefault(); //Prevent the default behaviour of the form which again reloads the page
}
