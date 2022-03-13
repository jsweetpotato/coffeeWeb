// 상품 목록
// -[X] 상품 목록 데이터 받아오기
// -[X] 받아온 데이터로 .ProductListPage ul에 처음 화면 렌더

// 상세 페이지
// -[] 상품 목록에서 제품을 클릭하면, 상세 페이지로 이동
// -[] 클릭한 상품과 일치하는 데이터 가져오기
// -[] 가져온 데이터로 렌더하기

// -[]옵션 부분
//   -[X] 상품 옵션가가 0인 경우, ${상품이름} ${옵션이름}
//   -[X] 상품 옵션가가 0보다 큰 경우, ${상품이름} ${옵션이름} (+${옵션가격}원)
//   -[X] 재고가 0인 상품의 경우, (품절) ${상품이름} ${옵션이름}
//     -[X] option에 disabled attribute를 지정하여 선택되지 않게 합니다.
//   -[] 상품의 옵션을 선택하면, 선택된 상품을 ProductDetail__selectedOptions 영역에 추가합니다.
//   -[] 이미 선택된 상품은 다시 선택해도 선택된 상품에 추가되지 않음.
//   -[] 선택된 옵션들의 총 가격을 계산해서 ProductDetail__totalPrice에 렌더링합니다.
//   -[] 옵션별 가격은 상품 가격 + 옵션 가격을 합친 값입니다.
//   -[] 각 옵션별 가격은 수량만큼 곱해야 합니다.

// -[] 수량 input
//   -[] 선택된 상품의 input에서 수량을 변경하면 수량이 변경되어야 합니다.
//   -[] 선택한 옵션의 개수를 변경 시, option의 stock을 넘을 수 없게 해야합니다.
//   -[] 해당 input에 숫자가 아닌 값을 넣은 경우 무시하도록 합니다.

// -[] 주문 버튼
//   -[] 주문하기 버튼을 누르면 localStorage에 아래 형태의 데이터로 상품들을 추가
//   -[] 이때 localStorage에 담는 키 이름은 반드시 products_cart 라는 이름으로 하도록 합니다.
//   -[] /cart 페이지로 이동합니다.

import { $ } from "./src/utils/dom.js";

import ProductListPage from "./src/pages/ProductListPage.js";
import CartPage from "./src/pages/CartPage.js";
import ProductDetail from "./src/pages/ProductDetail.js";

// app 은 라우팅 처리!
// url 별로 - 담당하는 page 렌더(그리기)
// "/" 제품리스트 페이지
// "/cart" 장바구니 페이지

// 라우트 하기전에 간단하게 페이지를 만들고 동작 확인

// const productListPage = new ProductListPage($(".App"));
// 코드는 괜찮아요! 넵!

function App() {
  this.init = () => {
    this.route();
  };

  this.route = () => {
    // "/" , "/cart", "/products/:productId"

    const { pathname } = location;

    if (pathname === "/") {
      new ProductListPage($(".App")).init();
      return;
    }

    if (pathname === "/cart") {
      new CartPage($(".App")).init();
      return;
    }

    if (pathname.indexOf("/products/") === 0) {
      // /products/1
      //  ['', 'product', 1]
      const [, , productId] = pathname.split("/");
      new ProductDetail($(".App"), productId).init();
      return;
    }

    // NotFoundPage
    console.log("NotFoundPage", pathname);
  };

  this.route();
  // route 및 뒤로가기 처리 // 지수님 작업 끝나면 수정하기!
  window.addEventListener("locationchange", this.route);
  window.addEventListener("locationChange", this.route);
  window.addEventListener("popstate", this.route);
}

const app = new App();
app.init();
