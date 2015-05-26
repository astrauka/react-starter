var AppDispatcher = require('dibkiss-dispatcher.js');
var EventEmitter = require('events').EventEmitter;
var FluxCartConstants = require('dibkiss-constants.js');

// polyfill
var Objectassign = require('react/lib/Object.assign');

// Define initial data points
var _cartproducts = {}, _cartVisible = false;

// Add product to cart
function add(sku, update) {
    update.quantity = sku in _cartproducts ? _cartproducts[sku].quantity + 1 : 1;
    _cartproducts[sku] = Objectassign({}, _cartproducts[sku], update)
}

// Set cart visibility
function setCartVisible(cartVisible) {
    _cartVisible = cartVisible;
}

// Remove item from cart
function removeItem(sku) {
    delete _cartproducts[sku];
}

// Extend Cart Store with EventEmitter to add eventing capabilities
var CartStore = Objectassign({}, EventEmitter.prototype, {

    // Return cart items
    getCartItems: function() {
        return _cartproducts;
    },

    // Return # of items in cart
    getCartCount: function() {
        return Object.keys(_cartproducts).length;
    },

    // Return cart cost total
    getCartTotal: function() {
        let total = 0;
        for(let product in _cartproducts){
            if(_cartproducts.hasOwnProperty(product)){
                total += _cartproducts[product].price * _cartproducts[product].quantity;
            }
        }
        return total.toFixed(2);
    },

    // Return cart visibility state
    getCartVisible: function() {
        return _cartVisible;
    },

    // Emit Change event
    emitChange: function() {
        this.emit('change');
    },

    // Add change listener
    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    // Remove change listener
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }

});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
    var action = payload.action;
    var text;

    switch(action.actionType) {

        // Respond to CART_ADD action
        case FluxCartConstants.CART_ADD:
            add(action.sku, action.update);
            break;

        // Respond to CART_VISIBLE action
        case FluxCartConstants.CART_VISIBLE:
            setCartVisible(action.cartVisible);
            break;

        // Respond to CART_REMOVE action
        case FluxCartConstants.CART_REMOVE:
            removeItem(action.sku);
            break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    CartStore.emitChange();

    return true;

});

module.exports = CartStore;