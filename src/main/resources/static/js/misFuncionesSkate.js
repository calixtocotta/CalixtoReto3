function traerInformacion(){location.reload(true);}
//Función para actualizar cada 4 segundos(4000 milisegundos)
  setInterval("traerInformacion()",60000);

function traerInformacion(){
    $("#resultado").html("<p class='loader text-center'>Cargando...</p>"); 
    $.ajax({
        url:"https://g8f8de2cd8423f5-dbreto1.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/skate/skate",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta.items);
        }
    });
}

function pintarRespuesta(items){
    $("#informacion").remove();
    let myTable="<table id='informacion'>";
    let tableHeader = `<thead><tr>
    <th>ID</th>
    <th>BRAND</th>
    <th>MODEL</th>
    <th>CATEGORY_ID</th>
    <th>NAME</th>
    <th></th>
    </thead></tr>`;
    myTable += tableHeader;


    for (i=0; i<items.length; i++ ) {
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].brand+"</td>";
        myTable+="<td>"+items[i].model+"</td>";
        myTable+="<td>"+items[i].category_id+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td> <button class='mx-auto btn-danger btn-gradient' onclick='borrarElemento("+items[i].id+")'>Borrar</button> <button class='mx-auto btn-danger btn-gradient' onclick='recuperarInformacion("+items[i].id+")'>Editar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").html(myTable);
}

function recuperarInformacion(id){
    let idSkate = id;
    $.ajax({
        url:"https://g8f8de2cd8423f5-dbreto1.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/skate/skate",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaS){
            console.log(respuestaS);
            informacion(idSkate,respuestaS.items);
            
            
        }
    });  
}

function informacion(idS,itemsS){
    for (i=0; i<itemsS.length; i++ ) {
        if (idS == itemsS[i].id){
            $(".idS").val(itemsS[i].id),
            $(".brandS").val(itemsS[i].brand),
            $(".modelS").val(itemsS[i].model),
            $(".category_idS").val(itemsS[i].category_id)
            $(".nameS").val(itemsS[i].name)
        }
    }
}

function validar(){
    if ($('#id').val().length == 0 || $('#brand').val().length == 0 || $('#model').val().length == 0 || $('#category_id').val().length == 0 || $('#name').val().length == 0) {
        alert('Todos los campos son necesarios');
        return false;
    }else{
        guardarInformacion();
    }
};


function guardarInformacion(){
    let myData={
        id:$("#id").val(),
        brand:$("#brand").val(),
        model:$("#model").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val(),
    };
    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url: "https://g8f8de2cd8423f5-dbreto1.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/skate/skate",
        type: "POST",
        data: dataToSend,
        contentType:"application/JSON",
        datatype: "JSON",
        success:function(respuesta){
            
            $("#id").val(""),
            $("#brand").val(""),
            $("#model").val(""),
            $("#category_id").val(""),
            $("#name").val(""),
            
            alerta("Se ha guardado con exito");
            
        }
    });
    traerInformacion();
}


function editarInformacion(){
    
    let myData={
        id:$("#id").val(),
        brand:$("#brand").val(),
        model:$("#model").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val()
    };
    let dataToSend=JSON.stringify(myData)

    $.ajax({
        url: "https://g8f8de2cd8423f5-dbreto1.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/skate/skate",
        type: "PUT",
        data: dataToSend,
        contentType:"application/JSON",
        dataType: "JSON",
        success:function(respuesta){
           
            $("#id").val(""),
            $("#brand").val(""),
            $("#model").val(""),
            $("#category_id").val(""),
            $("#name").val(""),
            
            
            traerInformacion();
            alerta("Se ha actualizado con exito");
        }
    });
}

function borrarElemento(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "https://g8f8de2cd8423f5-dbreto1.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/skate/skate",
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

 