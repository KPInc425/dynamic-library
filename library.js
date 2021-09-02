if (storageAvailable('localStorage')) {
    console.log("Local Storage is Available");
} else {
    console.log("No Local Storage Available.");
}

let myLibrary = [
    {
        author: "Jim Mortimore",
        title: `"Babylon 5": Clark's Law`,
        pages: 279,
        read: false,
    },
    {
        author: "Karen Miller",
        title: "A Blight of Mages",
        pages: 640,
        read: false,
    },
    {
        author: "Kim Harrison",
        title: "A Fistful of Charms",
        pages: 544,
        read: false,
    },
    {
        author: "Lois Lowry",
        title: "The Giver",
        pages: 180,
        read: true,
    },
];

// Ref main library container
const libraryContainer = document.querySelector('#cardContainer');
displayLibraryBooks(myLibrary);
// addNewBook(myLibrary);
addEventListenerRemoveButton(myLibrary);
addEventListenerChangeReadStatus(myLibrary);
displayAddBookForm(myLibrary);


function Book() {
    // the constructor
}

function displayLibraryBooks(library) {
    let i = 0;
    // Loop through array 
    for (let book of library) {
        

        // display book
        let bookInfo = `:Author:\r\n ${book.author} 
                        \r\n:Title:\r\n ${book.title} 
                        \r\n:Pages:\r\n ${book.pages}
                        \r\n?Read?\r\n ${book.read}`;
        const bookCard = document.createElement('div');
        bookCard.classList.add("card");
        bookCard.classList.add("cardWidth");
        bookCard.setAttribute("data-index", i);
        const bookCardInfo = document.createElement('div');
        bookCardInfo.classList.add("bookInfoContainer");
        bookCardInfo.textContent = bookInfo;
        // add button to remove array from library
        const bookCardRemoveButton = document.createElement('button');
        bookCardRemoveButton.classList.add("buttonRemoveBook");
        bookCardRemoveButton.setAttribute("value", "Remove Book");
        bookCardRemoveButton.textContent = "Remove Book";
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
        // alert("click");
        const newBookForm = document.getElementById('newBookForm');
        newBookForm.style.display = "block";
        // alert(newBookForm.style.display)
        addNewBook(library);
    }
}

function addNewBook(library) {
    document.querySelector(".addBookButton").onclick = function() {
        const inputAuthor = document.querySelector("#Author").value;
        const inputTitle = document.querySelector("#Title").value;
        const inputPages = document.querySelector("#Pages").value;
        const inputRead = document.querySelector("#Read").value;
        console.log(`${inputAuthor} ${inputTitle} ${inputPages} ${inputRead}`)
        alert(`${inputAuthor} ${inputTitle} ${inputPages} ${inputRead}`)
        const newBook = {
            author: inputAuthor,
            title: inputTitle,
            pages: inputPages,
            read: inputRead,
        }
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

    };
}

// function addNewBook(library) {
//     document.getElementById("newBook").onclick = function() {
//         // I should likely rewrite this into a form that will show when clicked.
//         alert("You are about to input a new Book into the Library.")
//         newBookAuthor = prompt("Who is the Author?");
//         if (newBookAuthor == "" || newBookAuthor == null) {
//             // You can just click okay again, need to find recourse for this
//             prompt("Who is the Author?");
//         }
//         newBookTitle = prompt("What is the Title of New Book?");
//         if (newBookAuthor == "" || newBookAuthor == null) {
//             prompt("What is the Title of New Book?");
//         }
//         newBookPages = prompt("How many pages?");
//         newBookPages = Number(newBookPages);
//         if (typeof newBookPages !=  'number') {
//             prompt("How many Pages?")
//         }
//         newBookRead = Boolean(prompt("Has the new book been read? true or false."));
//         // This doesn't quite work either
//         if (typeof newBookReady != 'boolean') {
//             prompt("Has the new book been read?");
//         }
//         console.log(newBookAuthor + " " + newBookTitle + " " + newBookPages + " " + newBookRead)
//         newBook = {
//             author: newBookAuthor,
//             title: newBookTitle,
//             pages: newBookPages,
//             read: newBookRead,
//         }
//         library.push(newBook);
//         // Remove library html to replace all cards rather than append
//         libraryContainer.innerHTML = "";
//         displayLibraryBooks(library);
//         addEventListenerRemoveButton(library);
//         addEventListenerChangeReadStatus(library);
//     };
// }

function removeBookFromLibrary(library, index) {
    // Remove object from array
    library.splice(index, 1); 
    libraryContainer.innerHTML = "";
    displayLibraryBooks(library);
    addEventListenerRemoveButton(library);
    addEventListenerChangeReadStatus(library);
    
}

function addEventListenerRemoveButton(library) {
    const buttonRemoveArray = document.querySelectorAll(".buttonRemoveBook");
    buttonRemoveArray.forEach((div) => {
        // Click to to get the index and pop the library.
        div.addEventListener("click", function () {
            //get Index from data-*
            let index = div.getAttribute('data-index');
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
            // alert("TESTING");
            let index = div.getAttribute('data-index');
            // alert(index);
            changeBookReadStatus(library, index);
        })
    })
}

function changeBookReadStatus(library, index) {
    // Change Book READ status 
    // alert(index);
    if (library[index].read == true) {
        library[index].read = false;
    } else {
        library[index].read = true;
    }
    libraryContainer.innerHTML = "";
    displayLibraryBooks(library);
    addEventListenerChangeReadStatus(library);
    addEventListenerRemoveButton(library);
    
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