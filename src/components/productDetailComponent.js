import { saveItem, loadItem } from "../libs/storage.js";
import { changeRoute } from "../libs/router.js";
import { $, $$ } from "../utils/dom.js";

function productDetailComponent($target, product) {
  this.init = () => {
    this.render();
    this.addSelectOption(product);
    this.saveOrderList();
  };

  this.render = () => {
    const { imageUrl, name, price, productOptions } = product;

    $target.innerHTML = `
      <div class="ProductDetailPage">
        <h1>${name} 상품 정보</h1>
        <div class="ProductDetail">
          <img src="${imageUrl}"/>
          <div class="ProductDetail__info">
            <h2>${name}</h2>
            <div class="ProductDetail__price">${price}원~</div>
            <select>
              <option>선택하세요.</option>
              ${getOptions(productOptions)}
            </select>
            <div class="ProductDetail__selectedOptions">
              <h3>선택된 상품</h3>
              <ul></ul>
              <div class="ProductDetail__totalPrice">0원</div>
              <button class="OrderButton">주문하기</button>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const getOptions = (productOptions) => {
    return productOptions
      .map(({ id, name, price, stock }) => {
        return `
          <option ${!stock ? "disabled" : ""} data-id="${id}">
            ${!stock ? "(품절)" : ""} ${name} ${price > 0 ? ` +${price}원` : ""}
          </option>
        `;
      })
      .join("");
  };

  this.addSelectOption = (product) => {
    const $select = $(".ProductDetail select");
    const $selectedOptions = $(".ProductDetail__selectedOptions ul");

    this.list = JSON.parse(loadItem("products_cart")) || [];

    this.producName = product.name;

    $select.addEventListener("change", addSelecteddata);

    $selectedOptions.addEventListener("change", checkNumber);
  };

  const addSelecteddata = ({ target }) => {
    const $selectedOptions = $(".ProductDetail__selectedOptions ul");
    const { productOptions, price, name: productName, imageUrl } = product;
    const selectedIndex = target.selectedIndex;

    if (selectedIndex === 0) return;
    
    const selectedProduct = productOptions[selectedIndex - 1];
    const { id, name: optionName, price: optionPrice, stock } = selectedProduct;

    if (this.list.find((item) => item.id === id)) return;

    this.list.push({
      id,
      productName,
      optionName,
      price: price + optionPrice,
      quantity: 1,
      imageUrl,
    });

    $selectedOptions.insertAdjacentHTML(
      "beforeend",
      `      
        <li data-id="${id}">
          ${optionName} ${price + optionPrice}원
          <div>
            <input type="number" value="1" min="1" max="${stock}"/>개
          </div>
        </li>
        `
    );

    renderTotalPrice();
  };

  const checkNumber = ({ target }) => {
    const $li = target.closest("li");
    const id = $li.dataset.id;

    if (+target.value > target.max) {
      alert("갯수를 초과했습니다.");
      target.value = `${target.max}`;
      return;
    }

    if (target.value === "") {
      alert("숫자만 입력해주세요");
      target.value = "1";
      return;
    }

    this.list = this.list.map((item) => {
      if (item.id === +id) {
        return {
          ...item,
          quantity: +target.value,
        };
      }

      return item;
    });

    renderTotalPrice();
  };

  const renderTotalPrice = () => {
    const total = this.list.reduce((acc, cur) => {
      return cur.productName === this.producName ? (acc += cur.price * cur.quantity) : (acc += 0);
    }, 0);

    $(".ProductDetail__totalPrice").innerText = `${total}원`;
  };

  this.saveOrderList = () => {
    const $orderButton = $(".OrderButton");
    $orderButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (!confirm("주문하시겠습니까?")) return;
      saveItem("products_cart", JSON.stringify(this.list));
      changeRoute("/cart");
    });
  };
}

export default productDetailComponent;
