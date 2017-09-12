var myViewModel = {
    basket: new Basket(),
    removeFromCart: function(product) {
        myViewModel.basket.removeFromCart(product);
        basketLocalStorage.save(myViewModel.basket);
        
        if (myViewModel.products().length === 0) {
            window.location.href = 'index.html';
        }
    }
};
myViewModel.products = myViewModel.basket.products;

basketLocalStorage.fetch(myViewModel.basket);

ko.applyBindings(myViewModel);