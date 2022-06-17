function $(id) {
    return document.getElementById(id)
}
function $$(classname) {
    return document.getElementsByClassName(classname)
}

var li = document.querySelectorAll(".left_aside li");
var div = document.querySelectorAll(".left_aside div");
for(var i=0;i<li.length;i++){
    li[i].index = i
    li[i].onmouseover = function(){
        div[this.index].style.display = 'block'
    }
    li[i].onmouseout = function(){
        div[this.index].style.display = 'none'
    }
}

$('bookmark').onclick = function(){
    window.location.href = 'bookmark.html'
}