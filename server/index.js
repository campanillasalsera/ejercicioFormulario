//1 en consola instalar npm init
//se crea un package.json
//2. instalamos el paquete express de node
//nos crea un package-lock.jason y la carpeta node_modules
//no subir a git hub el node_module

//importamos libreria express
const express = require('express')
//importamos el body Parser. Se usa en los endpoints que acepten body
const bodyParser = require('body-parser');

//instanciamos express en la variable app
const app = express()
const port = 8080

//path es una dependencia nativo de Node que trabaja con rutas
const path = require("path");

//metodo de express, use, para que parsee el body a JSON
app.use(bodyParser.json());

//mostrar archivos estáticos al cliente 
//meter todos los archivos estáticos en una carpeta dentro de server
//el primer parametro es la carpeta donde está todo metido y corresponde
//a lo que va detrás del dominio principal localhost/public/
//el segundo parametro es la función static a la que le doy el nombre
// de la carpeta contenedora por parámetro
//dado que la carpeta public es un ruta relativa, tenemos que usar 
//el método join del modulo path para que me una la ruta desde la que
//se inicia el servidor con la carpeta public y conseguir así la
//ruta completa
app.use('/public', express.static(path.join(__dirname, 'public')));


//punto de acceso (req = 1º parametro= peticion , res=2º parametro=respueta)
app.post('/', (req, res) => {
    //para recibir nuestra info accedemos al body de nuestra peticion
    console.log(req.body);
    //quitamos el CORS
    res.setHeader('Access-Control-Allow-Origin', '*');

    //eviamos la respuesta en json
  res.send(JSON.stringify(
    {
        recibido: true,
        mensaje: "Enviado correctamente"
    }
))
})


//función express para que cuando todo falle pase por aquí
//esta función debe estar al final de todos los endpoints
app.use((req, res, next) => {
  res.status(404).send("No encontré eso");
}) 

//listen con el puerto
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})