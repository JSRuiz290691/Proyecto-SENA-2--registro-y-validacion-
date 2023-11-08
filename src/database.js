import mongoose from "mongoose";

/* mongoose.connect("mongodb://localhost/veterinariadb",{ 
    useNewUrlParser: true,
    useUnifiedTopology:true
}) 

    .then(db => console.log("db is connected"))
    .catch(error => console.log(error))

*/

const url = 'mongodb+srv://jsdark25:Vete123456789@dbveterinaria1.ybbimar.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = global.Promise;

mongoose.connect(url,{ 
    useNewUrlParser: true,
    useUnifiedTopology:true
})
    .then(db => console.log("db is connected"))
    .catch(error => console.log(error))
