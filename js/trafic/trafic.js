var trafic = {
	variable: 'test',
	intervalId: null,
	temps: '',
	distance: '',
	bouchon: ''
};


trafic.alertMessage = function () {

	//alert("yyyyy");

	$('.news').updateWithText(this.variable, 1000);

}

trafic.getTraficGoogle = function() {


	//var origin1 = new google.maps.LatLng(55.930385, -3.118425);
	var origin1 = "23 avenue leonard de vinci, Courbevoie France";
	var destinationA = "12 avenue jean baptiste busnel, blanc mesnil France";
	//var destinationB = new google.maps.LatLng(50.087692, 14.421150);

	var service = new google.maps.DistanceMatrixService();
	service.getDistanceMatrix(
	  {
	    origins: [origin1],
	    destinations: [destinationA],
	    travelMode: google.maps.TravelMode.DRIVING,
	    durationInTraffic: true,
	    avoidHighways: false,
	    avoidTolls: false,
	  }, callback);

	function callback(response, status) {
	  var duree;
	  var dist;

	  if (status == google.maps.DistanceMatrixStatus.OK) {
	    var origins = response.originAddresses;
	    var destinations = response.destinationAddresses;

	    for (var i = 0; i < origins.length; i++) {
	      var results = response.rows[i].elements;
	      for (var j = 0; j < results.length; j++) {
	        var element = results[j];
	        var distance = element.distance.text;
	    	var duration = element.duration.text;
	        
	        var from = origins[i];
	        var to = destinations[j];
	        dist = distance;
	        duree = duration;
	      
	      }
	    }
	    $('.news').updateWithText("Il vous faut <b>"+duree+" </b>pour vous rendre au Blanc-Mesnil", 3000);
	  }

	}
	
	//alert('e');

	/*$.ajax( {
            type: "GET",
            url: "https://maps.googleapis.com/maps/api/distancematrix/json?origins=23+avenue+leonard+de+vinci+Courbevoie+France&destinations=12+avenue+jean+baptiste+busnel+blanc+mesnil+france&language=fr-FR&key=AIzaSyBWLLS27R-JtJ_jyNMObFu68b68ZnaubAM",
            dataType: "jsonp",
            cache: false,
            success: function(data) { 
            	
            	alert("aaaa");
				if ( data == "INCONNU"){
					//($('#corps')).fadeOut("slow");
					($('.news').updateWithText("HOLA "+data, 1000));
				}
				else{
					//($('#corps')).fadeIn("slow");
					//($('.news').updateWithText("HOLA "+data, 1000));

				}
		    }.bind(this),
		    error: function(xhr, textStatus, err) {

		    	alert("readyState: " + xhr.readyState);
			    alert("responseText: "+ xhr.responseText);
			    alert("status: " + xhr.status);
			    alert("text status: " + textStatus);
			    alert("error: " + err);
		    	
        	}
			}
        
      );    */
       
}

trafic.getTraficBing = function () {

	//var d = new Date();
	//	alert(d.getTime()-this.lastUpdate);
	//if (d.getTime()-this.lastUpdate > 120*1000){
		//alert("a");
		$.ajax({
            type: "GET",
            url: "http://dev.virtualearth.net/REST/V1/Routes?wp.0=23 avenue leonard de vinci, Courbevoie France,France&wp.1=12 avenue jean baptiste busnel Blanc-mesnil,France&optmz=timeWithTraffic&key=AiUWKDScRsS5LX8B5y5dRcSJQ2kv_BZmuuhR5C9YcLkl7y3rdOaujmBvnsUg0WJ0&callback=",
            dataType: "jsonp",
            cache: false,
            jsonp: "jsonp",
            success: function(data) { 
				if (data){
					
        			this.bouchon = data.resourceSets[0].resources[0].trafficCongestion;
        			this.temps = data.resourceSets[0].resources[0].travelDurationTraffic;
        			this.distance = data.resourceSets[0].resources[0].travelDistance;
        			
        			//alert(this.temps);
        			var minute = Math.round(this.temps/60);
					($('.trafic').updateWithText("<b>"+minute+" min </b>pour rentrer à BM"
						+ " [" + Math.round(this.distance*10)/10 + "km"
						+ " ~ "+ this.bouchon + "]", 4000));
					//alert("b");
					//this.lastUpdate= d.getTime();
					//alert(this.lastUpdate);
				}
		    }.bind(this),
		    error: function(xhr, textStatus, err) {
		    	//alert("readyState: " + xhr.readyState+" responseText: "+ xhr.responseText+" status: " + xhr.status+" text status: " + textStatus+" error: " + err);
        	}
        });
		
		// Eviter les requetes lors de l'attente de la premiere requete
        if (this.lastUpdate == '0') {
        	setTimeout(function(){},1000);
        }
	//}
}


trafic.init = function () {
	//alert("aaaa");
	var res = this.getTraficBing();	
	/*this.intervalId = setInterval(function () {
		var res = this.getTrafic();		
	}.bind(this), 1000*60);*/
}