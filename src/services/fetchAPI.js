export const fetchAPI = (url, products) => {
  return new Promise((res) => {
    console.log("fetchAPI", url)

    setTimeout(() => {
      const params = new URLSearchParams((new URL(url)).search);
      const category = params.get("category");
      const price_min = params.get("price_min");
      const price_max = params.get("price_max");
      const brand = params.get("brand");
      const rate = params.get("rate");

      const result = products.filter(product => {
        return (!category || product.category === category)
          && (!brand || product.brand === brand)
          && (!rate || +product.rating === +rate)
          && (!price_min || +product.price_min >= +price_min)
          && (!price_max || +product.price_max <= +price_max)
      });
      // rej("Some Fetch error")
      res(result)
    }, 2000)
  })
}