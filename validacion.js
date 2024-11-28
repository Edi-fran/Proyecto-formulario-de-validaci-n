// Seleccionar los contenedores
const formulario = document.querySelector('.formulario-contenedor'); // Selecciona el contenedor con la clase "formulario-contenedor".
const nosotros = document.querySelector('.texto-contenedor'); // Selecciona el contenedor con la clase "texto-contenedor".

// Alternar la clase "activo" para transparencia al hacer clic
function toggleTransparency(event) {
    event.currentTarget.classList.toggle('activo'); // Alterna (añade o quita) la clase "activo" en el elemento que recibe el evento.
}

formulario.addEventListener('click', toggleTransparency); // Asocia el evento 'click' al contenedor de formulario, aplicando la función toggleTransparency.
nosotros.addEventListener('click', toggleTransparency); // Asocia el evento 'click' al contenedor "nosotros", aplicando la misma función.

// Validación del formulario
document.getElementById("formularioRegistro").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que el formulario se envíe de manera predeterminada.

    // Patrones de validación para cada campo
    const patrones = {
        nombres: /^[a-zA-Z ]+$/, // Solo letras y espacios.
        apellidos: /^[a-zA-Z ]+$/, // Solo letras y espacios.
        cedula: /^\d{10}$/, // Solo 10 dígitos.
        nombreUsuario: /^[a-zA-Z0-9_]{5,20}$/, // Letras, números o guiones bajos, entre 5 y 20 caracteres.
        correoElectronico: /^[\w\.-]+@[\w\.-]+\.\w{2,4}$/, // Formato de correo válido.
        contrasena: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{12,20}$/, // Contraseña con mayúsculas, números, caracteres especiales, entre 12 y 20 caracteres.
        telefono: /^\d{7,10}$/, // Números entre 7 y 10 dígitos.
        codigoPostal: /^\d{5}$/, // Código postal de 5 dígitos.
        tarjetaCredito: /^\d{16}$/, // Número de tarjeta de crédito de 16 dígitos.
        placa: /^[A-Z]{3}-\d{3,4}$/ // Placa en formato ABC-123 o ABC-1234.
    };

    let esValido = true; // Variable para rastrear la validez general del formulario.

    // Validar cada campo del formulario basado en los patrones
    for (const campo in patrones) {
        const entrada = document.getElementById(campo); // Selecciona el elemento del formulario por su ID.
        if (entrada && !patrones[campo].test(entrada.value.trim())) {
            entrada.classList.add("is-invalid"); // Agrega la clase "is-invalid" si no cumple el patrón.
            esValido = false; // Marca el formulario como inválido.
        } else if (entrada) {
            entrada.classList.remove("is-invalid"); // Elimina la clase "is-invalid" si es válido.
        }
    }

    // Validar contraseñas (comparar contrasena y confirmarContrasena)
    const contrasena = document.getElementById("contrasena").value; // Obtiene el valor del campo "contrasena".
    const confirmarContrasena = document.getElementById("confirmarContrasena").value; // Obtiene el valor del campo "confirmarContrasena".

    if (contrasena !== confirmarContrasena) { // Comprueba si las contraseñas no coinciden.
        document.getElementById("confirmarContrasena").classList.add("is-invalid"); // Marca el campo como inválido.
        esValido = false;
    } else {
        document.getElementById("confirmarContrasena").classList.remove("is-invalid"); // Elimina la clase si coinciden.
    }

    // Validar si el usuario es mayor de edad
    const fechaNacimiento = new Date(document.getElementById("fechaNacimiento").value); // Convierte la fecha de nacimiento ingresada en un objeto Date.
    const hoy = new Date(); // Obtiene la fecha actual.
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear(); // Calcula la edad en años.
    const mes = hoy.getMonth() - fechaNacimiento.getMonth(); // Calcula la diferencia de meses.
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--; // Resta un año si el mes o día no ha pasado en el año actual.
    }

    if (edad < 18) { // Verifica si la edad es menor a 18.
        document.getElementById("fechaNacimiento").classList.add("is-invalid"); // Marca el campo como inválido.
        esValido = false;
    } else {
        document.getElementById("fechaNacimiento").classList.remove("is-invalid"); // Elimina la clase si es válido.
    }

    // Si todo es válido, muestra un mensaje de éxito
    if (esValido) {
        alert("Tu información fue enviada exitosamente. Pronto nos contactaremos contigo."); // Mensaje de confirmación.
    }
});

// Dinámica de validación en tiempo real para contraseñas
document.getElementById("contrasena").addEventListener("input", function () {
    const contrasena = this.value; // Obtiene el valor actual del campo "contrasena".

    // Valida la longitud de la contraseña (12-20 caracteres)
    document.getElementById("longitud").classList.toggle("text-danger", contrasena.length < 12 || contrasena.length > 20);

    // Valida si hay al menos una letra mayúscula
    document.getElementById("mayuscula").classList.toggle("text-danger", !/[A-Z]/.test(contrasena));

    // Valida si hay al menos un número
    document.getElementById("numero").classList.toggle("text-danger", !/\d/.test(contrasena));

    // Valida si hay al menos un carácter especial
    document.getElementById("caracterEspecial").classList.toggle("text-danger", !/[!@#$%^&*]/.test(contrasena));
});

