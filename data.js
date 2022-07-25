var data = {"site": "Blogue", "foot": "2022 Ysabella Romero"}
var nav_menu = ["Intro", "Poemas", "Comentários"]

//---------------------- SLIDESHOW ----------------------//

function slides() {

    var poem = document.getElementById("poem")
    var image = document.getElementById("image")

    if( poem.style.display != "none" )
    {
        poem.style.display = "none";
        image.style.display = "block";
    }

    else
    {
        poem.style.display = "block";
        image.style.display = "none";
    }

}
//--------------------------------------------------------------------//
