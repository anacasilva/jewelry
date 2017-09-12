var myViewModel = {
    basket: new Basket(),
    email: ko.observable(""),
    message: ko.observable(""),
    buy: function () {
        var productList = ko.utils.arrayMap(myViewModel.products(), function (product) {
            return product.title;
        });
        var additionalMessage = myViewModel.message() && ("This is an additional message I want to send you: \n\t" + myViewModel.message());
        var body = "Hi, I'm " + myViewModel.email() + " and I want to buy these products from you.\n" +
                productList + "\n" +
                additionalMessage,
            mail = "mailto:" +
                "postmaster@simpleshowcase.it?" +
                "subject=" + encodeURIComponent("I want to buy these items") +
                "&body=" + encodeURIComponent(body);
        window.location.href = mail;
    }
};
myViewModel.products = myViewModel.basket.products;
myViewModel.canBuy = ko.computed(function () {
    return myViewModel.email() && myViewModel.products().length;
});

basketLocalStorage.fetch(myViewModel.basket);

ko.applyBindings(myViewModel);