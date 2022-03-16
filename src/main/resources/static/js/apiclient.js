var apiclient = (function (){

    return {
        getBlueprintsByAuthor: function (author, callback) {

            $.get("/v1/blueprint/" + author, function (data) {
                callback(data);
            }).fail(function () {
                alert("Error");
            });
        },

        getBlueprintsByNameAndAuthor: function (author, name, callback) {
            $.get("/v1/blueprint/" + author + "/" + name, function (data) {
                callback(data)
            }).fail(function () {
                alert("Error");
            });
        },

        addBlueprints: function (blueprint) {
            return $.ajax({
                url: "/v1/blueprint",
                type: 'POST',
                data: JSON.stringify(blueprint),
                contentType: "application/json"
            }).fail(function () {
                alert("No se puede crear con un blueprint seleccionado")

            });
        },


        putBlueprints :function (author,name,points){

            return $.ajax({
                url: "/v1/blueprint/"+author+"/"+name,
                type: 'PUT',
                data: JSON.stringify({author:author, name:name, points:points}),
                contentType: "application/json"
            }).fail(function (){
                console.log("Error");
            });
        },

        deleteBlueprint:function (author,name){

            return $.ajax({
                url: "/v1/blueprint/"+author+"/"+name,
                type: "DELETE"

            }).fail(function (){
                console.log("Error en delete")
            })
        }
    }

}) () ;