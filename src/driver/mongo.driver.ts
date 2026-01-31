import mongoose from 'mongoose';

export async function connect() {

    try {

        if (!process.env.DBHOST)
            {
                throw new Error("DBHOST is not defined");
            }

        await mongoose.connect(process.env.DBHOST)

        if(mongoose.connection.db) {
            console.log("Driver connected")
        }
        else{
            throw new Error("Database connection is not established")
        }
    }

    catch(error) {
        console.log("Error connecting to the database. Error:" + error);
    }

}

export async function disconnect(){
    try {
        await mongoose.disconnect();
        console.log('Driver disconnected')
    }

    catch(error) {
        console.log('Error disconnecting. Error:' + error);
    }
}