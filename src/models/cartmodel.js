const mongoose=require("mongoose");

const cartSchema=new mongoose.Schema({
    color:{type:String,required:true},
    p:{type:Number,required:true},
    url:{type:String,required:true},
    size:{type:String,required:true},
    name:{type:String,required:true},
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    }
});

module.exports=mongoose.model("cartdatas",cartSchema);