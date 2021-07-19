/* ------------------- toggle style switcher -------------------*/
const styleSwitcherToggler = document.querySelector('.style-switcher-toggler');
styleSwitcherToggler.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
})

//hide style - switcher on scroll (about me)
window.addEventListener("scroll", () => {
    if(  document.querySelector(".style-switcher").classList.contains("open")){
        document.querySelector(".style-switcher").classList.remove("open");
    }
})

/* ------------------- theme colors -------------------*/
const alternateStyles = document.querySelectorAll(".alternate-style");

function setActiveStyle(color){
    localStorage.setItem("color",color); // "color" = nombre clave , color = "color-1,2,3" valor
    //console.log(localStorage.getItem("color"));
    changeColor();
}

function changeColor(){
    alternateStyles.forEach((style) => {
        if(localStorage.getItem("color") === style.getAttribute("title")){
            style.removeAttribute("disabled");
        }
        else{
            style.setAttribute("disabled", "true");
        }
    })
}
//checking if "color" key exists
if(localStorage.getItem("color") !== null){
    //exists color
    changeColor();
}

/* ------------------- theme light and dark mode -------------------*/
const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () =>{
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
    }else{
        localStorage.setItem("theme","light");
    }
    updateIcon();
})
//checking if "theme" key exists
function themeMode(){
    if(localStorage.getItem("theme") !== null){
        if(localStorage.getItem("theme") === "light"){
            document.body.classList.remove("dark");
        }else{
            document.body.classList.add("dark");
        }
    }
    updateIcon();
}
themeMode();

function updateIcon(){
    if(document.body.classList.contains("dark")){
        dayNight.querySelector("i").classList.remove("fa-moon");
        dayNight.querySelector("i").classList.add("fa-sun");
    }else{
        dayNight.querySelector("i").classList.remove("fa-sun");
        dayNight.querySelector("i").classList.add("fa-moon");
    }
}