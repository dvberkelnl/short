(function(){
    var PostRequest = function(url){
	var http = new XMLHttpRequest();
	http.open('POST', url, true);
	http.setRequestHeader("Content-type", "application/json");
	http.setRequestHeader("Connection", "close")
	this.http = http;
    }
    PostRequest.prototype.send = function(parameters, callback){
	var json = JSON.stringify(parameters);
	var http = this.http;
	callback = callback || function(){};
	http.setRequestHeader("Content-length", json.length);
	http.onreadystatechange = function(){
	    if (http.readyState == 4 && http.status == 200) {
		callback.call(http.responseText);
	    }
	}
	http.send(json);
    }

    var input = document.getElementById('target');

    function shorten(){
	var target = input.value;
	var parameters = { 'target': target };

	new PostRequest(window.location.origin).send(parameters, function(){
	    console.log('posted');
	});
    }

    var button = document.getElementById('shorten');
    button.addEventListener('click', shorten);
})();
