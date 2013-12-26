function redirectTo(url) {
    return function(request, response){
	response.redirect(url);
    };
}

var redirecter = module.exports = {
    'root': redirectTo('/static')
}
