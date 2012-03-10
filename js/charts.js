var chart;

var arrayDays = ["Today", "Yesterday", "Two Days Ago", "Three Days Ago", "Four Days Ago", "Five Days Ago"];

var buses;

var term;

var mainWord = "";

//$(document).ready(function() {
  //  drawThis(0, 5);
//});

function updateThis(start, end) {
	if (typeof buses !== "undefined") 
      {
					$('#mainWord').empty();
					$("#wordcloud").empty();
					var totalpos = 0;
					var totalneg = 0;
					
					var catags = [];
                       		
                       		for (i=end; i>=start; i--)
                       		{	
                       			//catags.push(buses.obj.days[i].day);
                       			catags.push(arrayDays[i]);
                       		}
                       		
                       		var posArr = new Array();
                       		var negArr = new Array();
                       		var neuArr = new Array();
                       		
                       		for (k=end; k>=start; k--)
                       			{
                       			posArr.push(buses.obj.days[k].pos);
                       			totalpos = totalpos + buses.obj.days[k].pos;
                       			negArr.push(buses.obj.days[k].neg);
                       			totalneg = totalneg + buses.obj.days[k].neg;
                       			neuArr.push(buses.obj.days[k].total - buses.obj.days[k].neg - buses.obj.days[k].pos);
                       			}
                       		
                       				
                       		Highcharts.setOptions({
                                colors: ['#17B5D1', '#D5CDC8', '#3D0E42']
                            });

							chart = new Highcharts.Chart({
								chart: {
									renderTo: 'graph',
									type: 'column'
								},
								title: {
									text: term + ' Sentiment Analysis'
								},
								xAxis: {
									categories: catags
								},
								yAxis: {
									min: 0,
									title: {
										text: '% of social media mentions'
									}
								},
								tooltip: {
									formatter: function() {
										return ''+
											this.series.name +': ' +' ('+ Math.round(this.percentage) +'%)';
									}
								},
								plotOptions: {
									column: {
										stacking: 'percent'
									}
								},
									series: [{
									name: 'Pos',
									data: posArr
								}, {
									name: 'Neu',
									data: neuArr
								}, {
									name: 'Neg',
									data: negArr
								}]
							});//end of chart
						
		var word_list = [];
        var word;
        var tempCount = 0;
        var tempInd = 0;
        var posneg = "";
        var tmpmainWord = "";
        
     if (totalneg > totalpos)  
       {
			posneg = "neg";
			for(var b = 0 ; b < buses.obj.negWords.length ; b++) {
				if (tempCount < buses.obj.negWordsCount[b] && buses.obj.negWords[b] != mainWord) 
				{
					tempCount=buses.obj.negWordsCount[b];
					tempIndex = b;
				}
			}
			mainWord = buses.obj.negWords[tempIndex];
			
			var stop = 25;
			if (buses.obj.negWords.length < 25)
				stop = buses.obj.negWords.length;
			
			for(var a = 0; a < stop; a++){
				word = {text: buses.obj.negWords[a], weight: parseInt(buses.obj.negWordsCount[a])};
				word_list.push(word);
			}

        }
    else
    	{
    		posneg = "pos";
			for(var b = 0 ; b < buses.obj.posWords.length ; b++) {
				if (tempCount < buses.obj.posWordsCount[b]  && buses.obj.posWords[b] != mainWord) 
				{
					tempCount=buses.obj.posWordsCount[b];
					tempIndex = b;
				}
			}
			mainWord = buses.obj.posWords[tempIndex];
			
			
			var stop = 25;
			if (buses.obj.posWords.length < 25)
				var stop = buses.obj.posWords.length;
			
			
			for(var a = 0; a < stop; a++){
				word = {text: buses.obj.posWords[a], weight: parseInt(buses.obj.posWordsCount[a])};
				word_list.push(word);
			}

        }
    	
    	
    	
    	
    	
		 //$('#mainWord').append(posneg + ' ' + mainWord);
         $("h1").text(mainWord);
         $("#wordcloud").jQCloud(word_list);

	}
}

