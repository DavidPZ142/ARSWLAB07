var module = apiclient;
var app=(function(){
    //var module = apimock;

    var _author = null;
    var _plano = null;
    let puntos = null;
    let pointss =[];
    
    

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
            console.log(blueprint)
            app.drawNewPoints(blueprint.points);
            for (let i =1 ; i< blueprint.points.length; i++){
                canvasd.moveTo(blueprint.points[i-1].x,blueprint.points[i-1].y);
                canvasd.lineTo(blueprint.points[i].x,blueprint.points[i].y);
                canvasd.stroke();
            }

        })
    }
    function clearCanvas(){
        let canvas = $("#myCanvas")[0];
        let canvas2d = canvas.getContext("2d");
        canvas2d.clearRect(0,0,canvas.width,canvas.height);
        canvas2d.beginPath();
    }

    function init(){
        let canvas = $("#prueba")[0];
        let canvas2d = canvas.getContext("2d");
        if (window.PointerEvent){
            canvas.addEventListener("pointerdown",function(event){
                let offset = app.getOffset(canvas);
                x = event.pageX - offset.left;
                y = event.pageY - offset.top;
                console.log(x,y);
                pointss.push({
                    x:x,
                    y:y
                })
            
                
            })
            
            
        }
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
        let canvas = $("#prueba")[0];
        let canvasd = canvas.getContext("2d");
        for (let i =1 ; i< pointss.lenght; i++){
            canvasd.moveTo(pointss[i-1].x,pointss[i-1].y);
            canvasd.lineTo(pointss[i].x,pointss[i].y);
            canvasd.stroke();
        }


    }
    return{
        getBluePrintname : getBluePrintname,
        draw: draw,
        clearCanvas : clearCanvas,
        getOffset: getOffset,
        init: init,
        drawNewPoints : drawNewPoints
    };

})();