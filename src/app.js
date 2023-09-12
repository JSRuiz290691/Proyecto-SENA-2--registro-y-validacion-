import express from "express"
import morgan from "morgan" // es un middleware de express, permitre hacer lo de la linea 7
import pkg from "../package.json" //subimos un nivel e importamos el package.json

import {createRoles} from "./libs/initialSetup" // se importa el createRoles

import petsRoutes from "./routers/pets.routes"
import authRoutes from "./routers/auth.routes"
import usersRoutes from "./routers/user.routes";
const cors = require('cors');

const app = express()
createRoles(); // crea los roles al iniciar la aplicacion


app.use(morgan("dev")); //para uasar las rutas
app.use(express.json()); // para que entiendas los objetos json que llegan del servidor
app.use(cors({
    origin: '*'
}));

app.set("pkg", pkg) //Necesitamos guardar los datos del proyecto que traemos de package.json, se guardaran en un tipo de variable de express, se usa un metodo llamado set, este metodo es para ponerle un ombre y valor a la variable.

app.get('/',(req, res) => {  // creamos una ruta get
    res.json ({
        name: app.get("pkg").name,
        author: app.get("pkg").author, //traemos los datos especificos desde pkg
        version: app.get("pkg").version,
        description: app.get("pkg").description
    })
})

app.use("/api/pets" ,petsRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)

export default app; //para poderlo usar en index.js