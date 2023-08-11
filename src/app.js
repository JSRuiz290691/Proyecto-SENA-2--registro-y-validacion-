import express from "express"
import morgan from "morgan"

const app = express()

app.use(morgan("dev")); //para uasar las rutas

app.get('/',(req, res) => {  // creamos una ruta get
    res.json ({
        author: "Bastian",
        description: "",
        version: "1.0.0"
    })
}) 

export default app; //para poderlo usar en index.js