(function(){
    var PostRequest = function(url){
	var http = new XMLHttpRequest();
	http.open('POST', url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.setRequestHeader("Connection", "close")
	this.http = http;
    }
    PostRequest.prototype.send = function(params, callback){
	var http = this.http;
	callback = callback || function(){};
	http.setRequestHeader("Content-length", params.length);
	http.onreadystatechange = function(){
	    if (http.readyState == 4 && http.status == 200) {
		callback.call(http.responseText);
	    }
	}
	http.send(params);
    }

    var input = document.getElementById('target');

    function shorten(){
	var target = input.value;
	var params = "target=" + target;

	new PostRequest(window.location.origin).send(params, function(){
	    console.log('posted');
	});
    }

    var button = document.getElementById('shorten');
    button.addEventListener('click', shorten);
})();
