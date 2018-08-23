// let PRODUCTS = [];
function addProduct(product, success, error){
	// PRODUCTS.push(product)
	// success()
	const settings = {
		url: '/products',
		dataType: 'json',
		type: 'POST',
		data: product,
		success,
		error

	}

	$.ajax(settings);
} 

function getAllProducts(success, error){
	// success(PRODUCTS)
	const settings = {
		url: '/products',
		dataType: 'json',
		type: 'GET',
		success,
		error

	}
	$.ajax(settings);
}

function getProduct(id, success, error){
	// PRODUCTS = PRODUCTS.filter(function(product){
		//return the ones the are not equal returns all the elements that are not deleted
	// 	return id != product.id; 
	// })
	// success()
	const settings = {
		url: `/products/${id}`,
		dataType: 'json',
		type: 'GET',
		success,
		error
		}

	$.ajax(settings);

} 
// .filter returns all elements in the array that match. .find just returns one
//arguments can be functions
function deleteProduct(id, success, error){
	// PRODUCTS = PRODUCTS.filter(function(product){
		//return the ones the are not equal returns all the elements that are not deleted
	// 	return id != product.id; 
	// })
	// success()
	const settings = {
		url: `/products/${id}`,
		dataType: 'json',
		type: 'DELETE',
		success,
		error

		}
	$.ajax(settings);

} 

function editProduct(id, newValues, success, error){
	// const theProduct = PRODUCTS.find(function(product){
	// 	return id === product.id;
	// });
	// theProduct.image = newValues.image;
	// theProduct.name = newValues.name;
	// theProduct.description = newValues.description;
	// theProduct.originalPrice = newValues.originalPrice;
	// theProduct.price = newValues.price;

	// success()
	const settings = {
		url: `/products/${id}`,
		dataType: 'json',
		type: 'PUT',
		data: newValues,
		success,
		error

	}

	$.ajax(settings);
} 


function generateProductHTML(product, index){
	return `<div class="col-3">
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
	 <button class="delete" data-id="${product.id}">Delete</button>
 	 <button class="edit" data-id="${product.id}">Edit</button>
	</div>
	</div>
	</div>
	`

}
//edit form
function generateAddEditForm(product){
	return `<form id="js-${product?"edit":"add"}-form" data-id="${product?product.id:''}">
      <fieldset>
        <legend>Add an Item</legend>
        <label for="product-image">Image(url)</label>
        <input type="text" id="product-image" name="image" class="js-product-list-entry" placeholder="e.g., http:url" ${product?`value="${product.image}"`:''}>
        <label for="product-title">Title:</label>
        <input type="text" id="product-title" name="name" class="js-product-list-entry" placeholder="e.g., Blue Jeans"  ${product?`value="${product.name}"`:''}>
        <label for="product-description">Description</label>
        <input type="text" id="product-description" name="description" class="js-product-list-entry" placeholder="e.g., Blue Jeans with a rip in the knee caps"  ${product?`value="${product.description}"`:''}>
        <label for="product-originalPrice">Strikthrough Price</label>
        <input type="text" id="product-originalPrice" name="originalPrice" class="js-product-list-entry" placeholder="e.g., $9.99"  ${product?`value="${product.originalPrice}"`:''}>
        <label for="product-price">Price</label>
        <input type="text" id="product-price" name="price" class="js-product-list-entry" placeholder="e.g., $4.99"  ${product?`value="${product.price}"`:''}>

      </fieldset>
      <button type="submit">${product?"edit":"add"} Item</button>
    </form>`
	
}

function displayAddEditForm(product){
$('#form-container').html(generateAddEditForm(product))

}

function getAndEditProduct(id){
	getProduct(id, displayAddEditForm)
}

function generateProductsHTML(products) {
	return products.map(generateProductHTML).join("")
}


function displayProductsHTML(products){
	$('.product-container').html(generateProductsHTML(products))
}

function getAndDisplayProducts(){
	getAllProducts(displayProductsHTML)
}


function addFormsSubmitHandler(){
	$('main').on('submit', '#js-add-form', function(event){
		//stoping the default behavior
		event.preventDefault();
		const image = $('#product-image').val(); 
		const name = $('#product-title').val();
		const description = $('#product-description').val();
		const originalPrice = $('#product-originalPrice').val();
		const price = $('#product-price').val();
		// clears the check boxes
		$('#product-image').val(""); 
		$('#product-title').val(""); 
		$('#product-description').val(""); 
		$('#product-originalPrice').val(""); 
		$('#product-price').val(""); 
		const product = {image, name, description, originalPrice, price, id:uuid()};
		addProduct(product, getAndDisplayProducts);
	});
}

function editFormsSubmitHandler(){
	$('main').on('submit', '#js-edit-form', function(event){
		//stoping the default behavior
		event.preventDefault();
		console.log('hello');
		const image = $('#product-image').val(); 
		const name = $('#product-title').val();
		const description = $('#product-description').val();
		const originalPrice = $('#product-originalPrice').val();
		const price = $('#product-price').val();
		const id = $(event.currentTarget).data("id")
		// clears the check boxes
		$('#product-image').val(""); 
		$('#product-title').val(""); 
		$('#product-description').val(""); 
		$('#product-originalPrice').val(""); 
		$('#product-price').val(""); 
		const product = {image, name, description, originalPrice, price};
		editProduct(id, product, getAndDisplayProducts);
	});
}

function addDeleteHandler(){
	$('.product-container').on('click', '.delete', function(event){
		const id = $(event.currentTarget).data('id');
		deleteProduct(id, getAndDisplayProducts);
		})
}

function addEditHandler(){
	$('.product-container').on('click', '.edit', function(event){
		const id = $(event.currentTarget).data('id')
		// const product = PRODUCTS.find(function(product){
		// 	return product.id === id
		// })
		// displayAddEditForm(product)
		getAndEditProduct(id)
	})
}



$(function(){
	displayAddEditForm()
	addFormsSubmitHandler()
	addDeleteHandler()
	addEditHandler()
	editFormsSubmitHandler()
	getAndDisplayProducts()

});





function uuid() {
  var uuid = "", i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uuid += "-"
    }
    uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}



























































