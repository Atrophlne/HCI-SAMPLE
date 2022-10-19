let cartIcon = document.querySelector("#cart-icon")
let cart = document.querySelector(".cart")
let cartClose = document.querySelector("#cart-close")

cartIcon.onclick = () =>{
   cart.classList.add("active");

}

cartClose.onclick = () =>{
   cart.classList.remove("active");
}

if(document.readyState == 'loading') {
   document.addEventListener('DOMContentLoaded', ready);
} else {
   ready();
}

// Function

function ready() {
   // Remove items in cart
   var removeCartButtons = document.getElementsByClassName('cart-remove');

   for (var i = 0; i < removeCartButtons.length; i ++) {
      var button = removeCartButtons[i]
      button.addEventListener('click', removeCartItem)
   }
   // Quantity 
   var quantityInput = document.getElementsByClassName("cart-quantity");
   for (var i = 0; i < quantityInput.length; i ++) {
      var input = quantityInput[i]
      input.addEventListener("change", quantityChanges);
   }
   // Add to Cart
   var addtoCart = document.getElementsByClassName("add-cart");
   for (var i = 0; i < addtoCart.length; i ++) {
      var button = addtoCart[i]
      button.addEventListener("click", addCartClicked);
   }
   // Buy Button
   document.getElementsByClassName("btn-buy")[0].addEventListener('click', buyButtonClicked);
}

// Buy Button
function buyButtonClicked() {
   alert("Order placed");
   var cartContent = document.getElementsByClassName("cart-content")[0];
   while (cartContent.hasChildNodes()) {
      cartContent.removeChild(cartContent.firstChild);
   }
   updatetotal();
}


// Remove cart item 2
function removeCartItem(event) {
   var buttonClicked = event.target
   buttonClicked.parentElement.remove();
   updatetotal();
}

// Quantity Change
function quantityChanges(event) {
   var input = event.target
   if(isNaN(input.value) || input.value <= 0) {
      input.value = 1;
   }
   updatetotal();
}

// Add to Cart
function addCartClicked(event) {
   var button = event.target
   var shopProduct = button.parentElement
   var title = shopProduct.getElementsByClassName("product-name")[0].innerText;
   var pricess = shopProduct.getElementsByClassName("price")[0].innerText;
   var productImg = shopProduct.getElementsByClassName("products-img")[0].src;
   addProductToCart(title, pricess, productImg);
   updatetotal();
}

function addProductToCart(title, pricess, productImg) {
   var cartShopBox = document.createElement("div");
   cartShopBox.classList.add("cart-box");
   var cartItems = document.getElementsByClassName("cart-content")[0];
   var cartItemNames = cartItems.getElementsByClassName("cart-product-name");
   for (var i = 0; i < cartItemNames.length; i ++) {
      if (cartItemNames[i].innerText == title) {
         alert("You have already added this to the cart");
         return;
      }
   }


var cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="details">
                           <div class="cart-product-name">${title}</div>
                           <div class="cart-prices">${pricess}</div>
                           <input type="number" value="1" class="cart-quantity">
                        </div>
                        <i class='bx bxs-trash-alt cart-remove'></i>
`;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanges);
updatetotal();
}

// Update Total
function updatetotal() {
   var cartContent = document.getElementsByClassName("cart-content")[0];
   var cartBoxes = cartContent.getElementsByClassName("cart-box");
   var total = 0;
   for (var i = 0; i < cartBoxes.length; i ++) {
      var cartBox = cartBoxes[i];
      var priceElement = cartBox.getElementsByClassName("cart-prices")[0];
      var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
      var price = parseFloat(priceElement.innerText.replace("$", ""));
      var quantity = quantityElement.value;
      total = total + (price * quantity);
   }

      document.getElementsByClassName("total-price")[0].innerText = '$' + total;

}