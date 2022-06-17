var red = document.getElementById('red')
var west = document.getElementById('west')
var water = document.getElementById('water')
var three = document.getElementById('three')


function getIndex() {
    var frmValue = window.location.search;
    frmValue = decodeURIComponent(frmValue);
    frmValue = frmValue.substring(1);
    var urlValue = frmValue.split("&");
    index = urlValue[0].split("=")[1];
    console.log(index);
    return index
}
var index = getIndex()
var url = 'catalog/' + index + '.js'
jsonp(url)
url = 'content/' + index + '_comment.js'
jsonp(url)

