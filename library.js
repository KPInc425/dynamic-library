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
addNewBook(myLibrary);
addEventListenerRemoveButton(myLibrary);



function Book() {
    // the constructor
}

function addBookToLibrary() {
    // do stuff here
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


        bookCard.appendChild(bookCardInfo);
        bookCard.appendChild(bookCardRemoveButton);
        libraryContainer.appendChild(bookCard);
        i++;
    }
}

function addNewBook(library) {
    document.getElementById("newBook").onclick = function() {
        // I should likely rewrite this into a form that will show when clicked.
        alert("You are about to input a new Book into the Library.")
        newBookAuthor = prompt("Who is the Author?");
        if (newBookAuthor == "" || newBookAuthor == null) {
            // You can just click okay again, need to find recourse for this
            prompt("Who is the Author?");
        }
        newBookTitle = prompt("What is the Title of New Book?");
        if (newBookAuthor == "" || newBookAuthor == null) {
            prompt("What is the Title of New Book?");
        }
        newBookPages = prompt("How many pages?");
        newBookPages = Number(newBookPages);
        if (typeof newBookPages !=  'number') {
            prompt("How many Pages?")
        }
        newBookRead = Boolean(prompt("Has the new book been read? true or false."));
        // This doesn't quite work either
        if (typeof newBookReady != 'boolean') {
            prompt("Has the new book been read?");
        }
        console.log(newBookAuthor + " " + newBookTitle + " " + newBookPages + " " + newBookRead)
        newBook = {
            author: newBookAuthor,
            title: newBookTitle,
            pages: newBookPages,
            read: newBookRead,
        }
        library.push(newBook);
        // Remove library html to replace all cards rather than append
        libraryContainer.innerHTML = "";
        displayLibraryBooks(library);
        addEventListenerRemoveButton(library);
    };
}

function removeBookFromLibrary(library, index) {
    // Remove object from array
    library.splice(index, 1); 
    libraryContainer.innerHTML = "";
    displayLibraryBooks(library);
    addEventListenerRemoveButton(library);
    
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