const resalePercentages = {
  like_new: 0.7,
  very_good: 0.6,
  good: 0.5,
  acceptable: 0.4
}

const buybackPercentages = {
  like_new: 0.5,
  very_good: 0.4,
  good: 0.3,
  acceptable: 0.2
}

export const calculatePrices = (priceNew, condition) => {
  if (!resalePercentages[condition]) {
    throw new Error('Invalid condition')
  }

  const sellPrice = priceNew * resalePercentages[condition]
  const buyPrice = priceNew * buybackPercentages[condition]

  return {
    sellPrice: Number(sellPrice.toFixed(2)),
    buyPrice: Number(buyPrice.toFixed(2))
  }
}
