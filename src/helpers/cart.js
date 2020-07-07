const CartHelper = {
  generateTotal(lineItems = []) {
    return lineItems.reduce(
      (res, lineItem) => res + parseFloat(lineItem.price),
      0.0
    );
  },
};

export const { generateTotal } = CartHelper;
