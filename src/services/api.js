export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const jsonData = response.json();
  return jsonData;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (categoryId && query) {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
    const jsonData = response.json();
    return jsonData;
  }

  if (!categoryId && query) {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
    const jsonData = response.json();
    return jsonData;
  }
  if (categoryId && !query) {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
    const jsonData = response.json();
    return jsonData;
  }
  return new Error('Parâmetro vazio');
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
// https://github.com/tryber/sd-031-a-project-frontend-online-store
