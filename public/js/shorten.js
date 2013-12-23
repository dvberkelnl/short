(function(){
    var input = document.getElementById('target');

    var button = document.getElementById('shorten');
    button.addEventListener('click', function(){
	console.log(input.value);
    });
})();
