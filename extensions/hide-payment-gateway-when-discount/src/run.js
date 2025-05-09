// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
const NO_CHANGES = {
  operations: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  // Get the cart total from the function input, and return early if it's below 100
  const cartTotal = parseFloat(input.cart.cost.totalAmount.amount ?? "0.0");
  console.log("Cart total:", cartTotal);

  if (cartTotal < 100) {
    // You can use STDERR for debug logs in your function
    console.error("Cart total is not high enough, no need to hide the payment method.");
    return NO_CHANGES;
  }

  // find the payment method to hide
  const hidePaymentMethod = input.paymentMethods.find(method => method.name.includes("Cash on Delivery"));
  if (!hidePaymentMethod) return NO_CHANGES;

  return {
    operations: [
      {
        hide: {
          paymentMethodId: hidePaymentMethod.id
        }
      }
    ]
  }
};