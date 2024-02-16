document.addEventListener('DOMContentLoaded', function() {
    // Tu código JavaScript aquí
    //1.Seleccionar Inputs/Variables
    const mascotaInput = document.querySelector('#mascota');
    const propietarioInput = document.querySelector('#propietario');
    const telefonoInput = document.querySelector('#telefono');
    const horaInput = document.querySelector('#hora');
    const fechaInput = document.querySelector('#fecha');
    const sintomasInput = document.querySelector('#sintomas');

    const formulario = document.querySelector('#nueva-cita');
   
    const contenedordeCitas = document.querySelector('#citas');


    let editando;

    //2.EventsListener
    mascotaInput.addEventListener('change', validarCampos);
    propietarioInput.addEventListener('change', validarCampos);
    telefonoInput.addEventListener('change', validarCampos);
    horaInput.addEventListener('change', validarCampos);
    fechaInput.addEventListener('change', validarCampos);
    sintomasInput.addEventListener('change', validarCampos);

    formulario.addEventListener('submit', nuevaCita);

    //3.Objeto para almacenar los Datos
    const inputObj = {
        mascota: "",
        propietario: "",
        telefono:"",
        hora: "",
        fecha:"",
        sintomas: ""
    }

    //4. Definir Clases
    class AdministrarCitas {
        constructor() {
            this.citas = [];
        }

        agregar(cita){
            this.citas = [...this.citas, cita]
            
        }

        eliminarCita(id){
            this.citas = this.citas.filter( cita => cita.id !== id)
        }

        editarCita(citaActualizada){
            this.citas = this.citas.map(cita => {
                if (cita.id === citaActualizada.id) {
                    return citaActualizada; // Actualizar datos de la cita
                }
                
                return cita;
            });
        }
    }


    class Ui {
        //7.Imprimir Alerta
        imprimirAlerta(mensaje, tipo){
            // Crear Alerta
            const alertaDiv = document.createElement('div');
            alertaDiv.classList.add('text-center', 'alert', 'd-block', 'col-12');

            // Agregar clase de acuerdo al tipo de alerta
            if(tipo === 'error'){
                alertaDiv.classList.add('alert-danger');
            } else {
                alertaDiv.classList.add('alert-success');
            }

            // Mensaje de alerta
            alertaDiv.textContent = mensaje;

            // Agregar al DOM
            document.querySelector('#alert-container').appendChild(alertaDiv);

            // Quitar la alerta después de 3 segundos
            setTimeout( ()=> {
                alertaDiv.remove();
            }, 3000);
        }

        imprimirCitas({citas}) {


            //10.Limpiar HTML
            this.limpiarHTML();

            //9. Introducir los datos de la cinta en HTML

            citas.forEach( cita => {
                const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;
                
                const divCita = document.createElement('div');
                divCita.classList.add('cita', 'p-3');
                divCita.dataset.id = id;

                // Scripting de los elementos de la cita
                const mascotaParrafo = document.createElement('h3');
                mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
                mascotaParrafo.textContent = mascota;

                const propietarioParrafo = document.createElement('p');
                propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario:</span> ${propietario}`;

                const telefonoParrafo = document.createElement('p');
                telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Teléfono:</span> ${telefono}`;

                const fechaParrafo = document.createElement('p');
                fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha:</span> ${fecha}`;

                const horaParrafo = document.createElement('p');
                horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora:</span> ${hora}`;

                const sintomasParrafo = document.createElement('p');
                sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Síntomas:</span> ${sintomas}`;

                //11.Eliminar citas agregadas al HTML
                //Boton para Elminiar citas

                const btnEliminar = document.createElement('button');
                btnEliminar.classList.add('btn', 'btn-danger', 'm-2');
                btnEliminar.innerHTML = 'Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-1 h-1"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>';

                //Funcion Eliminar ONCLICK

                btnEliminar.onclick = () => eliminarCita(id);

                //Botono para EDITAR
                const btnEditar = document.createElement('button');
                btnEditar.classList.add('btn', 'btn-info');
                btnEditar.innerHTML ='Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /></svg>';
                btnEditar.onclick = () => cargarEdicion(cita.id);




                // Agregar los párrafos al divCita
                divCita.appendChild(mascotaParrafo);
                divCita.appendChild(propietarioParrafo);
                divCita.appendChild(telefonoParrafo);
                divCita.appendChild(fechaParrafo);
                divCita.appendChild(horaParrafo);
                divCita.appendChild(sintomasParrafo);

                divCita.appendChild(btnEliminar);
                divCita.appendChild(btnEditar);

                // Agregar citas al HTML
                contenedordeCitas.appendChild(divCita);                

            });
        }

        limpiarHTML(){
            while(contenedordeCitas.firstChild){
                contenedordeCitas.removeChild(contenedordeCitas.firstChild);
            }
        }
        

        
    }


    //5. Instanciar Clases
    const administrarCitas = new AdministrarCitas();
    const ui = new Ui();

    //6. Validar y agregar del EventListener CITAS
    
function nuevaCita(e){
    e.preventDefault();

    // Decosntruir OBJETO
    const { mascota, propietario, telefono, hora, fecha, sintomas } = inputObj;

    // Validar
    if (mascota === "" || propietario === "" || telefono === "" || hora === "" || fecha === "" || sintomas === "") {
        // Método imprimirAlerta();
        ui.imprimirAlerta('Falta algún campo por llenar', 'error');
        
        return;
    }

    if(editando){
        ui.imprimirAlerta('Editado Correctamente');
        //Pase el objeto dela cita
        formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

        // Editar cita
        const citaEditada = {
            mascota: mascotaInput.value,
            propietario: propietarioInput.value,
            telefono: telefonoInput.value,
            hora: horaInput.value,
            fecha: fechaInput.value,
            sintomas: sintomasInput.value,
            id: inputObj.id // Mantener el mismo ID
        };
        administrarCitas.editarCita(citaEditada);
        console.log('Cita editada:', administrarCitas.citas);


        //Quitar modo Edicion
        editando = false;

    } else {
        //Generar un id unico
        inputObj.id = Date.now();

        //Creando una nueva cita.
        administrarCitas.agregar({...inputObj});
        console.log('Cita agregada', administrarCitas.citas);

        //Mensaje de agregados 
        ui.imprimirAlerta('Se agrego correctamente');
    }


    //Reiniciar el objeto para la Validacion
    reiniciarObjeto();

    //Reiniciar FOrmulario
    formulario.reset();

    //Mostrar el HTML
    ui.imprimirCitas(administrarCitas);

    // Cambiar el texto del botón solo si no estamos en modo de edición
    if (!editando) {
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';
    }
}

    
    //Cargar datos y en MOdo Edicion
    function cargarEdicion(cita){
        const { mascota, propietario, telefono, hora, fecha, sintomas, id } = cita;
         
        mascotaInput.value = mascota;
        propietarioInput.value = propietario;
        telefonoInput.value = telefono;
        horaInput.value =  hora;
        fechaInput.value = fecha;
        sintomasInput.value = sintomas;
    
        //LLenar el objeto
        inputObj.mascota = mascota;
        inputObj.propietario = propietario;
        inputObj.telefono = telefono;
        inputObj.fecha = fecha;
        inputObj.hora = hora;
        inputObj.sintomas = sintomas;
        inputObj.id = id;
    
        //Cambiar el texto del boton
        formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';
    
        editando = true;
    }
    
    //8.1 Reiniciar objto
    //Reinciiar objto

    function reiniciarObjeto(){
        inputObj.mascota = "";
        inputObj.propietario = "";
        inputObj.telefono = "";
        inputObj.hora = "";
        inputObj.fecha = "";
        inputObj.sintomas = "";
    }

    // Validar campos al cambiar
    function validarCampos(e) {
        inputObj[e.target.name] = e.target.value;
        const { mascota, propietario, telefono, hora, fecha, sintomas } = inputObj;

        if (mascota === "" || propietario === "" || telefono === "" || hora === "" || fecha === "" || sintomas === "") {
            //ui.imprimirAlerta('Falta algún campo por llenar', 'error');
            
        }
    };


    //12.Eliminar cita agregada

    function eliminarCita(id){
        //Eliminar la cita
        administrarCitas.eliminarCita(id);
        console.log('Cita eliminada:', administrarCitas.citas);

        //Muestre un mensaje
        ui.imprimirAlerta('La cita se Elimino correctamente');

        //Refrescar las citas
        ui.imprimirCitas(administrarCitas);
    }


    //Cargar datos y en MOdo Edicion

    
        function cargarEdicion(id) {
            // Encontrar la cita correspondiente al ID
            const cita = administrarCitas.citas.find(cita => cita.id === id);
            if (!cita) {
                // Manejar el caso en que no se encuentre la cita
                console.error("La cita no se encontró.");
                return;
            }

            const { mascota, propietario, telefono, hora, fecha, sintomas } = cita;

            mascotaInput.value = mascota;
            propietarioInput.value = propietario;
            telefonoInput.value = telefono;
            horaInput.value = hora;
            fechaInput.value = fecha;
            sintomasInput.value = sintomas;

            // Llenar el objeto
            inputObj.mascota = mascota;
            inputObj.propietario = propietario;
            inputObj.telefono = telefono;
            inputObj.fecha = fecha;
            inputObj.hora = hora;
            inputObj.sintomas = sintomas;
            inputObj.id = id;

            // Cambiar el texto del botón
            formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

            editando = true;
        }
            
        });
