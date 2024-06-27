const mongoose=require("mongoose")


mongoose.connect("mongodb://127.0.0.1:27017/mini_projet_QCM")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})


const newSchema= new mongoose.Schema({
    Id:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Nom:{
        type:String,
        required:true
    },
    Prenom:{
        type:String,
        required:true
    },
    Filier:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("login_info",newSchema)

const QuizSchema = new mongoose.Schema({
    Filier: {
        type: String,
        ref: 'login_info'
    },
    question: {
        type: String,
        required: true
    },
    option1: {
        type: String,
        required: true,
        
    },option2: {
        type: String,
        required: true,
        
    },option3: {
        type: String,
        required: true,
        
    },option4: {
        type: String,
        required: true,
        
    },
    answer: {
        type: String,
        required: true,
        
    },
    title: {
        type: String,
        required: true,
    },
});

const quiz = mongoose.model('quizs', QuizSchema);




const ResultaSchema = new mongoose.Schema({
    Id: {
        type:String,
        required:true,
        ref: 'login_info'
    },
    Nom:{
        type:String,
        ref: 'login_info'
    },
    Prenom:{
        type:String,
        ref: 'login_info'
    },
    Filier: {
        type: String,
        ref: 'login_info'
    },
    Note:{
        type:Number,
        required:true,
    },
    Date: {
        type: Date,
        default: Date.now,
    }
});

const result = mongoose.model('ResultaSchema', ResultaSchema);


//admin


const adminSchema= new mongoose.Schema({
    Id:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Nom:{
        type:String,
        required:true
    },
    Prenom:{
        type:String,
        required:true
    }
})

const teachers = mongoose.model("Teachers",adminSchema)
















module.exports={collection,quiz,result,teachers}