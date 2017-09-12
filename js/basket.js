function Basket() {
    this.products = ko.observableArray([]);
}

Basket.prototype.addToCart = function(product) {
    this.products.push(product);
};

Basket.prototype.removeFromCart = function(product) {
    this.products.remove(product);
};