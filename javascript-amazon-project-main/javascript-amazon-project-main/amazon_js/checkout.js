import { cart, removefromcart, updatedekiveryoption } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatPrice } from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions }  from "../data/delivery.js";

const today = dayjs();
const deliveryDate = today.add(7, 'days').format('dddd, MMMM, D');
console.log(deliveryDate);

function renderOrderSummary(){
    let cartSummaryHtml = '';
    cart.forEach((cartItem) => {
      const productId = cartItem.productId;

      let matchingProdcut;

      products.forEach((product) => {
        if (product.id === productId) {
          matchingProdcut = product;
        }
      });

      const deliveryOptionId = cartItem.deliveryOptionsId;

      let deliveryOption;

    deliveryOptions.forEach((option) =>{
        if(option.id === deliveryOptionId){
          deliveryOption = option;
        }

      });

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days').format('dddd, MMMM D');


      cartSummaryHtml += `
        <div class="cart-item-container 
        js-cart-item-container-${matchingProdcut.id}">
                <div class="delivery-date">
                  Delivery date: ${deliveryDate}
                </div>

                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingProdcut.image}">

                  <div class="cart-item-details">
                    <div class="product-name">
                      ${matchingProdcut.name}
                    </div>
                    <div class="product-price">
                        $${formatPrice(matchingProdcut.priceCents)}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary">
                        Update
                      </span>
                      <span class="delete-quantity-link link-primary js-delete-cart-item" data-product-id="${matchingProdcut.id}">
                        Delete
                      </span>
                    </div>
                  </div>

                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    ${deliveryOptionHtml(matchingProdcut, cartItem)}
                  </div>
                </div>
              </div>
        
        `
    });

    function deliveryOptionHtml(matchingProdcut, cartItem) {

      let html = '';
      deliveryOptions.forEach((deliveryOptions) => {

        const today = dayjs();
        const deliveryDate = today.add(deliveryOptions.deliveryDays, 'days').format('dddd, MMMM D');

        const priceString = deliveryOptions.priceCents === 0 ? 'FREE' : `$${formatPrice(deliveryOptions.priceCents)} - `;

        const isChecked = deliveryOptions.id === cartItem.deliveryOptionsId;
        html +=`
        <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProdcut.id}"
        data-delivery-option-id="${deliveryOptions.id}">
                      <input type="radio"
                      ${isChecked ? 'checked':''}
                        class="delivery-option-input"
                        name="delivery-option-${matchingProdcut.id}">
                      <div>
                        <div class="delivery-option-date">
                          ${deliveryDate}
                        </div>
                        <div class="delivery-option-price">
                      ${priceString} Shipping
                        </div>
                      </div>
                    </div>
        `
      });
      return html;
    }


    document.querySelector(".js-order-summary").innerHTML = cartSummaryHtml;


    document.querySelectorAll('.js-delete-cart-item')
      .forEach((link) => {
        link.addEventListener("click", () => {
          const productId = link.dataset.productId;
          removefromcart(productId);

          const container = document.querySelector(`.js-cart-item-container-${productId}`);

          container.remove();

          updateCartQuantity();
        });

      });


      document.querySelectorAll(".js-delivery-option")
      .forEach((elemnet) => {
        elemnet.addEventListener('click', () => {
          const { productId, deliveryOptionId } = elemnet.dataset;
          updatedekiveryoption(productId, deliveryOptionId);

          renderOrderSummary();
        });
      });

}

renderOrderSummary();
