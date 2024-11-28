// Seleccionar los contenedores
const formulario = document.querySelector('.formulario-contenedor');
const nosotros = document.querySelector('.texto-contenedor');

// Alternar la clase "activo" para transparencia al hacer clic
function toggleTransparency(event) {
    event.currentTarget.classList.toggle('activo');
}

formulario.addEventListener('click', toggleTransparency);
nosotros.addEventListener('click', toggleTransparency);

// Validación en tiempo real y por submit
document.getElementById("formularioRegistro").addEventListener("submit", validarFormulario);

// Patrones de validación para cada campo
const patrones = {
    nombres: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, // Solo letras, espacios y caracteres especiales en español.
    apellidos: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, // Solo letras, espacios y caracteres especiales en español.
    cedula: /^\d{10}$/, // Exactamente 10 dígitos.
    nombreUsuario: /^[a-zA-Z0-9!@#$%^&*()_+]{5,20}$/, // Letras, números y ciertos símbolos (!@#$%^&*), entre 5 y 20 caracteres.
    correoElectronico: /^[\w\.-]+@[\w\.-]+\.\w{2,4}$/, // Formato válido de correo electrónico.
    contrasena: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{12,20}$/, // Contraseña segura.
    telefono: /^\d{7,10}$/, // Entre 7 y 10 dígitos.
    telefonoCelular: /^\d{10}$/, // Exactamente 10 dígitos.
    codigoPostal: /^\d{5}$/, // Código postal de 5 dígitos.
    tarjetaCredito: /^\d{16}$/, // Tarjeta de crédito con 16 dígitos.
    placa: /^[A-Z]{3}-\d{3,4}$/ // Placa en formato ABC-123 o ABC-1234.
};

// Validación al enviar el formulario
function validarFormulario(e) {
    e.preventDefault(); // Evita el envío predeterminado del formulario.

    let esValido = true; // Para rastrear la validez del formulario.
    let camposInvalidos = []; // Almacena los nombres de los campos con errores.

    // Validar cada campo con su respectivo patrón
    for (const campo in patrones) {
        const entrada = document.getElementById(campo); // Obtiene el elemento por ID.
        if (entrada && !patrones[campo].test(entrada.value.trim())) { // Valida el valor contra el patrón.
            entrada.classList.add("is-invalid"); // Agrega la clase "is-invalid" si no pasa la validación.
            camposInvalidos.push(campo); // Añade el nombre del campo con error a la lista.
            esValido = false; // Marca el formulario como inválido.
        } else if (entrada) {
            entrada.classList.remove("is-invalid"); // Elimina la clase si el campo es válido.
        }
    }

    // Validar contraseñas (que coincidan)
    const contrasena = document.getElementById("contrasena").value;
    const confirmarContrasena = document.getElementById("confirmarContrasena").value;
    if (contrasena !== confirmarContrasena) { // Verifica si las contraseñas coinciden.
        document.getElementById("confirmarContrasena").classList.add("is-invalid");
        camposInvalidos.push("confirmarContrasena");
        esValido = false;
    } else {
        document.getElementById("confirmarContrasena").classList.remove("is-invalid");
    }

    // Validar si el usuario es mayor de edad
    const fechaNacimiento = new Date(document.getElementById("fechaNacimiento").value);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }

    if (edad < 18) {
        document.getElementById("fechaNacimiento").classList.add("is-invalid");
        camposInvalidos.push("fechaNacimiento");
        esValido = false;
    } else {
        document.getElementById("fechaNacimiento").classList.remove("is-invalid");
    }

    // Mostrar alert si hay errores
    if (!esValido) {
        alert("Los siguientes campos tienen errores o están incompletos: " + camposInvalidos.join(", "));
    } else {
        alert("Tu información fue enviada exitosamente. Pronto nos contactaremos contigo.");
    }
}

// Validación en tiempo real para cada campo
for (const campo in patrones) {
    const entrada = document.getElementById(campo);
    if (entrada) {
        entrada.addEventListener("input", function () {
            if (!patrones[campo].test(entrada.value.trim())) {
                entrada.classList.add("is-invalid");
            } else {
                entrada.classList.remove("is-invalid");
            }
        });
    }
}

// Validación en tiempo real para contraseñas
document.getElementById("contrasena").addEventListener("input", function () {
    const contrasena = this.value;

    document.getElementById("longitud").classList.toggle("text-danger", contrasena.length < 12 || contrasena.length > 20);
    document.getElementById("mayuscula").classList.toggle("text-danger", !/[A-Z]/.test(contrasena));
    document.getElementById("numero").classList.toggle("text-danger", !/\d/.test(contrasena));
    document.getElementById("caracterEspecial").classList.toggle("text-danger", !/[!@#$%^&*]/.test(contrasena));
});

// Validación en tiempo real para confirmar contraseña
document.getElementById("confirmarContrasena").addEventListener("input", function () {
    const contrasena = document.getElementById("contrasena").value;
    if (this.value !== contrasena) {
        this.classList.add("is-invalid");
    } else {
        this.classList.remove("is-invalid");
    }
});

