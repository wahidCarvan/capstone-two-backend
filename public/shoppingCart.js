
let cart = [];

function addToCart(product){
	// pushing the products being added to the cart
	cart.push(product);
	//storing the items to local storage using strings
	localStorage.setItem('cart', JSON.stringify(cart))
	renderCart();
};

//saving the items from the cart to the local storage
$(document).ready(function(event){
	const str = localStorage.getItem('cart');
	cart = str ? JSON.parse(str) : []; 
	console.log(cart);
	renderCart();
});

function renderCart() {
$('.total').html(
`<div>
      <h4>Cart 
        <span class="price" style="color:black">
          <i class="fa fa-shopping-cart"></i> 
          <b>${cart.length}</b>
        </span>
      </h4>
      ${cart.map(item =>`<p><a href="#">${item.name}</a> <span class="price">$${item.price}</span></p>
	`).join('')}
      <hr>
      <p>Total 
      	<span class="price" style="color:black">
      		<b>$${cart.reduce((sum, item) => sum + item.price, 0)}</b>
      	</span>
      </p>
 </div>`
 )
};
// .reduce() adds the cart total takes 2 params first is the accumulator 
//the second is the value which should always be zero
//.reduce ittirates through the array
//val is the first element in the array
//acc is the 0 val is the elemenet in the array
// each time something is returned the value for acc is updated
// .join turns the array in to  a string without commas

// fix the css in the css file





products.forEach((product, index) => {
		$('#product-details').append(`
			<div class="col-3">
				<div class="card">
					<img src="http://via.placeholder.com/350x150" alt="place holder image"/>
				 	<h5 class="card-title">${product.name}</h5>
					<div class="card-body">
					    <p class="card-text">
					    <span class="strikethrough-price">$99.99</span>
					    <br>
					    <span class="our-price">$${product.price}</span></p>
					    	<button class="add-to-cart" data-id="${index}">Add to Cart</button>
					</div>
				</div>
			</div>
			
		`);
	});
