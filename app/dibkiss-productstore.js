var AppDispatcher = require('dibkiss-dispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxCartConstants = require('dibkiss-constants');

// polyfill
var Objectassign = require('react/lib/Object.assign');

// Define initial data points
var _dataProductStore = {
    product: {},
    selectedproductvariant: null
};

// Method to load product data from mock API
function loadProductData(data) {
    _dataProductStore.product = data[0];
    _dataProductStore.selectedproductvariant = data[0].variants[0];
}

// Method to set the currently selected product variation
function setSelected(index) {
    _dataProductStore.selectedproductvariant = _dataProductStore.product.variants[index];
}


// Extend ProductStore with EventEmitter to add eventing capabilities
var ProductStore = Objectassign({}, EventEmitter.prototype, {

    // Return Product data
    getProduct: function() {
        return _dataProductStore.product;
    },

    // Return selected Product
    getSelected: function(){
        return _dataProductStore.selectedproductvariant;
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

        // Respond to RECEIVE_DATA action
        case FluxCartConstants.RECEIVE_DATA:
            loadProductData(action.data);
            break;

        // Respond to SELECT_PRODUCTVARIANT action
        case FluxCartConstants.SELECT_PRODUCTVARIANT:
            setSelected(action.data);
            break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    ProductStore.emitChange();

    return true;

});

module.exports = ProductStore;