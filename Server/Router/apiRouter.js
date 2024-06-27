const express = require('express');
const router = express.Router();
const {authenticateToken}=require('../Middelware/JwtMiddelware');

const {getQuizs}=require('../Controller/quizController');
const {loginUser}=require('../Controller/authController');
const {saveScore}=require('../Controller/saveScoreContoller');
const {getScore}=require('../Controller/getScorController');

const {addStudent}=require('../Controller/Controller_admin/addStudentController');
const {addQuiz}=require('../Controller/Controller_admin/addQuizContoller');
const {getResult}=require('../Controller/Controller_admin/getResultContoller');

//etudiant routes

router.post('/login',loginUser);
router.post('/getQuizOfuser',authenticateToken,getQuizs);
router.post('/addQuizScore',authenticateToken,saveScore);
router.get('/votre_Score', authenticateToken, getScore);


//admin routes

router.post('/admin/addstudent',authenticateToken,addStudent);
router.post('/admin/addquiz',authenticateToken,addQuiz);
router.get('/admin/result',authenticateToken,getResult);


module.exports={router}