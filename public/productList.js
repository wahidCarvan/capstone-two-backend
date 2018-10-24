//cb means call back
function getProducts(cb) {	
	$.get('/products', function(data){
	  cb(data)
	});
	
};
























