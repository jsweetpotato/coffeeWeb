import ProductListComponent from "../components/ProductListComponent.js";
import { getProductList } from "../apis/product.js";

// componentns
// UI 만 담당
// innerHTML 로 렌더링하고, 이벤트 등록

// pages
// - 데이터 요청 및 데이터 관리
// 

function ProductListPage($target) {
  this.init = async () => {
    const products = await getProductList();
    new ProductListComponent($target, products).init();
  };
}

export default ProductListPage;
