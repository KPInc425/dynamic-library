class Book {
    constructor(author,title,pages,read) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
        let didIRead = "";

        this.info = function() {
            if (this.read === true) {
                didIRead = "You have read this.";
            } else {
                didIRead = "Has not been read yet.";
            }
            let infoString = `${this.title} 
                              by 
                              ${this.author}
    
                              ${this.pages} pages
    
                              ${didIRead}`;
            return infoString;
        };
    }
}

const defaultOne = new Book("Jim Mortimore",`"Babylon 5": Clark's Law`,279,false);
const defaultTwo = new Book("Karen Miller","A Blight of Mages",640,false);
const defaultThree = new Book("Kim Harrison","A Fistful of Charms",544,false);
const defaultFour = new Book("Lois Lowry","The Giver",180,true);

let myLibrary = [];


if (storageAvailable('localStorage')) {
    console.log("Local Storage is Available");
} else {
    console.log("No Local Storage Available.");
}

if(localStorage.length > 0) {
    // If storage IS already populated
    myLibrary = setLibrary();
} else {
    // If storage is NOT already populated
    myLibrary = [defaultOne, defaultTwo, defaultThree, defaultFour];
    populateStorage(myLibrary);
    // console.log("IF/ELSE")
}

// Ref main library container
const libraryContainer = document.querySelector('#cardContainer');
displayLibraryBooks(myLibrary);

addEventListenerRemoveButton(myLibrary);
addEventListenerChangeReadStatus(myLibrary);
displayAddBookForm(myLibrary);

function displayLibraryBooks(library) {
    let i = 0;
    // Loop through array 
    for (let book of library) {
    
        // display book
        // console.log(book.info());
        let bookInfo = book.info();
        // let bookInfo = `:Author:\r\n ${book.author} 
        //                 \r\n:Title:\r\n ${book.title} 
        //                 \r\n:Pages:\r\n ${book.pages}
        //                 \r\n?Read?\r\n ${book.read}`;
        const bookCard = document.createElement('div');
        bookCard.classList.add("card");
        bookCard.classList.add("cardWidth");
        if (book.read === true) {
            bookCard.classList.add("readBook");
        }
        bookCard.setAttribute("data-index", i);
        const bookCardInfo = document.createElement('div');
        bookCardInfo.classList.add("bookInfoContainer");
        bookCardInfo.textContent = bookInfo;
        // add button to remove array from library
        const bookCardRemoveButton = document.createElement('button');
        bookCardRemoveButton.classList.add("buttonRemoveBook");
        bookCardRemoveButton.setAttribute("value", "Remove Book");
        bookCardRemoveButton.textContent = "Remove Book";
        bookCardRemoveButton.setAttribute("data-index", i);
        // add button to change READ status of book 
        const bookCardChangeReadStatusButton = document.createElement('button');
        bookCardChangeReadStatusButton.classList.add("buttonChangeReadStatus");
        bookCardChangeReadStatusButton.setAttribute("value", "Change Read Status");
        bookCardChangeReadStatusButton.textContent = "Change Read Status";
        // Added this to make the changeReadStatusButton work, it seems it wouldn't 
        // read the data-* from the bookCard like the remove button would.
        bookCardChangeReadStatusButton.setAttribute("data-index", i);
        bookCard.appendChild(bookCardInfo);
        bookCard.appendChild(bookCardRemoveButton);
        bookCard.appendChild(bookCardChangeReadStatusButton);
        libraryContainer.appendChild(bookCard);
        i++;
    }
}

function displayAddBookForm(library) {
    // ref the newBook button
    document.getElementById('newBook').onclick = function() {
        const newBookForm = document.getElementById('newBookForm');
        newBookForm.style.display = "block";
        addNewBook(library);
        validateNewBookForm();
    }
}

function validateNewBookForm() {
    const newBookForm = document.getElementById('newBookForm');
    console.log(newBookForm);

    // const elementNames = ['Author', 'Title', 'Pages', 'Read'];

    const inputArray = [];
    const inputErrorArray = [];

    const inputAuthor = document.getElementById('Author');
    const inputTitle = document.getElementById('Title');
    const inputPages = document.getElementById('Pages');
    const inputRead = document.getElementById('Read');

    inputArray.push(inputAuthor);
    inputArray.push(inputTitle);
    inputArray.push(inputPages);
    inputArray.push(inputRead);

    const authorError = inputAuthor.nextElementSibling; //document.querySelector('#Author + span.error');
    const titleError = inputTitle.nextElementSibling;   //document.querySelector('#Title + span.error');
    const pagesError = document.querySelector('#Pages + span.error');
    const readError = document.querySelector('#Read + span.error');

    inputErrorArray.push(authorError);
    inputErrorArray.push(titleError);
    inputErrorArray.push(pagesError);
    inputErrorArray.push(readError);

    console.log(authorError);
    console.log(titleError);
    console.log(pagesError);
    console.log(readError);

    console.log(inputArray);
    console.log(inputErrorArray);

    function addEventListeners(inputArray, inputErrorArray) {
        console.log(inputArray.length);
        for (let i = 0; i < inputArray.length; i++) {
            inputArray[i].addEventListener('input', (e) => {
                if (inputArray[i].validity.valid) {
                    inputErrorArray[i].textContent = '';
                    inputErrorArray[i].className = 'error';
                } else {
                    showError();
                }
            });
        }
    }

    addEventListeners(inputArray, inputErrorArray);

    


}


