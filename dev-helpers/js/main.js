var ui;
$(function(){
	var SampleApp = window["sample-app"]
	$.getJSON("data/sample.json", function(data){
		// console.log('result:', data)
		ui = new SampleApp({
			dom_id : "#myApp",
			data : data
		})

		console.log(ui.getState().toJS())
	})
})