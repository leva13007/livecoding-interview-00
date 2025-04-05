
export const buildURL = (filters) => {
  const params = new URLSearchParams();

  if (filters.category) params.append("category", filters.category);
  if (filters.price.min) params.append("price_min", filters.price.min);
  if (filters.price.max) params.append("price_max", filters.price.max);
  if (filters.brand) params.append("brand", filters.brand);
  if (filters.rate) params.append("rate", filters.rate);

  if (params.toString()) {
    window.history.pushState(null, "", `?${params.toString()}`)
  } else {
    window.history.pushState(null, "", "/")
  }

  return params;
}