(function(){
    var input = document.getElementById('target');

    function shorten(){
	var target = input.value;
	var params = "target=" + target;

	var http = new XMLHttpRequest();
	http.open('POST', window.location.origin, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.setRequestHeader("Content-length", params.length);
	http.setRequestHeader("Connection", "close")
	http.onreadystatechange = function(){
	    if (http.readyState == 4 && http.status == 200) {
		console.log('posted');
	    }
	}
	http.send(params);
    }

    var button = document.getElementById('shorten');
    button.addEventListener('click', shorten);
})();
