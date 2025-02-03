const mongoose=require('mongoose');

const todoSchema=mongoose.Schema({
    todo:{
        type:String,
        minLength:[5,"required minimum 5 characters"],
        required:[true, "Todo is required"]
    },
    isCompleted:Boolean,
}, {
    strict:false,
    timestamps:true,
});

module.exports=mongoose.model("Todo" , todoSchema);