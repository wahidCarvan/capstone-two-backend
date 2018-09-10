// let PRODUCTS = [];
// if user is  null we are not logged in
let user = null;



function failure(error){
	console.log(error.status)
	if (error.status === 401){
		$('#error-container').html(`<p>Login is wrong</p>`);
	} else {
		$('#error-container').html(`<p>${error.responseJSON.message}</p>`);
	}

	//display the error to the screeen
	//clear the error message when the screen updates
	console.error(error.responseJSON.message);
}

function addUser(user, success, error){
	const settings = {
		url: '/users',
		dataType: 'json',
		type: 'POST',
		data: user,
		success,
		error

	}

	$.ajax(settings);
 	
}


function addProduct(product, success, error){
	// PRODUCTS.push(product)
	// success()
	const settings = {
		url: '/products',
		dataType: 'json',
		type: 'POST',
		data: product,
		headers: {
			'Authorization': `Bearer ${user}`
		}, 
		success,
		error

	}

	$.ajax(settings);
} 
function logIn(user, success, error){
	const settings = {
		url: '/auth/login',
		dataType: 'json',
		type: 'POST',
		data: user,
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
		headers: {
			'Authorization': `Bearer ${user}`
		}, 
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
	newValues.id = id;
	const settings = {
		url: `/products/${id}`,
		dataType: 'json',
		type: 'PUT',
		data: newValues,
		headers: {
			'Authorization': `Bearer ${user}`
			
		}, 
		success,
		error

	}

	$.ajax(settings);
} 


function generateProductHTML(product, index){
	return `<div class="col-3">
	<div class="card">
	<img class="product-images" src="${product.image}" alt="place holder image"/>
	<h2 class="card-title">${product.name}</h2>
	<div class="card-body">
	<p class="card-text">
	<p class="card-title">${product.description}</p>
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


function generateSignUpForm(){
	return  `<form id="js-signup-form">
      <fieldset>
        <legend>Sign Up</legend>
        <label for="username">User Name</label>
        <input type="text" id="username" name="username" required class="js-product-list-entry" placeholder="Enter a user name">
        <label for="password">Password</label><br>
        <input type="text" id="password" name="password" required class="js-product-list-entry" placeholder="enter a password">
      </fieldset>
      <button type="submit">Sign Up</button>
    </form>
   		 <a id="sign-in">Already have an account? <p>Sign in</p></a>`

	
}

function generateSignInForm(){
	return  `<form id="js-signin-form">
      <fieldset>
        <legend>Sign In</legend>
        <label for="username">User Name</label>
        <input type="text" id="username" name="username" required class="js-product-list-entry" placeholder="Enter a user name">
        <label for="password">Password</label>
        <input type="text" id="password" name="password" required class="js-product-list-entry" placeholder="enter a password">
      </fieldset>
      <button type="submit">Sign In</button>
    </form>`
}

//edit form
function generateAddEditForm(product){
	return `<form id="js-${product?"edit":"add"}-form" data-id="${product?product.id:''}">
      <fieldset>
        <legend>Add an Item</legend>
        <ul>
        <li><label for="product-image">Image(url)</label>
        <input type="text" id="product-image" name="image" class="js-product-list-entry" placeholder="e.g., http:url" ${product?`value="${product.image}"`:''}>
        </li>
        <li><label for="product-title">Title:</label>
        <input type="text" id="product-title" name="name" class="js-product-list-entry" placeholder="e.g., Blue Jeans"  ${product?`value="${product.name}"`:''}>
         </li>
        <li><label for="product-description">Description</label>
        <input type="text" id="product-description" name="description" class="js-product-list-entry" placeholder="e.g., Blue Jeans with a rip in the knee caps"  ${product?`value="${product.description}"`:''}>
         </li>
        <li><label for="product-originalPrice">Strikthrough Price</label>
        <input type="text" id="product-originalPrice" name="originalPrice" class="js-product-list-entry" placeholder="e.g., $9.99"  ${product?`value="${product.originalPrice}"`:''}>
         </li>
        <li><label for="product-price">Price</label>
        <input type="text" id="product-price" name="price" class="js-product-list-entry" placeholder="e.g., $4.99"  ${product?`value="${product.price}"`:''}>
        </li>
        </ul>
      </fieldset>
      <button type="submit">${product?"edit":"add"} Item</button>
    </form>`
	
}



function displaySigninForm(){
	$('#form-container').html(generateSignInForm())
	$('#error-container').empty()
	$('h1').text('Protek')
	$('#logOutButton').addClass('hidden')
	$('.product-container').empty()
}

function displaySignupForm(){
	$('#form-container').html(generateSignUpForm())
	$('#error-container').empty()
	$('h1').text('Protek')
	$('#logOutButton').addClass('hidden')
	$('.product-container').empty()

}

function displayAddEditForm(product){
$('#form-container').html(generateAddEditForm(product))
$('#error-container').empty()

}

function getAndEditProduct(id){
	getProduct(id, displayAddEditForm)
}

function generateProductsHTML(products) {
	return products.map(generateProductHTML).join("")
}


function displayProductsHTML(products){
	$('.product-container').html(generateProductsHTML(products))
	$('#error-container').empty()
	$('h1').text('Product List')
	$('#logOutButton').removeClass('hidden')
}

function getAndDisplayProducts(){
	console.log(user)
	getAllProducts(displayProductsHTML)

}

function logOutHandler() {
	$('#logOutButton').click(doLogOut)
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
		const product = {image, name, description, originalPrice, price};
		addProduct(product, getAndDisplayProducts, failure);
	});
}

function addSignInSubmitHandler(){
	$('main').on('submit', '#js-signin-form', function(event){
		event.preventDefault();
		const username = $('#username').val(); 
		const password = $('#password').val();
		$('#username').val(""); 
		$('#password').val("");
		logIn({
			username, password
		},doLogin, failure)
		});

}

function showSigninHandler(){
	$('main').on('click', '#sign-in', function(event){
		displaySigninForm()

		});
}

function doLogin(response){
	user = response.authToken
	getAndDisplayProducts()
	displayAddEditForm()
}

function doLogOut(){
	user = null
	displaySignupForm()
}

function doSignUp(response){

}

function addSignUpSubmitHandler(){
	$('main').on('submit', '#js-signup-form', function(event){
		event.preventDefault();
		const username = $('#username').val(); 
		const password = $('#password').val();
		$('#username').val(""); 
		$('#password').val("");
		const login = {username, password};
		addUser(login, doSignUp, failure)


	});
}

function editFormsSubmitHandler(){
	$('main').on('submit', '#js-edit-form', function(event){
		//stoping the default behavior
		event.preventDefault();
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
		editProduct(id, product, getAndDisplayProducts, failure);
	});
}

function addDeleteHandler(){
	$('.product-container').on('click', '.delete', function(event){
		const id = $(event.currentTarget).data('id');
		deleteProduct(id, getAndDisplayProducts, failure);
		})
}

function addEditHandler(){
	$('.product-container').on('click', '.edit', function(event){
		const id = $(event.currentTarget).data('id')
		// const product = PRODUCTS.find(function(product){
		// 	return product.id === id
		// })
		// displayAddEditForm(product)
		getAndEditProduct(id, failure)
	})
}



$(function(){
	addFormsSubmitHandler()
	addDeleteHandler()
	addEditHandler()
	addSignInSubmitHandler()
	addSignUpSubmitHandler()
	editFormsSubmitHandler()
	showSigninHandler()
	logOutHandler()
	if (user){
		displayAddEditForm()
		getAndDisplayProducts()
	} else  { 
		displaySignupForm()

	}
	

	
});





// function uuid() {
//   var uuid = "", i, random;
//   for (i = 0; i < 32; i++) {
//     random = Math.random() * 16 | 0;

//     if (i == 8 || i == 12 || i == 16 || i == 20) {
//       uuid += "-"
//     }
//     uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
//   }
//   return uuid;
// }



























































