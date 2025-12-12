export let cart = JSON.parse(localStorage.getItem("cart"));

if(!cart){
  cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
},
{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1

}];
}



function addtoStorage(){
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addTocart(productId){
   let matchfound;
      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchfound = cartItem;
        }
      });
      if (matchfound) {
        matchfound.quantity += 1;
      } else {
        cart.push({
          productId: productId,
          quantity: 1
        });

      }
      addtoStorage();
}

export function removefromcart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  addtoStorage();
}
