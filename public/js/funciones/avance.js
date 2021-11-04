import Swal from "sweetalert2";

export const actualizarAvance = (mostrar) => {
    const tareas = document.querySelectorAll('li.tarea');

    if ( tareas.length ) {
        const tareasCompletas = document.querySelectorAll('i.completo');

        //console.log('TC: ' + tareasCompletas + ' T: ' + tareas);
        const percent = porcentaje(tareasCompletas.length, tareas.length);
        const percentHtml = document.querySelector('#porcentaje');

        console.log('ENTRO PERFECTO: ' + percent);
        percentHtml.style.width = percent + '%';

        if(percent === 100 && mostrar) {
            Swal.fire(
                'Completastes el Proyecto',
                'Felicidades, has completado el proyecto',
                'success'
            );
        }
    }
}

function porcentaje(partialValue, totalValue) {
    return Math.round(100 * (partialValue / totalValue));
 } 