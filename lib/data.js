const API_URL = "https://dummyjson.com/products";

export async function getProductsByCategory(category) {
  const response = await fetch(`${API_URL}/category/${category}`);

  const data = await response.json();

  return data.products;
}
