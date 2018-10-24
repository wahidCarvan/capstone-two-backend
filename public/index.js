// let PRODUCTS = [];
// if user is  null we are not logged in
let user = null;
let userName = null;



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

// needs to be add to wish list
function addToWishlist(productId, success, error){
	const settings = {
		url: `/users/${userName}/wishlist`,
		dataType: 'json',
		type: 'POST',
		data: {productId},
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





function generateSignUpForm(){
	return `<form id="js-signup-form" class="signup-form">
    <fieldset>
      <legend>Sign up</legend>
      <label for="username">User Name</label>
      <input type="text" id="username" name="username" required class="js-product-list-entry"
       placeholder="Enter a user name"/>
      <label for="password">Password</label>
      <input type="password" id="password" name="password"
      required class"js-product-list-entry" placeholder="Enter 10 or more characters" />
       </fieldset>
      <button type="submit">Sign up</button>
  </form>
   <p class=js-account>Already have an account?</p>  
  <a id="sign-in">Sign in</a>`
}







function generateSignInForm(){
	return  `<form id="js-signin-form" class="signup-form">
      <fieldset>
        <legend>Sign In</legend>

        <label for="username">User Name</label>

        <input type="text" id="username" name="username" required class="js-product-list-entry" placeholder="Enter a user name">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required class="js-product-list-entry" placeholder="Enter your password">
      </fieldset>
      <button type="submit">Sign In</button>
    </form>`

}


function displaySigninForm(){
	$('#form-container').html(generateSignInForm())
	$('#error-container').empty()
	$('h1').text('Protek')
	$('h2').text('Sign in to post products')
	$('#logOutButton').addClass('hidden')
	$('.product-container').empty()
	$('#helpButton').addClass('hidden');
	// not working
}

function displaySignupForm(){
	
	$('#form-container').html(generateSignUpForm())
	$('#error-container').empty()
	$('h1').text('Protek')
	$('#logOutButton').addClass('hidden')
	$('.product-container').empty()
	$('#helpButton').removeClass('hidden');
	

}



function logOutHandler() {
	$('#logOutButton').click(doLogOut)
}


function addSignInSubmitHandler(){
	$('main').on('submit', '#js-signin-form', function(event){
		event.preventDefault();
		const username = $('#username').val(); 
		const password = $('#password').val();
		$('#username').val(""); 
		$('#password').val("");
		userName = username;
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
	$('#form-container').empty();
	$('#error-container').empty();
	user = response.authToken
	getAndDisplayProducts()
}

function doLogOut(){
	user = null
	displaySignupForm()
}

function doSignUp(response){
alert('Your signup was successfull, go ahead and log in');
}

function addSignUpSubmitHandler(){
	$('main').on('submit', '#js-signup-form', function(event){
		event.preventDefault();
		const username = $('#username').val(); 
		const password = $('#password').val();
		$('#username').val(""); 
		$('#password').val("");
		const login = {username, password};
		addUser(login, doSignUp, failure);
	});
}


function addToWishListHandler(){
		$('main').on('click', '.add-to-cart', function(event){
			console.log('add to was clicked');
			const id = event.currentTarget.dataset.id;
			// grab the product with id add to cart
			addToWishlist(id);
			
		});
		console.log('wish handler logged out');
}

// sucess and failure for the wish list

$(function(){
	addSignInSubmitHandler()
	addSignUpSubmitHandler()
	showSigninHandler()
	addToWishListHandler()
	logOutHandler()
	if (user){
		getAndDisplayProducts()
	} else  { 
		displaySignupForm()

	}


	});

