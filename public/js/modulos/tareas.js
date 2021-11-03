const tareas = document.querySelector('.listado-pendientes');
import axios from "axios";

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
                });
        }
    });
}

export default tareas;