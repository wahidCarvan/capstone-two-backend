function getAndDisplayProducts(){
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
						    	<p class="card-description">${product.description}</p>
						    <span class="strikethrough-price">$${product.originalPrice}</span>
						    <br>
						    <span class="our-price">$${product.price}</span></p>
						    <button class="add-to-cart" data-id="${product.id}">Add to wishlist</button>
						</div>
					</div>
				</div>

			`);
		});
	

	});

}