const tareas = document.querySelector('.listado-pendientes');
import axios from "axios";
import Swal from "sweetalert2";
import { actualizarAvance } from "../funciones/avance";

if(tareas) {
    tareas.addEventListener('click', (e) => {
        console.log(e.target.classList); 
        if(e.target.classList.contains('fa-check-circle')){
            const icon = e.target;
            const idTarea = icon.parentElement.parentElement.dataset.tarea;
            const url = `${location.origin}/tareas/${idTarea}`;

            axios.patch(url, {params: {idTarea}})
                .then(function(respuesta) {
                    console.log(respuesta);
                    if(respuesta.status === 200) {
                        icon.classList.toggle('completo');
                        actualizarAvance(true);
                    }
                });
        } else if(e.target.classList.contains('fa-trash')) {
            const icon = e.target;
            const tareaHtml = icon.parentElement.parentElement;
            const idTarea = tareaHtml.dataset.tarea;
            

            Swal.fire({
                title: '¿Deseas borrar esta tarea?',
                text: "Una tarea eliminada no se puede recuperar",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, borrar',
                cancelButtonText: "No, cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    //Enviar petición a axio
                    const url = `${location.origin}/tareas/${idTarea}`;
                    
                    axios.delete(url, {params: {idTarea}})
                        .then(function(respuesta){
                            if (respuesta.status === 200) {
                                tareaHtml.parentElement.removeChild(tareaHtml);
                                actualizarAvance(true);

                                Swal.fire(
                                    'Tarea eliminada',
                                    respuesta.data,
                                    'success'
                                );
                            }
                            
                        }).catch(() => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Hubo un error',
                                text: 'No se pudo eliminar el Proyecto'
                            })
                        });                
                }
            });
        }
    });
}

export default tareas;