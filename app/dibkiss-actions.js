var AppDispatcher = require('dibkiss-dispatcher');
var FluxCartConstants = require('dibkiss-constants');

// Define actions object
var FluxCartActions = {

    // Receive inital product data
    receiveProduct: function(data) {
        AppDispatcher.handleAction({
            actionType: FluxCartConstants.RECEIVE_DATA,
            data: data
        })
    },

    // Set currently selected product variation
    selectProduct: function(index) {
        AppDispatcher.handleAction({
            actionType: FluxCartConstants.SELECT_PRODUCTVARIANT,
            data: index
        })
    },

    // Add item to cart
    addToCart: function(sku, update) {
        AppDispatcher.handleAction({
            actionType: FluxCartConstants.CART_ADD,
            sku: sku,
            update: update
        })
    },

    // Remove item from cart
    removeFromCart: function(sku) {
        AppDispatcher.handleAction({
            actionType: FluxCartConstants.CART_REMOVE,
            sku: sku
        })
    },

    // Update cart visibility status
    updateCartVisible: function(cartVisible) {
        AppDispatcher.handleAction({
            actionType: FluxCartConstants.CART_VISIBLE,
            cartVisible: cartVisible
        })
    },



    loadPlaylistItems: function(projectID, playlistID) {
        AppDispatcher.handleAction({
            actionType: FluxCartConstants.LOAD_PLAYLISTITEMS,
            projectid: projectID,
            playlistid: playlistID
        })
    },
    loadPlaylistItems_success: function(data) {
        AppDispatcher.handleAction({
            actionType: FluxCartConstants.LOAD_PLAYLISTITEMS_SUCCESS,
            data: data
        })
    },
    loadPlaylistItems_fail: function(error) {
        AppDispatcher.handleAction({
            actionType: FluxCartConstants.LOAD_PLAYLISTITEMS_FAIL,
            error: error
        })
    },
    testGetPlaylistItem: function(id) {
        AppDispatcher.handleAction({
            actionType: FluxCartConstants.TEST_GETPLAYLISTITEM,
            id: id
        })
    }

};

module.exports = FluxCartActions;