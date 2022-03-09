var module = apiclient;
var app=(function(){
    //var module = apimock;

    var _author = null;
    var _plano = null;
    let puntos = null;

    function getBluePrintname(author){
        _author = author;
        if (_author == ""){
            alert("Escriba un nombre :v");
        }else{
           module.getBlueprintsByAuthor(_author,mapFunction);
        }
    };

    var mapFunction = function( variable){
        let puntos = 0;
        if(variable != null){
            let html = "<tr>";
            var arreglo = variable.map(function (blueprint) {
                html += "<td>" + blueprint.name
                html += "<td>" + blueprint.points.length
                html += "<td> <button type='button' class='btn btn-success' onclick='app.draw(\""+_author+"\",\""+blueprint.name+"\");'>Abrir Plano</button></td>"
                html+= "</tr>"
                puntos += blueprint.points.length;
                //console.log(html);  
                $('#tbody').html(html)    
            })
            $('#totalUserPoint').html("Total user points: " + puntos)

            /*No sirvio
            let total = variable.reduce(function(sum,num){
            
                return sum.points.length + num.points.length

                })*/
                
        }else{
            alert("No encontro al autor");
        }
    }

    function draw(author, name){
        module.getBlueprintsByNameAndAuthor(author,name,function ( blueprint){
            let canvas = $("#myCanvas")[0];

            let canvasd = canvas.getContext("2d");
            canvasd.clearRect(0, 0, canvas.width, canvas.height);
            canvasd.beginPath();

            console.log(blueprint)

            for (let i =1 ; i< blueprint.points.length; i++){
                canvasd.moveTo(blueprint.points[i-1].x,blueprint.points[i-1].y);
                canvasd.lineTo(blueprint.points[i].x,blueprint.points[i].y);
                canvasd.stroke();
            }

        })

    }

    return{
        getBluePrintname : getBluePrintname,
        draw: draw
    };

})();