function addNewBook(library) {
    document.querySelector(".addBookButton").onclick = function() {
        const inputAuthor = document.querySelector("#Author").value;
        const inputTitle = document.querySelector("#Title").value;
        let inputPages = document.querySelector("#Pages").value;
        let inputRead = document.querySelector("#Read").value.toUpperCase();
        // inputRead = inputRead.toUpperCase();
        //alert(inputRead);
        inputPages = Number(inputPages);


        if (inputAuthor == "") {
            alert("Please enter an Author.");
        } else if (inputTitle == "") {
            alert("Please enter a Title.");
        } else if (isNaN(inputPages) || inputPages == "") {
            alert("Please enter a NUMBER of pages.");
        } else {
            let finalCheck = 0;
            if (inputRead == "Y" || inputRead == "YES" || inputRead == "TRUE") {
                inputRead = true;
                finalCheck = 1;
            } else if (inputRead == "NO" || inputRead == "N" || inputRead == "FALSE") {
                inputRead = false;
                finalCheck = 1;
            } else {
                alert("Please enter if READ. Yes or No."); 
            } 
            if (finalCheck == 1) {
                // console.log(`${inputAuthor} ${inputTitle} ${inputPages} ${inputRead}`)
                //alert(`${inputAuthor} ${inputTitle} ${inputPages} ${inputRead}`)
                const newBook = new Book(inputAuthor,inputTitle,inputPages,inputRead);
                // console.log(newBook);
                // Reset text Boxes
                document.querySelector("#Author").value = "";
                document.querySelector("#Title").value = "";
                document.querySelector("#Pages").value = "";
                document.querySelector("#Read").value = "";
                // Hide form again
                const newBookForm = document.getElementById('newBookForm');
                newBookForm.style.display = "none";
                // add new book
                library.push(newBook);
                // clear space for new library
                libraryContainer.innerHTML = "";
                displayLibraryBooks(library);
                addEventListenerRemoveButton(library);
                addEventListenerChangeReadStatus(library);
                localStorage.clear();
                populateStorage(library);
            }
            
        }
        

    };
}

function removeBookFromLibrary(library, index) {
    // Remove object from array
    // console.log(index);
    library.splice(index, 1); 
    libraryContainer.innerHTML = "";
    displayLibraryBooks(library);
    addEventListenerRemoveButton(library);
    addEventListenerChangeReadStatus(library);
    localStorage.clear();
    populateStorage(library);
    
}

function addEventListenerRemoveButton(library) {
    const buttonRemoveArray = document.querySelectorAll(".buttonRemoveBook");
    buttonRemoveArray.forEach((div) => {
        // Click to to get the index and pop the library.
        div.addEventListener("click", function () {
            //get Index from data-*
            let index = div.getAttribute('data-index');
            // console.log(index);
            removeBookFromLibrary(library, index); 
        })
    })
}

function addEventListenerChangeReadStatus(library) {
    const buttonChangeReadStatus = document.querySelectorAll(".buttonChangeReadStatus");
    buttonChangeReadStatus.forEach((div) => {
        // Click to get index and change READ status
        div.addEventListener("click", function(){
            // get Index from data-* 
            let index = div.getAttribute('data-index');
            changeBookReadStatus(library, index);
        })
    })
}

function changeBookReadStatus(library, index) {
    // Change Book READ status 
    if (library[index].read == true) {
        library[index].read = false;
    } else {
        library[index].read = true;
    }
    libraryContainer.innerHTML = "";
    displayLibraryBooks(library);
    addEventListenerChangeReadStatus(library);
    addEventListenerRemoveButton(library);
    localStorage.clear();
    populateStorage(library);
    
}

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x,x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everthing except firefox 
            e.code === 22 || 
            // firefox 
            e.code === 1014 || 
            // test name field too, because code might not be present 
            // everything except Firefox 
            e.name === 'QuotoExceededError' ||
            // firefox 
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && 
            // Acknoledge QuotaExceededError only if there's somethign alread stored 
            (storage && storage.length !== 0);
    }
}

function populateStorage(library) {
    let index = 0;
    for (let book of library) {
        //console.log(book);
        localStorage.setItem(`localLibrary[${index}]`, JSON.stringify(book));
        index++;
    }
    setLibrary();
}

function setLibrary() {
    let library = [];
    for (let i = 0; i < localStorage.length; i++) {
        let tmpArr = JSON.parse(localStorage.getItem(`localLibrary[${i}]`));
        library.push(tmpArr);
    }
    // console.log(library);
    let index = 0;
    let tmpArr = [];
    library.forEach((item) => {
        tmpArr[index] =  new Book(item.author, item.title, item.pages, item.read);
        index++;
    });
    library = tmpArr;
    return library;
}