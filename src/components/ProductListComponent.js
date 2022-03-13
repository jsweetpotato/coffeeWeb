import { changeRoute } from "../libs/router.js";
import { $ } from "../utils/dom.js";

function ProductListComponent($target, products) {
  this.init = () => {
    this.render();
    this.registerEvent();
  };

  this.render = () => {
    $target.innerHTML = `
      <div class="ProductListPage">
        <h1>상품목록</h1>
        <ul> 
          ${products
            .map(({ id, imageUrl, name, price }) => {
              return `
              <li class="Product" data-id="${id}">
                  <img src="${imageUrl}"/>
                  <div class="Product__info">
                    <div>${name}</div>
                    <div>${price}원~</div>
                  </div>
              </li>
            `;
            })
            .join("")}
        </ul>
      </div>
    `;
  };

  this.registerEvent = () => {
    // $target 즉, main 으로 할 경우, 라우팅 처리가 이상하게 동작했음.
    // 🐛 ul 태그로 하면 정상 동작...왜 그러지?
    $(".ProductListPage").addEventListener("click", ({ target }) => {
      const $li = target.closest("li");
      if (!$li) return;

      changeRoute(`/products/${$li.dataset.id}`);
    });
  };
}

export default ProductListComponent;