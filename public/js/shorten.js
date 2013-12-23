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
		var json = JSON.parse(http.responseText);
		callback.call(null, json);
	    }
	}
	http.send(json);
    }

    var origin = window.location.origin;
    var input = document.getElementById('target');
    var output = document.getElementById('output');

    function showLinkFor(key) {
	var url = origin + '/' + key;
	var link = document.createElement('a');
	link.setAttribute('href', url);
	link.textContent = url;
	output.replaceChild(link, output.children[0]);
    }

    function shorten(){
	var target = input.value;
	var parameters = { 'target': target };

	new PostRequest(origin).send(parameters, function(result){
	    input.value = '';
	    showLinkFor(result.key);
	});
    }

    var button = document.getElementById('shorten');
    button.addEventListener('click', shorten);
})();
