function getProduct(id, success, error){
	const settings = {
		url: `/products/${id}`,
		dataType: 'json',
		type: 'GET',
		success,
		error
	}
console.log(settings.url)
	$.ajax(settings);

}

function displayProduct(product){
	$('.search-results').append(`
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
function searchHandler(){

$('#search-form').on('submit', function(event){
    event.preventDefault();
    let searchCriteria = $('#wish').val();
    $('.search-results').empty(); 
    $('#wish').val('');

    $.ajax({
        method : 'GET',
        url : `/users/${searchCriteria}/wishlist`,
        dataType : 'json',
        ContentType : 'application/json',
        success: function(data){
        	console.log(data);
        	data.forEach(function(item){
        		getProduct(item, displayProduct, function(err){
            console.error(err);
        })

        	});
	    },
        error : function(err){
            console.error(err);
            $('.search-results').html
            //needs to be styled
            ('<p>User not found, search again</p>');

        }

    });
})

}

$(searchHandler);

