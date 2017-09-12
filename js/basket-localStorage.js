var basketLocalStorage = (function() {
    return {
        fetch: function(basket) {
            var json = localStorage.getItem('SimpleShowCase'),
                    savedData = JSON.parse(json || '[]');

            ko.utils.arrayForEach(savedData, function(product) {
                basket.addToCart(product);
            });
        },
        save: function(basket) {
            var data = ko.toJSON(basket.products);
            localStorage.setItem('SimpleShowCase', data);
        }
    };
}());