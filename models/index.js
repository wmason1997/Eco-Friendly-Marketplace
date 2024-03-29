const User = require('./User');
const Cart = require('./Cart');
const cartItem = require('./cartItem');
const Item = require('./Item');
const Review = require('./Review');
const Wishlist = require('./Wishlist');
const wishlistItem = require('./wishlistItem');
const Order = require('./Order');
const orderItem = require('./orderItem');
const { CallTracker } = require('assert');

// Define relationships between the models according to https://miro.com/app/board/uXjVN44B41Y=/

// One-to-one relations

// Orders - Order Item
Order.hasOne(orderItem, {
    foreignKey: 'orderID'
});

orderItem.belongsTo(Order, {
    foreignKey: 'id'
});

// item - cartitem
cartItem.hasOne(Item, {
    foreignKey: 'id'
});

Item.hasOne(cartItem, {
    foreignKey: 'itemID'
});

// User - Cart

User.hasOne(Cart, {
    foreignKey: 'userID'
});

Cart.belongsTo(User, {
    foreignKey: 'id'
});

// User - Wishlist

User.hasOne(Wishlist, {
    foreignKey: 'userID'
});

Wishlist.belongsTo(User, {
    foreignKey: 'id'
});

// Order Item - Item

orderItem.hasOne(Item, {
    foreignKey: 'itemID'
});

Item.belongsTo(orderItem, {
    foreignKey: 'itemID'
});

// wishlistItem - Item
wishlistItem.hasOne(Item, {
    foreignKey: 'id'
});

Item.belongsTo(wishlistItem, {
    foreignKey: 'itemID'
});



// One-to-Many relations

// Item - Review
Item.hasMany(Review, {
    foreignKey: 'itemID'
});

Review.belongsTo(Item, {
    foreignKey: 'id'
})


// User - Review
User.hasMany(Review, {
    foreignKey: 'userID'
});

Review.belongsTo(User, {
    foreignKey: 'id'
});


// User - Order
User.hasMany(Order, {
    foreignKey: 'userID'
});

Order.belongsTo(User, {
    foreignKey: 'id'
});

// Wishlist - wishlistItem
Wishlist.hasMany(wishlistItem, {
    foreignKey: 'wishlistID'
});

wishlistItem.belongsTo(Wishlist, {
    foreignKey: 'id'
});

User.hasMany(Item);
Item.belongsTo(User);


module.exports = { User, cartItem, Item, Review, Wishlist, wishlistItem, orderItem, Order };
