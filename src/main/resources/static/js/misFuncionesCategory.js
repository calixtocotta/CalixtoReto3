/* global fetch */

//function traerInformacion(){location.reload(true);}
//Función para actualizar cada 60 segundos(60000 milisegundos)
//setInterval("traerInformacion()",60000);

function traerInformacion(){
    $("#resultado").html("<p class='loader text-center'>Cargando...</p>");
    $.ajax({
        url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //console.log(respuesta);
            
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(items){
    let myTable="<table id='informacion'>";
    let tableHeader = `<thead><tr>
    <th>NOMBRE</th>
    <th>DESCRIPCIÓN</th>
    <th></th>
    </thead></tr>`;
    myTable += tableHeader;

   
    for (i=0; i<items.length; i++ ) {
        
        myTable+="<tr>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].description+"</td>";
        myTable+="<td> <button class='mx-auto btn-danger btn-gradient' onclick='borrarElemento("+items[i].id+")'>Borrar</button> <button class='mx-auto btn-danger btn-gradient' onclick='recuperarInformacion("+items[i].id+")'>Editar</button> </td>";
        // + items[i].name + items[i].email + items[i].age
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").html(myTable);
}

function recuperarInformacion(id){
    let idUsuario = id;
    $.ajax({
        url:"https://g8f8de2cd8423f5-dbreto1.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaU){
            
            informacion(idUsuario,respuestaU.items);
            
            
        }
    });  
}

function informacion(idU,itemsU){
    for (i=0; i<itemsU.length; i++ ) {
        if (idU == itemsU[i].id){
            $(".idU").val(itemsU[i].id),
            $(".nameU").val(itemsU[i].name),
            $(".emailU").val(itemsU[i].email),
            $(".ageU").val(itemsU[i].age)
        }
    }
}

function validar(opcion){
    if ($('#name').val().length == 0 || $('#description').val().length == 0) {
        console.log($('#name').val());
        console.log($('#description').val());
        $("#validarCampos").html("<h4 style='color: red'>Todos los campos son necesarios</h4>");
        return false;
    }else{
        if (opcion == 1){
            $("#validarCampos").html("<p class='loader text-center' style='color: green'>Guardando...</p>");
            setTimeout(
                function(){ 
                    guardarInformacion(); ;
                }, 6000
            );
        }else{
            $("#validarCampos").html("<p class='loader text-center' style='color: blue'>Actualizando...</p>");
            setTimeout(
                function(){ 
                    editarInformacion(); ;
                }, 6000
            );
        }
    }
};

function guardarInformacion(){
    let myData={
        name:$("#name").val(),
        email:$("#description").val()
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url: "http://localhost:8080/api/Category/save",
        type: "POST",
        data: dataToSend,
        contentType:"application/JSON",
        datatype: "JSON",
        success:function(respuesta){
            $(".registro").val(""),
            $("#validarCampos").html("<h4 style='color: green'>Se ha registrado exitosamente</h4>");
            setTimeout(
                function(){ 
                    document.getElementById("validarCampos").innerHTML = "";
                }, 6000
                );
            traerInformacion();
        },
        error: function(respuesta) {
            //console.log(respuesta);
            //console.log(respuesta.abort.name);
            if(respuesta.abort.name=="abort"){
                $("#validarCampos").html("<h4 style='color: red'>Ha ocurrido un error " + respuesta.status +"</h4>");
            }else{
                $("#validarCampos").html("<h4 style='color: red'>El usuario ya se encuentra registrado</h4>");
            }
        },
    });
    
}

function editarInformacion(){
    
    let myDataEditar={
        id:$("#id").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val(),
    };
    let dataToSendE=JSON.stringify(myDataEditar);

    $.ajax({
        url:"https://g8f8de2cd8423f5-dbreto1.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type:"PUT",
        data:dataToSendE,
        contentType:"application/JSON",
        dataType:"JSON",
        //async: false,
        success:function(respuestaE){
            $("#resultado").empty();
            $("#id").val(""),
            $("#name").val(""),
            $("#email").val(""),
            $("#age").val(""),
            $("#validarCampos").html("<h4 style='color: green'>Se ha actualizado exitosamente</h4>");
            setTimeout(
                function(){ 
                    document.getElementById("validarCampos").innerHTML = "";
                }, 6000
                );
            traerInformacion();
        },
        error:function(respuestaE) {
            console.log(respuestaE);
            $("#validarCampos").html("<h4 style='color: red'>El usuario no se encuentra registrado</h4>");
        },
    });
}

function borrarElemento(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "https://g8f8de2cd8423f5-dbreto1.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type: "DELETE",
        data: dataToSend,
        contentType:"application/JSON",
        dataType: "JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacion();
            alert("Se la eliminado con exito.");
        }
    });
}


