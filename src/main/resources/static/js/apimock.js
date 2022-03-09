//@author hcadavid

 var apimock=(function(){

	var mockdata=[];

	mockdata["johnconnor"]=	[{author:"johnconnor","points":[{"x":150,"y":120},{"x":215,"y":115}],"name":"house"},
	 {author:"johnconnor","points":[{"x":340,"y":240},{"x":15,"y":215}],"name":"gear"}];

	mockdata["maryweyland"]=[{author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"house2"},
	 {author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"gear2"}];

	 mockdata["David"]=[{author:"David","points":[{"x":20,"y":35},{"x":100,"y":115}],"name":"WallStreet"},
	 {author:"David","points":[{"x":69,"y":121},{"x":110,"y":125}],"name":"SagradaFamilia"},
	 {author:"David","points":[{"x":120,"y":21},{"x":77,"y":121}],"name":"Camp Nou"}];

	 mockdata["Nicolas"]=[{author:"Nicolas","points":[{"x":10,"y":135},{"x":10,"y":15},{"x":120,"y":15}],"name":"Obelisco"},
	 {author:"Nicolas","points":[{"x":110,"y":35},{"x":18,"y":15}],"name":"ECI"},
	 {author:"Nicolas","points":[{"x":122,"y":133},{"x":55,"y":66},{"x":130,"y":135}],"name":"Sabana"}];


	return {
		getBlueprintsByAuthor:function(authname,callback){
			callback(mockdata[authname]);
		},

		getBlueprintsByNameAndAuthor:function(authname,bpname,callback){

			callback(
				mockdata[authname].find(function(e){return e.name===bpname})
			);
		}
	}	

})();

/*
Example of use:
var fun=function(list){
	console.info(list);
}

apimock.getBlueprintsByAuthor("johnconnor",fun);
apimock.getBlueprintsByNameAndAuthor("johnconnor","house",fun);*/