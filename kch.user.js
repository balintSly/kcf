// ==UserScript==
// @name         Kmooc Course Hider
// @namespace    http://tampermonkey.net/
// @version      0.4.3
// @updateURL    https://raw.githubusercontent.com/balintSly/kcf/master/kch.user.js
// @downloadURL  https://raw.githubusercontent.com/balintSly/kcf/master/kch.user.js
// @description  Hides old courses
// @author       Sly
// @match        https://www.kmooc.uni-obuda.hu/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// ==/UserScript==

let months=new Object();
months['jan']="1";
months['feb']="2";
months['márc']="3";
months['ápr']="4";
months['máj']="5";
months['jún']="6";
months['júl']="7";
months['aug']="8";
months['szept']="9";
months['okt']="10";
months['nov']="11";
months['dec']="12";

//window.addEventListener('load',initScript);
//document.getElementsByClassName("ui basic segment")[0].addEventListener("load", initScript);
window.addEventListener('load', initScript);
window.addEventListener('hashchange', initScript);

function initScript() {
    let path=window.location.pathname;
    if (path=="/my-courses"){
        let html=document.getElementsByClassName("ui basic segment")[0].innerHTML;
        let counterDiv="<div id='counter_div'></div>";
        document.getElementsByClassName("ui basic segment")[0].innerHTML="<button id='hide_btn'>Hide Old</button>";
        document.getElementsByClassName("ui basic segment")[0].innerHTML+="<button id='show_btn'>Show All</button>"+counterDiv+html;
        document.getElementById('show_btn').style.display="none";

        document.getElementById("hide_btn").addEventListener("click", hide);
        document.getElementById("show_btn").addEventListener("click", show);
    }
}
function hide(){
    document.getElementById('show_btn').style.display="block";
    document.getElementById('hide_btn').style.display="none";
    let item_con=document.getElementsByClassName("ui divided items")[0];
    let divs=item_con.children;
    let courseCount=divs.length;
    for (let i = 0; i < divs.length; i++) {
        let now=new Date().toLocaleString().replace(" ","").replace(" ","").split(" ")[0].slice(0, -1).replace(".0",".").replace(".0",".");
        let courseInfo=divs[i].getElementsByClassName("item");
        let courseEnd=courseInfo[2].innerText.split(",")[0].split(":")[1].replace(" ","").replace(" ","").replace(" ",".").split(" ")[0].slice(0, -1);
        let creditEnd=courseInfo[3].innerText.split(",")[0].split(":")[1].replace(" ","").replace(" ","").replace(" ",".").split(" ")[0].slice(0, -1);
        courseEnd=courseEnd.replace(courseEnd.split('.')[1],months[courseEnd.split('.')[1]]);
        creditEnd=creditEnd.replace(creditEnd.split('.')[1],months[creditEnd.split('.')[1]]);
        if (creditEnd.split('.')[0]<now.split('.')[0])
        {
            divs[i].style.display="none";
            courseCount--;
        }
        else if(creditEnd.split('.')[0]==now.split('.')[0] && creditEnd.split('.')[1]<now.split('.')[1])
        {
            divs[i].style.display="none";
            courseCount--;
        }
        else if(creditEnd.split('.')[0]==now.split('.')[0] && creditEnd.split('.')[1]==now.split('.')[1] && creditEnd.split('.')[2]<now.split('.')[2])
        {
            divs[i].style.display="none";
            courseCount--;
        }
        document.getElementById("counter_div").innerHTML="<h2>Aktuális kurzusaim: "+courseCount+"</h2>";
    }
}
function show() {
    document.getElementById('show_btn').style.display="none";
    document.getElementById('hide_btn').style.display="block";
    let item_con=document.getElementsByClassName("ui divided items")[0];
    let divs=item_con.children;
    for (let i = 0; i < divs.length; i++) {
        divs[i].style.display="block";
    }
}


