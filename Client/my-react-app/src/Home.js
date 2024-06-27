import React from "react"
import Navbar from './navBar/Navbar'
import QuizContent from "./components/QuizContent";




function Home (){
    
    const id = localStorage.getItem("id");
    const filier = localStorage.getItem("filier");


    return (
        <>
            <Navbar id={id} filier={filier} />
            <QuizContent filier={filier} id={id}/>
        </>

    )
}

export default Home