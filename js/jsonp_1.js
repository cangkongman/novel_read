function isCollect(book, page) {
    var a = JSON.parse(localStorage.getItem('bookmarkLists'))
    if(!a)
        return 'flase'
    for (var i = 0; i < a.length; i++) {
        if (a[i]['book'] == book && a[i]['page'] == page){
            return 'true'
        }
    }
    return 'false'
}

function show_catalog(obj, result) {
    document.getElementById('cata').innerHTML = ''
    var title = Object.keys(result);
    console.log(title)
    var dlelement = document.createElement('dl')
    for (var i = 0; i < title.length; i++) {
        var ddelement = document.createElement('dd');
        var content = result[title[i]]
        ddelement.innerHTML = '<b>' + title[i] + '</b>' + ' ' + content
        dlelement.appendChild(ddelement)
    }
    document.getElementById('cata').appendChild(dlelement);


    function sendValue(index) {
        console.log(index);
        var collect = isCollect(obj, index)
        var URL = "novel_read.html?book=" + obj + '&page=' + index + '&dn=day' + '&collect=' + collect;
        window.location.href = URL;
    }

    var red_catalog = document.getElementsByTagName('dd')
    console.log(red_catalog)
    for (var i = 0; i < red_catalog.length; i++) {
        red_catalog[i].index = i + 1;
        red_catalog[i].onclick = function () {
            sendValue(this.index)
        }
    }
}

//展示简介
function show_intro(obj, result) {
    bookname = document.createElement('span')
    bookname.setAttribute('class', 'bookname')
    bookname.innerHTML = result['bookname']

    intro = document.createElement('div')
    intro.setAttribute('class', 'text')
    intro.innerHTML = result['intro']

    author = document.createElement('span')
    author.setAttribute('class', 'author')
    author.innerHTML = "作  者: " + result['author']

    img = document.createElement('img')
    img.src = result['img_src']

    div = document.getElementById('intro')
    div.innerHTML = ''
    div.appendChild(bookname);
    div.appendChild(intro);
    div.appendChild(author);
    div.appendChild(img);

    title = document.getElementsByTagName('title')[0]
    title.innerHTML = result['bookname']
}

function jsonp(url) {
    var jsonp = document.createElement('script');
    jsonp.type = 'text/javascript';
    jsonp.src = url;
    jsonp.id = 'red_script'
    document.getElementsByTagName('head')[0].appendChild(jsonp);
    script = document.getElementById('red_script')
    script.parentNode.removeChild(script);
}