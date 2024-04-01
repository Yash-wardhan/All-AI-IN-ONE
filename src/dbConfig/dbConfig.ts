import mongoose from 'mongoose'




//Database Connection
export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        await connection.on("connected",()=>{
            console.log(`MongoDB is connected on success`)
        })
        connection.on('error',(err)=>{
            console.log('Error connecting to MongoDB: ', err)
            process.exit()
        })

    } catch (error) {
        console.log('Something Goes Wrong Connection Mongodb err:-',error)
    }
}