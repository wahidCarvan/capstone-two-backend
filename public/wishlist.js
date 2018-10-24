
//
function addSearchFromHandler() {
	$('form').submit(function(event){
		event.preventDefault()
		const userInput =$('#wish').val()
		//call get wish list error function user not found
		//success needs to be a console log.
		//forEach the success what comes back from api to get products
		//in get product its success needs to be the display product
		//get all a list of product id 
		// for each the list and run get product on each ones
		// success call back for each product will be display product
		// console.log step by step
	})
}


function getWishList(username, success, error){
	const settings =  {
		url: `/users/${username}/wishlist`,
		dataType: 'json',
		type: 'GET',
		success,
		error
	}
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

function displayProduct(product){

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
		</div>
		</div>
		</div>`);

}

// semantic html 
// line 42 on wish html it needs to be added to where to go




//TRYING TO DISPLAY THE SEARCH RESULTS TOT THE SCREEN
// SEARCH FORM
$('.search-wishlist').on('submit', function(event){
    event.preventDefault();
    let searchCriteria = $('#wish').val(); 
    $.ajax({
        method : 'GET',
        url : '/products/',
        data : {
        searchText : searchCriteria
        },
        dataType : 'json',
        ContentType : 'application/json',
        success: function(data){

	        let newHTML = "";

	        for (let i = 0; i < data.length; i ++){
	            newHTML += `
	                    <div class="card">
	                    		<img class="card-image" src="${data[i].image}"/>
	                            <h1 class="cardName"> ${data[i].name} </h1>
	                            <p class="cardDescriptyion"> ${data[i].description} </p>
	                            <p class="cardPrice"> ${data[i].price} </p>
	                     </div>
	                        `;
	        }

	        $('.search-wishlist').html(newHTML);

	    },
        error : function(err){
            console.log(err);
        }
    });
})



function watchSubmit() {
  $('.search-wishlist').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query);
  });
}

$(watchSubmit);
