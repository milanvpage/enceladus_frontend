// // Initialize button with user's preferred color
// let uploadCSV = document.getElementById("container");

// chrome.storage.sync.get("color", ({ color }) => {
//   uploadCSV.style.backgroundColor = color;
// });

// // When the button is clicked, inject setPageBackgroundColor into current page

// uploadCSV.addEventListener("click", async () => {
//     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//     chrome.scripting.executeScript({
//         target: { tabID: tab.id },
//         function: setPageBackgroundColor,
//     });
// });

// // The body of this function will be executed as a content script inside the
// // current page

// function setPageBackgroundColor() {
//     chrome.storage.sync.get("color", ({color}) => {
//         document.body.style.backgroundColor = color;
//     });
// }

//Initialize button with user's preferred colot
// let uploadCSV = document.getElementById("uploadCSV");

// chrome.storage.sync.get("color", ({
//     color
// }) => {
//     uploadCSV.style.backgroundColor = color;
// });

// //When the button is clicked, inject setPageBackgroudColor into current page
// uploadCSV.addEventListener("click", async() => {
//     let [tab] = await chrome.tabs.query({
//         active: true,
//         currentWindow: true
//     });

//     chrome.scripting.executeScript({
//         target: {
//             tabId: tab.id
//         },
//         function: setPageBackgroundColor,
//     });
// });

// //The body of this function will be executed as a contect script inside the current page
// function setPageBackgroundColor() {
//     chrome.storage.sync.get("color", ({
//         color
//     }) => {
//         document.body.style.backgroundColor = color;
//     });
// }

// document.addEventListener('DOMContentLoaded', function() {
//     const btn = document.getElementById('box-botton');
//     btn.addEventListener('click', function() {

//         chrome.tabs.getSelected(null, function(tab) {
//             alert("This Button was clicked");
//         });
//     }, false);
// }, false);

document.querySelectorAll(".drop-zone__input").forEach(inputElement => {
    // first try to retrieve the drop zone container for the input field
    const dropZoneElement = inputElement.closest(".drop-zone"); 
    
    dropZoneElement.addEventListener("click", e => {
        inputElement.click() // whenever the drop-zone element gets clicked on we're going to be running this function inside here - so essentially we're programmatically clicking on the input element whenever you click on the drop-zone
    }); 

    // now we need to make it so when you choose a file that it displays the thumbnail
    inputElement.addEventListener("change", e => {
        if (inputElement.files.length) { // if the input length is greater than zero than update the thumbnail
            updateThumbnail(dropZoneElement, inputElement.files[0]); // passing through the drop-zone element and along side that we can just say inputElement.files[0] pass through the first file in the file list  - if I want to supposrt multiple files, I just need to add the 'multiple' attribute to the HTML file  inside my input field
        }
    }) // we're going to be listening for the change event on the actual input field itself - this is going to run whenever the input value gets changed
    
    // so now using the closest method it's going to start at the input field and then it's going to making it's way up until it finds an element with the class of drop-zone
    // no wwe have the input element and the drop-zone container element
    // second we can start adding a few event listeners
    dropZoneElement.addEventListener("dragover", e => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over"); // here wiht the dragover events this is going to be running whenever the user drags over an image or a file things like that
        // which will then change the border style to solid, like we did in our CSS file, for drop-zone--over

    });

    ["dragleave", "dragend"].forEach(type => { // type refers to either dragleave or dragend is goingn to be running whenever you actually cancel a drag exacmple you "press on the esc key to cancel the drag"
        dropZoneElement.addEventListener(type, e => {
            dropZoneElement.classList.remove("drop-zone--over");
// the dragleave event happens when you drag outside of the actual drop-zone and the dragend  
        });

        dropZoneElement.addEventListener("drop", e => {
            e.preventDefault() // because the automatic response for a file drop is to redirect to a separate file page, but we want it to stay on one page 
            // console.log(e.dataTransfer.files); // at first when we were just console loggin our event (e) we were getting a "DragEvent" object in the console so in this DragEVent object this "dataTransfer" property is the most important to make this work
            // the reason for that is becasue it's got inside of it a "files:" property which has a "FileList" containing each one of our files and it said a length of 0 when we were logging our event (e) - this is a bug in google chrome where it should actually be showing the updated file list
            // that's why we went ack into to do e.dataTransfer.files so now we're console logging the file object - you can see that if you log it out directly you can see we do have a list of files (length: 1)

            if (e.dataTransfer.files.length) { // if we have atleast one file that was dragged in we're going to be saying here inputElement.files = e.dataTransfer.files;
                inputElement.files = e.dataTransfer.files; // this right here is essentially taking our list of files, so our actual file list object "e.dataTransfer.files" - it's taking our list of files from here and then assigning it to the input element itself
                // so now when you submit the form with the input element inside of it, it's going to be subitting the files which you selected from the drag event 
                updateThumbnail(dropZoneElement, e.dataTransfer.files[0]) // passing through the dropZoneELement and the first file - this is why our thumb nail Preview only shows the first file, which I've selected
            }

            dropZoneElement.classList.remove("drop-zone--over");
        })
    }) // these are two events that we're going to be applying at the same time
}); //going to be running for eahc of te drop-zone inputs


// Update the thumbnail on a drop zone element
function updateThumbnail(dropZoneELement, file) {
    // need to grab the hopefully existing thumbnail element which we removed earlier inside our HTML. We need to either grab an existing one or create a new one
    let thumbnailElement = dropZoneELement.querySelector(".drop-zone__thumb")

    // first time - remove the prompt
    if (dropZoneELement.querySelector(".drop-zone__prompt")) {
        // syaing the promt currently exists within the drop zone element then we want to remove it
        dropZoneELement.querySelector(".drop-zone__prompt").remove();
    }
    // first time there is no thumbnail element, so let's create it
    if (!thumbnailElement) {
        thumbnailElement = document.createElement("div")
        thumbnailElement.classList.add("drop-zone__thumb");
        dropZoneELement.appendChild(thumbnailElement); // here we're actually appending the actual thumbnail element to the actual container (the drop-zone contianer)
        // the issue here still is that the promt still exists so we ned to remove it when we want the thumbnail to appear
    }

    thumbnailElement.dataset.label = file.name // rember the file object that we're passing in at the beginning if the function is an actual proper file objec - which means I can console.log(file) the file and view it - so here we're just grabbing the name property from the file object and then simply setting that to the label data attribute - which is also being grabbed by the CSS label and being inserted below the file

    // Next thing to do is to display the image if it actually is an image
    //Show thumbnail for image files
    if (file.type.startsWith("image/")) {
        const reader = new FileReader(); // this file reader right here allows us to read files and we're going to be reading the file to add to a data URL 

        reader.readAsDataURL(file) // this gives us a base64 data URL for the file - i'm going to be passingthrogh here the actual file
        reader.onload = () => { //and then this is actually an asynchronous call so we need to say reader.onload and basically gooing to be running this function right here once the reader is complete or done with reading the file so essentially we can access it using read.result
            thumbnailElement.style.backgroundImage = `url('${ reader.result}')` // reader.result is going to contain the base64 data URL representing the image and it's going to be available one the reader is complete reading the actual file  
            // now you can see when you choose one image but then decide to change it to lets say an HTML file the image still stays there
        }; 
    } else {
        thumbnailElement.style.backgroundImage = null; // this is going to run whenever the top "    if (file.type.startsWith("image/"))" is not of image
    }

    //last thing to do here is to make it so when you click on the actual drop-zone it gives you a manual selection file input prompt - need to go to the top and add an eventListener to the drop-zone element 
}


document.body.style.backgroundColor=""