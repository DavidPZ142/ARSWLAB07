var apiclient = (function (){

    return {
        getBlueprintsByAuthor: function (author, callback){
            //console.log(author)
            $.get("/v1/blueprint/"+author, function (data){

                callback( data);

            }).fail(function (){
                alert("Error");
            });
        },

        getBlueprintsByNameAndAuthor: function (author, name, callback){
            $.get("/v1/blueprint/"+author+"/"+name,function (data){
                callback(data)
            }).fail(function (){
                alert("Error");
            });
        }
    }


})();