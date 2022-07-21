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

// Initialize Firebase - be sure to use your own code, this connects to my database.
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBqKX1_Jmhm809kqW3SBifAjmVfzLfC-0w",
    authDomain: "comments2-a5f2e.firebaseapp.com",
    databaseURL: "https://comments2-a5f2e.firebaseio.com",
    projectId: "comments2-a5f2e",
    storageBucket: "comments2-a5f2e.appspot.com",
    messagingSenderId: "617710094361"
};
firebase.initializeApp(config);
//Rootref is the whole database.
const rootRef = firebase.database().ref();
//commentsRef is just the pageCountsNode
const commentsRef = rootRef.child('comments');
//Listen for click on Submit Comment button, and post comment.
document.getElementById("btnSubmitComment").addEventListener("click", function () {
    //Replace line breaks in comment with br tags.
    var newcomment = document.getElementById('txComment').value.replace(/\n/g, "<br>");
    //Define a new, keyed post.
    var newPostRef = commentsRef.push();
    //Fill tne new keyed post with data
    newPostRef.set({
        name: document.getElementById('tbName').value.trim(),
        comment: newcomment.trim(),
        frompage: location.pathname,
        when: firebase.database.ServerValue.TIMESTAMP
    });
});


function showpastcomments() {
    var showat = document.getElementById('pastcomments');
    //Get comments whose from page equals this page's pathname.
    var commentsRef = firebase.database().ref('comments/').orderByChild('frompage').equalTo(location.pathname);
    commentsRef.once('value', function (snapshot) {
        snapshot.forEach(function (itemSnapshot) {
            //Get the object for one snapshot
            var itemData = itemSnapshot.val();
            var comment = itemData.comment;
            var name = itemData.name;
            var when = new Date(itemData.when).toLocaleDateString("en-us");
            showat.innerHTML += "<li>" + comment + "<span> -- " + name + " (" + when +
                ")</span></li>";
        })
    })
}
//Called when page first opens and also after Submit button click to show all comments for this page.
showpastcomments();

