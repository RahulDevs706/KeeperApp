import React from "react";

const calender = new Date();
const year = calender.getFullYear(); 
function Footer() {
    return <footer><p>Copyright &copy; Rahul Singh {year}</p></footer>
}


export default Footer ;