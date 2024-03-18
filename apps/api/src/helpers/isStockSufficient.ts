export function isStockSufficient({ stockShortages, stockNearestBranch }: any) {
  for (const stockShortage of stockShortages) {
    const stockItem = stockNearestBranch.find(
      (item: any) => item.productId === stockShortage.id,
    );

    if (!stockItem || stockItem.amount < stockShortage.quantity) {
      return false;
    }
  }
  return true;
}
