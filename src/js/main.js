/*
     This is the main javascript file embedded in the HTML.
     All user interactions should be regulated here.

     If possible, no data structure data should be stored here,
     the two classes 'Fridge' and 'Product' are intended for this.
     The necessary files for the Fridge and Product class are already included,
     so that use can be made of them from here.

     It is recommended to fill or create the dynamic GUI elements
     to be defined in a larger method that is based on the data stored in the data structure.
     In this way, this method can be called again and again whenever the data changes
     and doesn't have to worry about adding, changing or removing individual HTML elements.

     The file already contains a method for creating product cards.
     It returns the completed HTML element filled with data.

     Also, file has some necessary references to GUI HTML elements.
     These can already be used.
     Other necessary references to HTML elements of the GUI can be made using ID access using the same pattern.
*/

// Imports fridge class from external file
import Fridge from "./fridge.js";
// Imports the product class from the external file
import Product from "./product.js";

/* ----------- AUXILIARY VARIABLES ----------- */
// Constant for a day in milliseconds
const ONE_DAY = 1000*60*60*24;
/* -------------------------------------- */

/* ----------- GUI REFERENCES ----------- */

// Reference to products container
const fridgeProductsContainer = document.querySelector('#fridge-products-container');

// reference to input for new product name
const addProductNameInput = document.querySelector('#form-add-product-name');
// reference to input for volume of new product
const addProductVolInput = document.querySelector('#form-add-product-volume');
// reference to input for new product expiration date
const addProductExpDateInput = document.querySelector('#form-add-product-exp-date');
// Reference to button for confirmation of new product
const addProductSubmitBtn = document.querySelector('#btn-add-product');
/* -------------------------------------- */


/*
     Function to create a product card for the fridge.
     It receives as a parameter
     - The name of the product (productName)
     - The volume of the product (productVolume), i.e. the space it occupies inside the refrigerator
     - The expiration date of the product (productExpDate)
     - A boolean indicator of whether the product has expired (isExpired)
     - A callback function for handling the click on the delete button of the respective card (deleteCallback)
         If this callback does not correspond to any function (or is not supplied), an error message appears in the console.

     As a return value (return), it supplies the finished HTML element with all the information passed.
*/
function createNewProductCard(productName, productVolume, productExpDate, isExpired, deleteCallback) {
     // create outer card div
     let card = document.createElement('div');
     // Attach Bootstrap card class
     card.classList.add('card');

     // create inner card body div
     let cardBody = document.createElement('div');
     // Attach Bootstrap card-body class
     cardBody.classList.add('card-body');

     // Create card title
     let cardTitle = document.createElement('h5');
     // Attach Bootstrap card-title class
     cardTitle.classList.add('card-title');
     // Fill card title with given product name
     cardTitle.innerText = productName + ' ';

     // Create button to delete product
     let deleteCardBtn = document.createElement('button');
     // Set button-type
     deleteCardBtn.type = 'button';
     // Append bootrap button classes depending on whether the product has expired or not
     deleteCardBtn.classList.add('btn', 'btn-sm', (isExpired ? 'btn-outline-danger' : 'btn-outline-primary'));

     // Check if passed callback for delete button is valid
     if (typeof deleteCallback === 'function') {
         // Append passed callback to delete button's onClick event
         deleteCardBtn.addEventListener('click', evt => {
             deleteCallback();
         });

     } else {
         // print that given callback is invalid
         console.log('%cThe supplied callback for deleting the product has no function or does not exist.', 'color: red;');
     }
   // Create icon element for delete button
   let deleteCardBtnIcon = document.createElement('i');
   // Attach the appropriate bootstrap class to the icon element depending on the flow state
   deleteCardBtnIcon.classList.add('fa-solid', (isExpired ? 'fa-trash' : 'fa-utensils'));

   // Create subtitle element
   let cardSubTitle = document.createElement('h6');
   // Append Bootstrap card-subtitle class to subtitle element
   cardSubTitle.classList.add('card-subtitle', 'mb-2', 'text-muted');

   // If expired, replace bootstrap class for text color
   if (isExpired) cardSubTitle.classList.replace('text-muted', 'text-danger');
   // If about to expire, replace bootstrap class for text color
   else if (new Date(productExpDate) - new Date() < ONE_DAY) cardSubTitle.classList.replace('text-muted', 'text-warning');
   // Fill subtitle element with passed expiration date
   cardSubTitle.innerText = productExpDate;

   // create text element for product volume
   let cardText = document.createElement('p');
   // Attach Bootstrap card-text class to text element
   cardText.classList.add('card-text');
  
   // Fill text element with passed product volume
   cardText.innerText = productVolume + " VU";

   // Attach delete icon to delete button
   deleteCardBtn.appendChild(deleteCardBtnIcon);
   // Append delete button to card title
   cardTitle.appendChild(deleteCardBtn);

   // Append card title to card body
   cardBody.appendChild(cardTitle);
   // Append card subtitle to card body
   cardBody.appendChild(cardSubTitle);
   // Append Card Text to Card-Body
   cardBody.appendChild(cardText);
  
   // Append card-body to card-div
   card.appendChild(cardBody);

   // Return finished class
   return card;
}