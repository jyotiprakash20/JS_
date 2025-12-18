import { cart } from "../../data/cart.js";
import { getProduct }  from "../../data/products.js";
import { deliveryOptions, getDeliveryOption } from "../../data/delivery.js";
import { formatPrice } from "../utils/money.js";


export function renderPayementSummary(){
    let productTotal = 0;
    let shippingTotal = 0;
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productTotal += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId);
        shippingTotal += deliveryOption.priceCents;
    });
   const totalbeforeTax = productTotal + shippingTotal;
   const taxCents = totalbeforeTax * 0.1;
   const totalCents = totalbeforeTax + taxCents;


   const paymentSummaryHtml = `

        <div class="payment-summary-title">
                Order Summary
            </div>

            <div class="payment-summary-row">
                <div>Items (3):</div>
                <div class="payment-summary-money">$${formatPrice(productTotal)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">$${formatPrice(shippingTotal)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${formatPrice(totalbeforeTax)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$${formatPrice(taxCents)}</div>
            </div>

            <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">$${formatPrice(totalCents)}</div>
            </div>

            <button class="place-order-button button-primary">
                Place your order
            </button>


   `

   document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;
 }