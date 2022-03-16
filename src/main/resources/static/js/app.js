var module = apiclient;
var app=(function(){
    //var module = apimock;

    let _author = null;
    let _plano = null;
    let puntos = null;
    let hola = null;
    let anterior =[];

    function init(){
        let canvas = $("#myCanvas")[0];

        if (window.PointerEvent) {
            canvas.addEventListener("pointerdown", function (event) {
                let offset = app.getOffset(canvas);
                x = event.pageX - offset.left;
                y = event.pageY - offset.top;
                console.log(x, y);
                anterior.push({
                    x: x,
                    y: y
                })
                app.drawNewPoints(anterior);

            })
        }
    }


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
                $('#tbody').html(html)    
            })
            $('#totalUserPoint').html("Total user points: " + puntos)
            $('#currentauthor').html(_author + "'s Blueprints")

            /*No sirvio
            let total = variable.reduce(function(sum,num){
            
                return sum.points.length + num.points.length

                })*/
                
        }else{
            alert("No encontro al autor");
        }
    }

    function draw(author, name){
        _author = author;
        _plano = name;
        module.getBlueprintsByNameAndAuthor(_author,_plano,function ( blueprint){
            let canvas = $("#myCanvas")[0];
            let canvasd = canvas.getContext("2d");
            app.clearCanvas();

            anterior = blueprint.points
            for (let i =1 ; i< blueprint.points.length; i++){

                canvasd.moveTo(blueprint.points[i-1].x,blueprint.points[i-1].y);
                canvasd.lineTo(blueprint.points[i].x,blueprint.points[i].y);
                canvasd.stroke();
            }

            $('#currenBlueprint').html("Current blueprint : " + _plano);

        })
    }
    function clearCanvas(){
        let canvas = $("#myCanvas")[0];
        let canvas2d = canvas.getContext("2d");
        canvas2d.clearRect(0,0,canvas.width,canvas.height);
        canvas2d.beginPath();
    }


    /*Esta función se encuentra en el foro del laboratorio*/
    function getOffset(obj){
            let offsetLeft = 0;
            let offsetTop = 0;
            do {
                if (!isNaN(obj.offsetLeft)) {
                    offsetLeft += obj.offsetLeft;
                }
                if (!isNaN(obj.offsetTop)) {
                    offsetTop += obj.offsetTop;
                }
            } while(obj = obj.offsetParent );
            return {left: offsetLeft, top: offsetTop};
    }

    function drawNewPoints(pointss){

        let canvas = $("#myCanvas")[0];
        let canvasd = canvas.getContext("2d");

        canvasd.moveTo(pointss[pointss.length-2].x,pointss[pointss.length-2].y);
        canvasd.lineTo(pointss[pointss.length-1].x,pointss[pointss.length-1].y);
        canvasd.stroke();
    }


    function  putBlueprints(){

        module.putBlueprints(_author,_plano,anterior)
            /*PRomesa cumple papel de callback*/
            .then(function (data){
                //mapFunction();
                getBluePrintname(_author,mapFunction)
            });
    }

    function addBlueprint(name){
        if (name == ""){
            alert("Ingrese nombre del plano")
        }
        else {


            app.clearCanvas();
            let blueprint = {
                author: _author,
                name: name,
                points: anterior
            };

            module.addBlueprints(blueprint)
                .then(function () {
                    app.getBluePrintname(_author, mapFunction);
                })


        }

    }

    function deleteBlueprint(){
        if (_author != ""){
            module.deleteBlueprint(_author,_plano)
                .then(function (){
                    app.clearCanvas();
                    app.getBluePrintname(_author)
                })

        }
    }



    return{
        getBluePrintname : getBluePrintname,
        draw: draw,
        clearCanvas : clearCanvas,
        getOffset: getOffset,
        init: init,
        drawNewPoints : drawNewPoints,
        putBlueprints: putBlueprints,
        addBlueprint: addBlueprint,
        deleteBlueprint: deleteBlueprint
    };

})();