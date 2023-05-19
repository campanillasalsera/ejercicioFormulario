
//Definir Clase Usuario con los datos que vamos a tratar cada vez
//que se cree un nuevo usuario
class Usuario {
    
    constructor(nombre,apellidos,email,pass,aceptoPP){
        this.nombre=nombre;
        this.apellidos=apellidos;
        this.email=email;
        this.pass=pass;
        this.aceptoPP=aceptoPP;
    }
}


//Creo una clase que valide en caso de error, qué codigo es y el motivo del error
class ResultadoValidacion{
    constructor(codigo, motivo){
        this.codigo = codigo;
        this.motivo = motivo;
    }
}


class Validacion{
    
    //le creamos un metodo validar
    validar(usuario){
        //creamos un array de errores
        let errores =[];
        if (usuario.nombre.length<3) {
            errores.push(new ResultadoValidacion(1,"El nombre no es válido"));  
        }
        if (usuario.apellidos.length<3) {
            errores.push(new ResultadoValidacion(2,"Los apellidos no son válidos"));  
        }
        if (usuario.pass.length<3) {
            errores.push(new ResultadoValidacion(3,"La contraseña no es correcta"));  
        }

        return errores; 
    }
}

//cargamos el html y css
window.addEventListener("load",() => {
    
    //accedemos al formulario y le añadimos el código que se ejecute cuando 
    //se le de a submit
    let formulario = document.getElementById("formRegistro");
    formulario.addEventListener("submit", function (eventoSubmit) {
        //Prevenimos el comportamiento por default
        eventoSubmit.preventDefault();
  
        //accedemos a los inputs
        let nombreInput=document.getElementsByName("nombre")[0];
        let apellidosInput=document.getElementsByName("apellidos")[0];
        let emailInput=document.getElementsByName("email")[0];
        let passInput=document.getElementsByName("pass")[0];
        let aceptoPPInput=document.getElementsByName("aceptoPP")[0];

        //recogemos el valor introducido
        let nombre = nombreInput.value;
        let apellidos = apellidosInput.value;
        let email = emailInput.value;
        let pass = passInput.value;
        let aceptoPP=aceptoPPInput.checked;

        //construimos un nuevo Usuario de la clase Usuario
        const usuario = new Usuario(nombre, apellidos,email, pass, aceptoPP);
        
        //creo una validación de usuario al que no se le envian parametros pues no tiene constructor
        const validacion = new Validacion();
        
        //guardo en una variable el resultado de la validacion 
        //usando el metodo validar de la clase Validacion
        let resultadoValidacion = validacion.validar(usuario);

        //selecciono el AlertBox
        let alertBox = document.getElementById("alertBox");
        //Selecciono el parrafo del alert Box
        let alertBoxMensaje=alertBox.children[0];

        //variables para guardar cada mensaje de error
        let nombreMsg="";
        let apellidosMsg="";
        let passMsg="";

        //variable para contar el numero de errores
        let contadorErrores=0;

        //si el número de errores de nuestra validacion es 0, hacemos fectch al servidor
        if (resultadoValidacion.length===0) {
            
            //objeto a enviar
            let dataUsuario = {
                nombre: usuario.nombre,
                apellidos: usuario.apellidos,
                email: usuario.email,
                pass: usuario.pass
            }
            //fetch al servidor
            fetch("http://localhost:8080",{
                method:"POST",
                body:JSON.stringify(dataUsuario),
                headers:{
                    'Content-Type': 'application/json'
                  },
                // mode: 'no-cors',  
            }).then(function (response) {
                //que nos de la respueta en formato json
                response.json().then((data) => {
                    console.log(data);
                    alertBox.classList.add("alertaEnviado");
                    alertBoxMensaje.innerHTML=data.mensaje;
                    alertBox.style.top=0;
                    //pasado 3000ms la alerta desaparece
                    setTimeout(() => {
                        alertBox.style.top="-170px"; 
                        alertBox.style.height="50px";
                        alertBox.classList.remove("alertaEnviado");    
                    }, 3000);
            
                });
            }).catch(function (error) {
                console.warn(error);
            })
          //si hay algún error entramos en el else  
        }else{
            //mostramos todos los errores
            for (const resultado of resultadoValidacion) {
     
                //Opciones segun el dodigo de error
                switch (resultado.codigo) {
                    case 1:  
                        //guardar el mensaje del error en el mensaje para error nombre
                         nombreMsg=resultado.motivo;
     
                         //añadimos un erro al contador de erroes
                         contadorErrores=contadorErrores+1;
                         
                         //añado la clase para cambiar le color
                         alertBox.classList.add("alertaError");
                         
                         //Limpio lo que había en el imput
                         nombreInput.value="";
                         
                         //agrego las clases para cambiar el campo con error
                         nombreInput.classList.add("errorCampo","input::placeholder");
                         
                         //Colocamos el cursor en el campo con error
                         nombreInput.focus({focusVisible:true});
                         
                         //Cuando se haga click se quitan los estilos de error del campo
                         nombreInput.addEventListener("click", () => {                        
                             nombreInput.classList.remove("errorCampo","input::placeholder");
                         })
                         
                         break;
                         
                     case 2:
                         //guardar el mensaje del error en el mensaje para error apellido
                         apellidosMsg=resultado.motivo;
                         
                         //añadimos un erro al contador de erroes
                         contadorErrores=contadorErrores+1;
     
                         //añado la clase para cambiar le color
                         alertBox.classList.add("alertaError");
                     
                         //Limpio lo que había en el imput
                         apellidosInput.value="";
                         
                         //agrego las clases para cambiar el campo con error
                         apellidosInput.classList.add("errorCampo","input::placeholder");
                         
                         //Colocamos el cursor en el campo con error
                         apellidosInput.focus({focusVisible:true});
                         
                         //Cuando se haga click se quitan los estilos de error del campo
                         apellidosInput.addEventListener("click", () => {
                             apellidosInput.classList.remove("errorCampo","input::placeholder");
                         })
                         
                         break;
                             
                             
                     case 3:
                         //guardar el mensaje del error en el mensaje para error pass
                         passMsg=resultado.motivo;
                         
                         //añadimos un erro al contador de erroes
                         contadorErrores=contadorErrores+1;
     
                         //añado la clase para cambiar le color
                         alertBox.classList.add("alertaError");
                     
                         //Limpio lo que había en el imput
                         passInput.value="";
     
                         //agrego las clases para cambiar el campo con error
                         passInput.classList.add("errorCampo","input::placeholder");
     
                         //Colocamos el cursor en el campo con error
                         passInput.focus({focusVisible:true});
                         
                         //Cuando se haga click se quitan los estilos de error del campo
                         passInput.addEventListener("click", () => {
                         passInput.classList.remove("errorCampo","input::placeholder");
                         })
     
                 break;
                 
                     default:
                         break;
                 }
                 
             //fin for of resultado of resultadoValidacion  
             }
     
             //switch para controlar tamaño del alertbox y que no salga en caso de error=0
             switch (contadorErrores) {
                 case 1:
                     alertBox.style.height="50px";
                     // muevo la posicion el alert box a 0 para que aparezca
                     alertBox.style.top = 0;
                     break;
                 case 2:
                     alertBox.style.height="90px";
                     // muevo la posicion el alert box a 0 para que aparezca
                     alertBox.style.top = 0;
                     break;
                 case 3:
                     alertBox.style.height="120px";
                     // muevo la posicion el alert box a 0 para que aparezca
                     alertBox.style.top = 0;
                     break;
             
                 default:
                     // muevo la posicion el alert box a 0 para que aparezca
                     alertBox.style.top = "-170px";
                     break;
             }
     
             //agrego los mensajes necesarios al alertBox
             alertBoxMensaje.innerHTML=`<p>${nombreMsg}</p><p>${apellidosMsg}</p><p>${passMsg}</p>`;
     
             //pasado 3000ms la alerta desaparece
             setTimeout(() => {
                 alertBox.style.top="-170px"; 
                 alertBox.style.height="50px";
                 alertBox.classList.remove("alertaError","input::placeholder")    
             }, 3000);
        }



    //fin formulario eventoSubmit    
    })

       
    //Fin window onload
})