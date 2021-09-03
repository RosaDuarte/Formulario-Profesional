const formulario = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");

const alerta = document.querySelector(".alerta");
const enviado = document.querySelector(".enviado");


const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	contraseña: /^.{4,12}$/, // 4 a 12 digitos.	
}

const campos = {
    nombre: false,
    apellido: false,
    usuario: false,
    correo: false,
    contraseña: false
}

const validarFormulario=(e)=>{
   switch(e.target.name){
        case "nombre":
          validarCampos(expresiones.nombre, e.target,'nombre');
        break;
        case "apellido":
            validarCampos(expresiones.apellido, e.target,'apellido');
        break;
        case "usuario":
            validarCampos(expresiones.usuario, e.target,'usuario');
        break;
        case "correo":
            validarCampos(expresiones.correo, e.target,'correo');
        break;
        case "contraseña":
            validarCampos(expresiones.contraseña, e.target,'contraseña');
        break;
        case "contraseña2":
            validarContraseña();
        break;
   };
}

const validarCampos = (expresion, input, campo)=>{
    if(expresion.test(input.value)){
        document.getElementById(`resultado__${campo}`).classList.remove("activo");
        document.getElementById(`resultado__${campo}`).classList.add("inactivo");
        campos[campo]=true;      
    }else{
        document.getElementById(`resultado__${campo}`).classList.add("activo");
        document.getElementById(`resultado__${campo}`).classList.remove("inactivo");
        campos[campo]=false;
    };
};

const validarContraseña = ()=>{
    const password = document.getElementById("contraseña");
    const verify = document.getElementById("contra");

    if(password.value !== verify.value){
        document.getElementById("resultado__contraseña2").classList.remove("inactivo");
        document.getElementById("resultado__contraseña2").classList.add("activo");
        campos['contraseña']=false;
    }else{

        document.getElementById("resultado__contraseña2").classList.remove("activo");
        document.getElementById("resultado__contraseña2").classList.add("inactivo");
        campos['contraseña']=true;
    }
}

inputs.forEach((input)=>{
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);    
})


formulario.addEventListener("submit", (e)=>{
    e.preventDefault();

    if(campos.nombre && campos.apellido && campos.usuario && campos.correo && campos.contraseña){
        formulario.reset(); 
        enviado.classList.remove("enviado");
        enviado.classList.add("correcto"); 

        setTimeout(()=>{
            enviado.classList.remove("correcto");
            enviado.classList.add("enviado");
        }, 5000);
    }else{
        alerta.classList.remove("alerta");
        alerta.classList.add("error"); 

        setTimeout(()=>{
            alerta.classList.remove("error");
            alerta.classList.add("alerta");
        }, 3000);
    }
})
