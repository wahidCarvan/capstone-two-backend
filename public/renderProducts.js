// jquery
// when document is ready do something
$(document).ready(function(event){
	console.log(getProducts);
	getProducts(function(products) {
		products.forEach((product, index) => {
			$('#product-details').append(`
				<div class="col-3">
					<div class="card">
						<img class="product-images" src="${product.image}" alt="place holder image"/>
						<hr>
					 	<h5 class="card-title">${product.name}</h5>
						<div class="card-body">
						    <p class="card-text">
						    	<h5 class="card-title">${product.description}</h5>
						    <span class="strikethrough-price">${product.originalPrice}</span>
						    <br>
						    <span class="our-price">$${product.price}</span></p>
						    	<button class="add-to-cart" data-id="${index}">Add to Cart</button>
						</div>
					</div>
				</div>

			`);
		});

		$('.add-to-cart').click(function(event){
				// gives us the id
			const id = event.target.dataset.id;
			// grab the product with id add to cart
			const product = products[id];
			addToCart(product);
			
		});

	});

});




// add the button add to cart

// make a new file make a shopping cart array

// click add to cart push to new item 