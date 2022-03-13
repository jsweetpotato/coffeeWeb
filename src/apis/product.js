const BASE_URL = `https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev`;

const getProductList = async () => {
  const response = await fetch(`${BASE_URL}/products`);

  if (response.ok) {
    return response.json();
  }

  // fetch(`${BASE_URL}/products`)
  //     .then(response => response.json)
  //     .then(data => data)
  //     .catch(error => console.error(error))
};

const getProduct = async (productId) => {
  const response = await fetch(`${BASE_URL}/products/${productId}`);

  if (response.ok) {
    return response.json();
  }
};

export { getProductList, getProduct };
