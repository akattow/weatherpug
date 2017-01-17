var weatherPhoto = {
	cloudy: "https://kattow88.github.io/weatherpug/assets/cloudy.jpg",
	sunny: "https://kattow88.github.io/weatherpug/assets/sunny.jpg",
	cold: "https://kattow88.github.io/weatherpug/assets/cold.jpg",
	snowy: "https://kattow88.github.io/weatherpug/assets/snowy.jpg",
	rainy: "https://kattow88.github.io/weatherpug/assets/rainy.jpg",
	foggy: "https://kattow88.github.io/weatherpug/assets/foggy.jpg",
	panic: "https://kattow88.github.io/weatherpug/assets/panic.jpg",
	sleepy: "https://kattow88.github.io/weatherpug/assets/sleepy.jpg"
};

var weatherQuote = {
	cloudy: '“Cloudy with a chance of staying in all night.”',
	sunny: '“My rolls look good in the sun”',
	cold: '“Me when it\'s cold out”',
	snowy: '"The snow brings out my inner diva”',
	rainy: '“Why does it always have to rain when I\'m having a good hair day”',
	foggy: '“Of course I did my hair today‬”',
	panic: '“Can we just stay in and cuddle?”',
	sleepy: '“If u love me let me sleep”'
};



function getWeather() {
	$.getJSON("https://ipinfo.io", function(x) {
		var location = x.loc;
		var splitLoc = location.split(",");
		var latitude = Number(Number(splitLoc[0]).toFixed(2));
		var longitude = Number(Number(splitLoc[1]).toFixed(2));

		var city = x.city;
		var state = x.region;
		var country = x.country;

		$("#location").html(city + ", " + state + "  |  ");

			var apiUrl = "https://kattow.com/proxy/?lat=%lat%&lon=%long%&APPID=527a4c21b597169e7cec5fce156297ef";
			var urlLat = apiUrl.replace("%lat%", latitude);
			var urlLatLong = urlLat.replace("%long%", longitude);

			$.getJSON(urlLatLong, function(y) {
				var weatherDescription = y.weather[0].description;

				$("#description").html(weatherDescription);

				tempKelvin = y.main.temp;
				tempFahrenheit = Math.round(Number((((9 * (tempKelvin - 273.15)) /5) + 32).toFixed(2)));
				tempCelsius = Math.round(Number((((tempFahrenheit - 32) * 5) / 9).toFixed(2)));

				$("#c").html(tempCelsius + "°C");
				$("#f").html(tempFahrenheit + "°F");
				
				if (x.country === "US") {
					$("#f").show();
					$("#c").hide();
				} else {
					$("#f").hide();
					$("#c").show();
				}

				function changePug(z) {
					$("#dougPic").css("background-image", "url(" + weatherPhoto[z] + ")");
					$("#dougQuote").html(weatherQuote[z]);
				}

				var id = y.weather[0].id.toString();
				var date = new Date()
				var hour = date.getHours();
				
				if (hour <= 7 || hour >= 19) {
					changePug("sleepy");
				} else {
					switch (id[0]) {
						case "6":
							changePug("snowy");
							break;
						case "7":
							if (id[2] == 8) {
								changePug("panic");
							} else {
								changePug("foggy");
							}
							break;
						case "8":
							if ( id[2] != 0) {
								changePug("cloudy");
							} else {
								changePug("sunny");
							}
							break;
						case "9":
							if (id[2] == 3) {
								changePug("cold");
							} else if (id[2] == 4) {
								changePug("sunny");
							} else {
								changePug("panic");
							}
							break;
						default:
							changePug("rainy");
							break;
					} //switch	
				}
			}); //weather api call
	}); //ip call
} //getWeather

getWeather();

$("#c").click(function() {
	$("#c").hide();
	$("#f").show();
});

$("#f").click(function() {
	$("#c").show();
	$("#f").hide();
});

$("#dougPic").mouseenter(function() {
	$("#dougHover").show();
	$("#dougPic").hide();
});

$("#dougHover").mouseleave(function() {
	$("#dougPic").show();
	$("#dougHover").hide();
});
