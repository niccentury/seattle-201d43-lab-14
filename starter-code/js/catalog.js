/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var i = 0; i< Product.allProducts.length; i++) {
    var option = document.createElement('option');
    option.innerHTML = Product.allProducts[i].name;
    selectElement.appendChild(option);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODO: Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  var selectedProduct = event.target.items.value;

  // TODO: get the quantity
  var productQuantity = event.target.quantity.value;
  // TODO: using those, add one item to the Cart
  cart.addItem(selectedProduct, productQuantity);
  console.log(cart);
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var productQuantity = event.target.quantity.value;
  counter += parseInt(productQuantity);
  var countDiv = document.getElementById('itemCount');
  countDiv.innerHTML = counter;
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  var selectedProduct = event.target.items.value;
  var productQuantity = event.target.quantity.value;
  // TODO: Add a new element to the cartContents div with that information
  var cartContent = document.getElementById('cartContents');
  for(var j=0; j<Product.allProducts.length; j++){
    if(selectedProduct === Product.allProducts[j].name){
      var imageFilePath = Product.allProducts[j].filePath;
      console.log('imagefilepath',imageFilePath);
      var newContent = document.createElement('div');
      var newImage = document.createElement('img');
      var newQuantity = document.createElement('p');
      newQuantity.innerHTML = 'Quantity: '+productQuantity;
      newImage.src = imageFilePath;
      newContent.appendChild(newImage);
      newContent.appendChild(newQuantity);
      cartContent.appendChild(newContent);
    }
  }
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
