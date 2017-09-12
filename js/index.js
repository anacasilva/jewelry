var myViewModel = {
    //Filter Section
    allCategories: ko.observableArray([]),
    selectedCategory: ko.observable(),
    selectedName: ko.observable(''),

    //Selected Product Section
    selectedProduct: ko.observable(),
    shouldShow: function(item) {
        return new RegExp(myViewModel.selectedName(), "gi").test(item.title);
    },
    selectProduct: function(product) {
        myViewModel.selectedProduct.current = product;
    },
    showProduct: function(product) {
        myViewModel.selectedProduct.current = myViewModel.selectedProduct();
        myViewModel.selectedProduct(product);
    },
    hideProduct: function() {
        myViewModel.selectedProduct(myViewModel.selectedProduct.current);
    },
    basket: new Basket(),
    addToCart: function(product) {
        myViewModel.basket.addToCart(product);
        basketLocalStorage.save(myViewModel.basket);
    }
};

//ko.utils.arrayFilter = function (array, predicate) { /* .. */ }
//Returns a subset of the original array with only items that match a certain criteria
myViewModel.categories = ko.computed(function() {

    //Array of categories > products
    var results = myViewModel.allCategories();

    //Selected category: Necklaces
    var filterByCategory = myViewModel.selectedCategory();

    if (filterByCategory) {

        //ko.utils.arrayFilter = function (array, predicate) { /* .. */ }
        results = ko.utils.arrayFilter(results, function(category) {
			       return category.name === filterByCategory;
		    });

    }

    return results;
});

//ko.utils.arrayMap = function (array, mapping) { /* .. */ }
//ko.utils.arrayMap	Maps certain properties of objects in an array into a new array
myViewModel.categoryName = ko.computed(function() {
    //arrayMap: extracting a subset of data into an array
    var results = ko.utils.arrayMap(myViewModel.allCategories(), function(category) {
        return category.name;
    });
    return results;
});


$.getJSON('products.json', function(data) {
    myViewModel.allCategories(data.categories);
});

ko.applyBindings(myViewModel);

basketLocalStorage.fetch(myViewModel.basket); //???
