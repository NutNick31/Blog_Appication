// password-hdvD5sn!9UG!U7L
// url=mongodb://sangwan9:<password>@ac-p7fy21c-shard-00-00.turfp76.mongodb.net:27017,ac-p7fy21c-shard-00-01.turfp76.mongodb.net:27017,ac-p7fy21c-shard-00-02.turfp76.mongodb.net:27017/?ssl=true&replicaSet=atlas-e7bs3h-shard-0&authSource=admin&retryWrites=true&w=majority


import mongoose from 'mongoose';

export const connection = async(password,username)=>{

    // const URL=`mongodb://${username}:${password}@ac-p7fy21c-shard-00-00.turfp76.mongodb.net:27017,ac-p7fy21c-shard-00-01.turfp76.mongodb.net:27017,ac-p7fy21c-shard-00-02.turfp76.mongodb.net:27017/?ssl=true`
    const URL=`mongodb+srv://${username}:${password}@cluster0.2zrmlqd.mongodb.net/?retryWrites=true&w=majority`
    try{
         await  mongoose.connect(URL,{useNewUrlParser : true});
         console.log('connected successfully');
    }catch(error){
        console.log('error in connection' ,error);
    }
   
} 
// connection()

