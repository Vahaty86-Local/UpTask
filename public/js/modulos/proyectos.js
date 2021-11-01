import Swal from "sweetalert2";
import axios from "axios";

const btnEliminar = document.querySelector('#eliminar-proyecto');

if(btnEliminar) {
    btnEliminar.addEventListener('click', event => {
        const urlProyecto = event.target.dataset.proyectoUrl;

        Swal.fire({
            title: '¿Deseas borrar este proyecto?',
            text: "Un proyecto eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar',
            cancelButtonText: "No, cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                //Enviar petición a axio
                const url = `${location.origin}/proyectos/${urlProyecto}`;
                
                axios.delete(url, {params: urlProyecto})
                    .then(function(respuesta){
                        console.log(respuesta);
                    });

                return;


                Swal.fire(
                    'Proyecto eliminado',
                    'El proyecto se ha eliminado.',
                    'success'
                );
                setTimeout(() => {
                    window.location.href="/"
                },3000);
            }
        })
    })
}

export default btnEliminar;
