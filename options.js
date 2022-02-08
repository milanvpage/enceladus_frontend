let page = document.getElementById("buttonDiv");
let selectedClassName = "current";
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

// Reacts to a button click by marking the selected button and saving
// the selection
function handleButtonClick(event) {
    // Remove styling from the previously selected color
    let current = event.target.parentElement.querySelector(
        `.${selectedClassName}`
    );
    if (current && current !== event.target) {
        current.classList.remove(selectedClassName);
    }

    // Mark the button as selected
    let color = event.target.dataset.color;
    event.target.classList.add(selectedClassName);
    chrome.storage.sync.set({ color }); // use the chrome.storage API to store, retrieve, and track changes to user data
// User data can be automatically synced with Chrome sync (using storage.sync).
// Your extension's content scripts can directly access user data without the need for a background page.
// It's asynchronous with bulk read and write operations, and therefore faster than the blocking and serial localStoarge API
// User data can be stored as objects (the localStorage API stores data in strings).
// Enterprise policies configured by the administrator for the extension can be read (using storage.managed with a schema).

}

// Add a button to the page for each supplied color
function constructOptions(buttonColors) {
    chrome.storage.sync.get("color", (data) => {
        let currentColor = data.color;
        // For each color we were provided...
        for (let buttonColor of buttonColors) {
            // ..create a button with that color...
            let button = document.createElement("button");
            button.dataset.color = buttonColor;
            button.style.backgroundColor = buttonColor

            // ..mark the currently selected color...
            if (buttonColor === currentColor) {
                button.classList.add(selectedClassName);
            }

            // ..and register a listener for when that button is clicked
            button.addEventListener("click", handleButtonClick);
            page.appendChild(button);
        }
    
    });
}

// Initialize the page by constructing the color options
constructOptions(presetButtonColors);

