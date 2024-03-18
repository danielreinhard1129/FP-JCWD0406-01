export function reduceStockFromBorrowed({
  BeforeChange,
  borrowedProducts,
}: any) {
  borrowedProducts.forEach((borrowedProduct: any) => {
    const indeksProdukExisting = BeforeChange.findIndex(
      (item: any) => item.productId === borrowedProduct.id,
    );

    if (indeksProdukExisting !== -1) {
      BeforeChange[indeksProdukExisting].amount -= borrowedProduct.quantity;

      if (BeforeChange[indeksProdukExisting].amount < 0) {
        BeforeChange[indeksProdukExisting].amount = 0;
      }
    }
  });

  return BeforeChange;
}
