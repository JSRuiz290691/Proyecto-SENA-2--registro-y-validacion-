import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs" //para cifrar la contraseña

const userSchema = new Schema( 
    {
        nombres:{
            type: String,
            unique: true,
        },
        apellidos: 
        {
            type: String,
        },
        fechaNacimiento: 
        {
            type: Date,
        },
        documentoIdentidad: 
        {
            type: String,
            unique: true,
        },
        email: 
        {
            type: String,
            unique: true,
        },
        password: {
            type: String,
            require:true,
        },
        roles: [ // un usuario puede terner mchos roles, una relacion de  a muchos
            {
                ref: "Role",
                type: Schema.Types.ObjectId,
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false, 
    }
);

userSchema.statics.encryptPassword = async (password) => { //Se crean unos metodos que se encargan de cifrar la contraseña del usuario y de compararlas para el verificar que sea el mismo dato. // los statics hace referencia a lña manera de crear metodos estaticos, forma de llamar a un metodo sin necesidad de instanciar un objeto.
    const salt = await bcrypt.genSalt(10)  //desde userSchma se importa bcrypt, se usa su metodo llamado genSalt (es una manera de aplicar el un algoritmo, ya que se le da el reorrido, las veces que se aplicara el algoritmo), y eso se guarda en una constante llamada salt
    return await bcrypt.hash(password, salt) // usando bcrypt se usa el metodo hash para encriptar la contraseña, solo necesita el password que ingresan y el salt
} 

userSchema.statics.comparePassword = async (password, recivedPassword) => {
    return await bcrypt.compare(password, recivedPassword) // si conincide retorna un true si no un false
} // Metodo para comparar, password es el que esta guardado y recivedPassword es la que ingresa a comparar 

export default  model("User", userSchema);