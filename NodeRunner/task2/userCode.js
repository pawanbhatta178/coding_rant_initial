function maximizeStockProfit(price) {
    let profit = 0;
    let boughtPrice;
    let hasStock = false;
  
    for (let i = 0; i < price.length; i++) {
      if (!hasStock) {
        // Buys when stock is at the bottom.
        if ((i + 1) < price.length && price[i] < price[i + 1]) {
          boughtPrice = price[i];
          hasStock = true;
        }
      }
      else {
        // Sells when stock is at the top, 
        // or we're on the last day.
        if (i == (price.length - 1) || price[i] > price[i + 1]) {
          profit += price[i] - boughtPrice;
          hasStock = false;
        }
      }
    }
  
    return profit;
}
  
module.exports = maximizeStockProfit;