var twitter = {
	searchTerm : 'freekashmir',
	nbTweets : '4'
}	

twitter.convertDate = function (date,offset) {
				var d = new Date();
		var momentDate = moment(date, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en');
		var momentDateTimeStamp = momentDate.toDate().getTime();
		var ageTweet =  Math.round((d.getTime() - momentDateTimeStamp) / 1000); // en seconde
		if (ageTweet > 60) {
			return Math.round(ageTweet/60) + "min";
		}
		else{
			return ageTweet + "s";
		}

}

twitter.getTweets = function(){
	
	$ul = $('ul'),
    list='',
    url = 'http://localhost/MagicMirror/twitter/?count=' + this.nbTweets+"&q="+this.searchTerm;
    
    //var d = new Date();
	//if (d.getTime()-this.lastUpdate > 120*1000){
		$.ajax( {
	            type: "GET",
	            url: url,
	            dataType: "json",
	            cache: false,
	            success: function(data) { 
	            	//alert(url);

	            	table = $('<table/>').addClass('xsmall').addClass('calendar-table');
					opacity = 1;


					var row = $('<tr/>').css('opacity',opacity);
					row.append($('<td/>').html("<i class=\"fa fa-twitter \"></i> Ma timeline").addClass('description'));
					row.append($('<td/>').html("Twitter").addClass('days dimmed'));
					//row.append($('<td/>').html(data[tweet].created_at.split(" ")[3]).addClass('days dimmed'));
					table.append(row);	
					for (var tweet in data) {
						var age = this.convertDate(data[tweet].created_at, 0);
						//alert(age);
						
						//alert(data[tweet].text);
						var row = $('<tr/>').css('opacity',opacity);
						row.append($('<td/>').html(data[tweet].text+"<hr>").addClass('description'));
						row.append($('<td/>').html(data[tweet].user.name+" "+age).addClass('days dimmed'));
						//row.append($('<td/>').html(data[tweet].created_at.split(" ")[3]).addClass('days dimmed'));
						table.append(row);
						opacity -= 1 / this.nbTweets;
					}


					$('.calendar').updateWithTextSlide(table, 2000);
					//this.lastUpdate= d.getTime();
					
			    }.bind(this),
			    error: function(xhr, textStatus, err) {
			    	//alert("readyState: " + xhr.readyState+" responseText: "+ xhr.responseText+" status: " + xhr.status+" text status: " + textStatus+" error: " + err);
	        	}
	        }
	      );    
	
		// Eviter les requetes lors de l'attente de la premiere requete
		if (this.lastUpdate == '0') {
        	setTimeout(function(){},1500);
        }

	//}





}   
    