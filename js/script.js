$(function(){
			
	//$('select#valueAA, select#valueBB').hide();
		$('select#valueAA, select#valueBB').selectToUISlider().bind("slide", function(event,ui) {
		console.log(ui.values);
		var vals = ui.values;
		updateThis(Math.abs(vals[1]-5), Math.abs(vals[0]-5));
		//$('h1').text( "VALUES ARE " + selectedIdsStr );
	});

	
	$('#input-search').on('click', function(){
		var $this = $(this);
		var oText = $this.text();
		$this.css('color', '#000');
		if($this.val() == "See what's trending now")
			$this.val('');
	});
	
	//fix color 
	fixToolTipColor();
});
//purely for theme-switching demo... ignore this unless you're using a theme switcher
//quick function for tooltip color match
function fixToolTipColor(){
	//grab the bg color from the tooltip content - set top border of pointer to same
	$('.ui-tooltip-pointer-down-inner').each(function(){
		var bWidth = $('.ui-tooltip-pointer-down-inner').css('borderTopWidth');
		var bColor = $(this).parents('.ui-slider-tooltip').css('backgroundColor')
		$(this).css('border-top', bWidth+' solid '+bColor);
	});	
}

function getTheDate(val){
	var m_names = new Array("January", "February", "March",
		"April", "May", "June", "July", "August", 
		"September", "October", "November", "December");

	var d = new Date();
	//var curr_date = d.getDate() xs- val;
	var curr_month = d.getMonth();
	var curr_year = d.getFullYear();
	//document.write(curr_date + "-" + m_names[curr_month] + "-" + curr_year);
	//alert(curr_date + "-" + m_names[curr_month] + "-" + curr_year)
}