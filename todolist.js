var tareas = [], id= 0, modificacion=-1;

$( document ).ready(function() {
	$('#cabecera span').text('Nueva nota - '+fecha());
	
	$('#btnAgregar').click(function(){
		$('#tareaModal').modal('show');
	});

	$("#guardar").click(function () {
		if(modificacion == -1){
			cargaTareaPendiente($("#nombre-tarea").val(), $("#descripcion-tarea").val());
		}else{
			modificaTarea();
		}
	});
	
	$("#cerrar").click(function () {
		$('#tareaModal').find('#nombre-tarea').val("");
		$('#tareaModal').find('#descripcion-tarea').val("");
		modificacion = -1;
	});
	  
	$(document).on("click", ".borrar-item", function () {
		if (confirm('Esta seguro de eliminar la tarea?')) {
			var $idTarea = $(this).closest('li').attr('id');
			tareas.splice($idTarea, 1);
			$(this).closest('li').remove();
		}
	});

	$(document).on("click", ".completar-item", function () {
		if (confirm('Completar la tarea?')) {
			cargaTareaCompletada($(this).closest('li'));
		}
	});

	$(document).on("click", ".detalles-item", function () {
		var objetoTarea = tareas[$(this).closest('li').attr('id')];
		$('#tareaModal').find('#nombre-tarea').val(objetoTarea.nombreTarea);
		$('#tareaModal').find('#descripcion-tarea').val(objetoTarea.descripcionTarea);
		$('#tareaModal').modal('show');
		modificacion = $(this).closest('li').attr('id');
	});

	$(document).on("click", ".item-pendiente", function () {
		if (confirm('Mover la tarea a items pendientes?')) {
			var $liTarea = $('.templatePendientes').clone();
			var $idTarea = $(this).closest('li').attr('id');
			var objetoTarea = tareas[$idTarea];
			var nombreTarea = objetoTarea.nombreTarea;
			$liTarea .attr('id', $idTarea)
			$liTarea.find('.nombreTarea').text(nombreTarea);
			$liTarea.removeAttr("class");
			$liTarea.attr("style","display:flex");
			$liTarea.find('.opcionesPendientes').remove();
			$('#tareasPendientes').append($liTarea);
			$(this).closest('li').remove();
		}
	});

	$(document).on("change", "#tareasPendientes li input", function (){	
		if( $(this).is(':checked') ) {
			var $span = $('.templatePendientes .opcionesPendientes').clone();
			$(this).parent().append($span);
		} else {
			$(this).parent().find('.opcionesPendientes').remove();
		}
	});

	$(document).on("change", "#tareasCompletadas li input", function (){	
		if( $(this).is(':checked') ) {
			var $span = $('.templateCompletadas .opcionesCompletados').clone();
			$(this).parent().append($span);
		} else {
			$(this).parent().find('.opcionesCompletados').remove();
		}
	});
});

function cargaTareaPendiente(nombre, descripcion){
	var nombreTarea, descripcionTarea, idTarea, $liTarea;

	var tarea = {
		idTarea: id,
		nombreTarea: nombre,
		descripcionTarea: descripcion
	};
	
	$liTarea = $('.templatePendientes').clone();
	$liTarea.removeAttr("class");
	$liTarea.find('.nombreTarea').text(nombre);
 	$liTarea.attr("style","display:flex");
	$liTarea.attr('id', id);
	$liTarea.find('.opcionesPendientes').remove();
	$('#tareasPendientes').append($liTarea);
	id++;
	tareas.push(tarea);
	$('#tareaModal').find('#nombre-tarea').val("");
	$('#tareaModal').find('#descripcion-tarea').val("");
	$('#tareaModal').modal('toggle');
}

function modificaTarea(){
	$('#'+modificacion).find('.nombreTarea').text($('#tareaModal').find('#nombre-tarea').val());
	$('#'+modificacion).closest('li').find('.opcionesPendientes').remove();
	$('#'+modificacion).closest('li').find('.checkBox').prop('checked', false);
	tareas[modificacion].nombreTarea = $("#nombre-tarea").val();
	tareas[modificacion].descripcionTarea = $("#descripcion-tarea").val();
	$('#tareaModal').find('#nombre-tarea').val("");
	$('#tareaModal').find('#descripcion-tarea').val("");
	modificacion = -1;
}


function cargaTareaCompletada(tareaPendiente){
	var idTarea = tareaPendiente.attr('id');
	var objetoTarea = tareas[idTarea];
	var $liTarea = $('.templateCompletadas').clone();
	
	$liTarea.find('.nombreTarea').text(objetoTarea.nombreTarea);
	$liTarea.find('.opcionesCompletados').remove();
	$liTarea.removeAttr("class");
	$liTarea.removeAttr("style");
	$liTarea.attr("style","display:flex");
	$liTarea.attr('id', idTarea);
	$liTarea.css('backgroundColor', '#90EE90');
	$('#tareasCompletadas').append($liTarea);
	tareaPendiente.remove();
}

function fecha(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	
	if(dd<10) {
		dd='0'+dd;
	} 

	if(mm<10) {
		mm='0'+mm;
	} 

	today = dd+'/'+mm+'/'+yyyy;
	
	return today;
}