var presence = {
	variable: '0',
	intervalId: null,
	TwitterlastUpdate: '0',
	TraficlastUpdate: '0'
};


presence.alertMessage = function () {
	alert("Pb");

	$('.compliment').updateWithText(this.variable, 1000);

}

presence.lireFichier = function(variable) {
	
	var d = new Date();
	
	$.ajax( {
            type: "GET",
            url: "python/_statusCam.txt",
            dataType: "html",
            cache: false,
            success: function(data) { 
            	//alert(data);
				if ( data == "INCONNU"){
					($('.compliment').updateWithText("", 1000));
					($('.trafic').updateWithText("", 1000));
					($('.news').updateWithText("", 1000));
					($('.calendar').updateWithText("", 1000));
					this.TraficlastUpdate = 0;
					this.TwitterlastUpdate = 0;
				}
				else{
					($('.compliment').updateWithText("Bonjour "+data, 1000));
					//trafic.lastUpdate = '0';
					//twitter.lastUpdate = '0';
					
					if (d.getTime()-this.TraficlastUpdate > 120*1000){
						trafic.getTraficBing();
						this.TraficlastUpdate= d.getTime();
					}
					if (d.getTime()-this.TwitterlastUpdate > 60*1000){
						twitter.getTweets();
						this.TwitterlastUpdate= d.getTime();
					}
				}
		    }.bind(this)
        }
      );    
      return variable;  
}

presence.init = function () {

	this.intervalId = setInterval(function () {
		var res = this.lireFichier();		
	}.bind(this), 500);

}