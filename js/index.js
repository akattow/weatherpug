var weatherPhoto = {
	cloudy: "https://scontent.xx.fbcdn.net/v/t1.0-9/14237627_1151390654945759_5863466229506200890_n.jpg?oh=b583069e939825916059c570fb43ae26&oe=591607D9",
	sunny: "https://scontent.xx.fbcdn.net/v/t1.0-9/944007_1045807638837395_8749298699073196814_n.jpg?oh=c60c8fe7761040205fe7191930cdc94f&oe=59249274",
	cold: "https://scontent.xx.fbcdn.net/v/t31.0-8/p960x960/12377722_972171342867692_3213836645473206321_o.jpg?oh=41f085b97f45a6a2f33ab17f52118f6a&oe=58DCA746",
	snowy: "https://scontent.xx.fbcdn.net/v/t31.0-8/15626380_1252571304827693_4192852349412710848_o.jpg?oh=e0f416951ed33f1c8e2097af130b99b0&oe=591D9DFC",
	rainy: "https://scontent.xx.fbcdn.net/v/t1.0-9/12190965_948518655232961_5451649818047316633_n.jpg?oh=ea96536fb6087f5f7147bdf19db5b3f9&oe=591702AC",
	foggy: "https://scontent.xx.fbcdn.net/v/t31.0-8/p960x960/13735613_1113765832041575_785762881380760053_o.jpg?oh=d0138745fafdf70bf9dbac7781ec36ff&oe=59244392",
	panic: "https://scontent.xx.fbcdn.net/v/t1.0-9/946797_983020775116082_5753925804952337277_n.jpg?oh=03dd29ecdb8036dfa65cbd49c839905f&oe=58D89546",
	sleepy: "https://scontent.xx.fbcdn.net/v/t1.0-9/14202547_1140020386082786_4996343952956525404_n.jpg?oh=fa29c6c134ade747f5dd7578d34ec67b&oe=591D4029"
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
	$.getJSON("http://ipinfo.io", function(x) {
		var location = x.loc;
		var splitLoc = location.split(",");
		var latitude = Number(Number(splitLoc[0]).toFixed(2));
		var longitude = Number(Number(splitLoc[1]).toFixed(2));

		var city = x.city;
		var state = x.region;
		var country = x.country;

		$("#location").html(city + ", " + state + "  |  ");

			var apiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=%lat%&lon=%long%&APPID=527a4c21b597169e7cec5fce156297ef";
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
					$("#c").show();
					$("#f").hide();
				} else {
					$("#c").hide();
					$("#f").show();
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