function drawThis() {
    $('#mainWord').empty();
    $("#wordcloud").empty();
    var start = 0;
    var end = 5;
    term = $('#input-search').val();
    
 var totalpos = 0;
 var totalneg = 0;
 var req = new XMLHttpRequest();
       if (term=="Funeral Kings")
       		req.open("GET", "funkings.json", true);
       else if (term=="21 Jump Street")
       		req.open("GET", "21jump.json", true);
       else if (term=="Sleepwalk with Me")
       		req.open("GET", "sleepwalk.json", true);
       else	
       	{
       		$("h1").text("We are in BETA.  Search may take some time.");
       		req.open("GET", "../search.php?startdate=0&enddate=-5&term=" + encodeURIComponent(term), true);
		}       	
       req.onreadystatechange = function() {
               
               if (req.readyState == 4) {
                       if (req.status == 200) {
                       		buses = JSON.parse(req.responseText);
                       		var catags = [];
                       		for (i=end; i>=start; i--)
                       		{	
                       			//catags.push(buses.obj.days[i].day);
                       			catags.push(arrayDays[i]);
                       		}
                       		
                       		var posArr = new Array();
                       		var negArr = new Array();
                       		var neuArr = new Array();
                       		
                       		for (k=end; k>=start; k--)
                       			{
                       			posArr.push(buses.obj.days[k].pos);
                       			totalpos = totalpos + buses.obj.days[k].pos;
                       			negArr.push(buses.obj.days[k].neg);
                       			totalneg = totalneg + buses.obj.days[k].neg;
                       			neuArr.push(buses.obj.days[k].total - buses.obj.days[k].neg - buses.obj.days[k].pos);
                       			}
                       		
                       				
                       		Highcharts.setOptions({
                                colors: ['#17B5D1', '#D5CDC8', '#3D0E42']
                            });

							chart = new Highcharts.Chart({
								chart: {
									renderTo: 'graph',
									type: 'column'
								},
								title: {
									text: term +' Sentiment Analysis Chart'
								},
								xAxis: {
									categories: catags
								},
								yAxis: {
									min: 0,
									title: {
										text: '% of social media mentions'
									}
								},
								tooltip: {
									formatter: function() {
										return ''+
											this.series.name +': ' +' ('+ Math.round(this.percentage) +'%)';
									}
								},
								plotOptions: {
									column: {
										stacking: 'percent'
									}
								},
									series: [{
									name: 'Pos',
									data: posArr
								}, {
									name: 'Neu',
									data: neuArr
								}, {
									name: 'Neg',
									data: negArr
								}]
							});//end of chart
						
		var word_list = [];
        var word;
        var tempCount = 0;
        var tempInd = 0;
        var posneg = "";
        
     if (totalneg > totalpos)  
       {
			posneg = "neg";
			for(var b = 0 ; b < buses.obj.negWords.length ; b++) {
				if (tempCount < buses.obj.negWordsCount[b]) 
				{
					tempCount=buses.obj.negWordsCount[b];
					tempIndex = b;
				}
			}
			mainWord = buses.obj.negWords[tempIndex];
			
			var stop = 25;
			if (buses.obj.negWords.length < 25)
				stop = buses.obj.negWords.length;
			
			for(var a = 0; a < stop; a++){
				word = {text: buses.obj.negWords[a], weight: parseInt(buses.obj.negWordsCount[a])};
				word_list.push(word);
			}

        }
    else
    	{
    		posneg = "pos";
			for(var b = 0 ; b < buses.obj.posWords.length ; b++) {
				if (tempCount < buses.obj.posWordsCount[b]) 
				{
					tempCount=buses.obj.posWordsCount[b];
					tempIndex = b;
				}
			}
			mainWord = buses.obj.posWords[tempIndex];
			
			
			var stop = 25;
			if (buses.obj.posWords.length < 25)
				var stop = buses.obj.posWords.length;
			
			
			for(var a = 0; a < stop; a++){
				word = {text: buses.obj.posWords[a], weight: parseInt(buses.obj.posWordsCount[a])};
				word_list.push(word);
			}

        }
    	
    //	$('select#valueAA, select#valueBB').show();
    	
    	
		 //$('#mainWord').append(posneg + ' ' + mainWord);
         $("h1").text(mainWord);
         //$("h1").(mainWord);
         
         $("#wordcloud").jQCloud(word_list);
        // $("#wordcloudneg").jQCloud(neg_word_list);

													
				        	}
               			}
               	
       };

       req.send();
    
    
    
    
        
    
}
