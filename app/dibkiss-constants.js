var keyMirror = require('react/lib/keyMirror');

// Define action constants
module.exports = keyMirror({
    CART_ADD: null,       // Adds item to cart
    CART_REMOVE: null,    // Remove item from cart
    CART_VISIBLE: null,   // Shows or hides the cart
    SELECT_PRODUCTVARIANT: null,   // Selects a product variant
    RECEIVE_DATA: null,   // Loads our mock data

    LOAD_PLAYLISTITEMS: null,
    LOAD_PLAYLISTITEMS_SUCCESS: null,
    LOAD_PLAYLISTITEMS_FAIL: null
});