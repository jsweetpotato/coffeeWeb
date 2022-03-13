// selector
//   -[X] 상품 옵션가가 0인 경우, ${상품이름} ${옵션이름}
//   -[X] 상품 옵션가가 0보다 큰 경우, ${상품이름} ${옵션이름} (+${옵션가격}원)
//   -[X] 재고가 0인 상품의 경우, (품절) ${상품이름} ${옵션이름}
//   -[X] option에 disabled attribute를 지정하여 선택되지 않게 합니다.

// selectedOption
//   -[X] 상품의 옵션을 선택하면, 선택된 상품을 ProductDetail__selectedOptions 영역에 추가합니다.
//   -[X] 이미 선택된 상품은 다시 선택해도 선택된 상품에 추가되지 않음.

// totalPrice
//   -[X] 선택된 옵션들의 총 가격을 계산해서 ProductDetail__totalPrice에 렌더링합니다.
//   -[X] 옵션별 가격은 상품 가격 + 옵션 가격을 합친 값입니다.
//   -[] 각 옵션별 가격은 수량만큼 곱해야 합니다.

// 수량 input
//   -[X] 선택된 상품의 input에서 수량을 변경하면 수량이 변경되어야 합니다.
//   -[X] 선택한 옵션의 개수를 변경 시, option의 stock을 넘을 수 없게 해야합니다.
//   -[X] 해당 input에 숫자가 아닌 값을 넣은 경우 무시하도록 합니다.

// -[X] 주문 버튼
//   -[X] 주문하기 버튼을 누르면 localStorage에 아래 형태의 데이터로 상품들을 추가
//   -[X] 이때 localStorage에 담는 키 이름은 반드시 products_cart 라는 이름으로 하도록 합니다.
//   -[X] /cart 페이지로 이동합니다.

import { getProduct } from "../apis/product.js";
import productDetailComponent from  "../components/productDetailComponent.js"

function ProductDetail($target, productId) {
  this.init = async () => {
    this.product = await getProduct(productId);
    new productDetailComponent($target, this.product).init();
  };
}

export default ProductDetail;
