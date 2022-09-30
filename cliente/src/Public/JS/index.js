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
    document.getElementById("header-menu").style.display = "flex";
    document.getElementById("header-menu").style.transition = ".3s";
}
function cerrarMenu(){
    document.getElementById("header-menu").style.display = "none";
}
