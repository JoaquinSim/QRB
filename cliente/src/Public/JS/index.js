function desplegarSlide(){
    document.getElementById("slide").style.display = "block";
    document.getElementById("header").style.opacity = "0.5";
    document.getElementById("main").style.opacity = "0.5";
}
function cerrarSlide(){
    document.getElementById("slide").style.display = "none";
    document.getElementById("header").style.opacity = "1";
    document.getElementById("main").style.opacity = "1";
}
function desplegarMenu(){
    document.getElementById("header-menu").style.display = "block";

}
function cerrarMenu(){
    document.getElementById("header-menu").style.display = "none";
}
