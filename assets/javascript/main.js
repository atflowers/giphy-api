var r = "";
var api = "https://api.giphy.com/v1/gifs/search?";
var apiKey = "&api_key=dc6zaTOxFJmzC";
var q = "q=ghostbusters";
var maxImg = 10;

// intial buttons
var gifOptions = ["classic sitcoms", "golden girls", "maude", "gunsmoke", "get smart", "webster", "growing pains"];

// background music
var maudeMusic = document.createElement('audio');
maudeMusic.setAttribute('src', 'assets/music/maude.mp3');


$( document ).ready(function() {

	maudeMusic.play();
	maudeMusic.addEventListener('ended', function() {
    	this.play();
    }, false);

	for(var i = 0; i < gifOptions.length; i++) {
		r = "<button type='button' name='" + gifOptions[i] + "' class='btnGiphy'>" + gifOptions[i] + "</button>";
		$("#buttons-container").append(r);
	}

	$("#buttons-container").on("click", "button", function(){
		var url = api + "q=" + this.name + "&limit=" + maxImg + "&rating=pg-13" + apiKey;
		$(".giphyImg").remove();
		$.getJSON(url, function(data){
			var u;
			//console.log(data);
			console.log(data.data[0].rating);
			for (var i = 0; i < maxImg; i++) {
				u = data.data[i].images.original.url;
				u = "<div class='giphyImg'><p>" + data.data[i].rating + "</p><img src='" + u + "' width='250' height='250'></div>";
				$("#giphy-container").append(u);
			}
		});
	});

	$("form").submit(function(event){
		event.preventDefault();
		r = $("input[name='newButtonName']").val();
		gifOptions.push(r);
		r = "<button type='button' name='" + r + "' class='btnGiphy'>" + r + "</button>";
    	$("#buttons-container").append(r);
    	loadButtons();
	});

});