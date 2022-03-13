import { loadItem, saveItem, clearItem } from "../libs/storage.js";

import { changeRoute } from "../libs/router.js";

import { $ } from "../utils/dom.js";

const CART_LOCALSTORAGE_NAME = "products_cart";

function CartComponent($target, initialState) {
  this.init = () => {
    $target.innerHTML = "";

    this.state = initialState;

    this.render();
    this.registerEvent();
  };

  this.render = () => {
    const totalPrice = this.state.reduce((acc, cur) => (acc += cur.price * cur.quantity), 0);

    $target.innerHTML = `
      <div class="CartPage">
          <h1>장바구니</h1>
          <div class="Cart">
          <ul>
              ${this.state
                .map(({ productName, optionName, price, imageUrl, quantity }) => {
                  return `
                      <li class="Cart__item">
                      <img src="${imageUrl}" />
                      <div class="Cart__itemDesription">
                          <div>
                          ${productName} ${optionName} ${quantity}개
                          </div>
                          <div>${price}원</div>
                      </div>
                  </li>
              `;
                })
                .join("")}
          </ul>
          <div class="Cart__totalPrice">
            총 상품가격 ${totalPrice}원
          </div>
          <button class="OrderButton">
            주문하기
          </button>
          </div>
      </div> 
    `;
  };

  this.registerEvent = () => {
    $(".OrderButton").addEventListener("click", () => {
      alert("주문이 완료되었습니다.");
      clearItem("products_cart");
      changeRoute("/");
    });
  };
}

export default CartComponent;
