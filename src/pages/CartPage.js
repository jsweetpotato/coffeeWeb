import { loadItem } from "../libs/storage.js";

import { changeRoute } from "../libs/router.js";

import CartComponent from "../components/CartComponent.js";

const CART_LOCALSTORAGE_NAME = "products_cart";

function CartPage($target) {
  this.init = () => {
    $target.innerHTML = "";

    if (!loadItem("products_cart")) {
      alert("장바구니가 비어 있습니다");
      changeRoute("/");
      return;
    }

    this.state = JSON.parse(loadItem("products_cart"));

    if (!this.state) return;

    new CartComponent($target, this.state).init();
  };
}

export default CartPage;
