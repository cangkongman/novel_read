function $(id) {
    return document.getElementById(id)
}
function $$(classname) {
    return document.getElementsByClassName(classname)
}

function isCollect(book, page) {
    var a = JSON.parse(localStorage.getItem('bookmarkLists'))
    if (!a)
        return 'flase'
    for (var i = 0; i < a.length; i++) {
        if (a[i]['book'] == book && a[i]['page'] == page) {
            return 'true'
        }
    }
    return 'false'
}

function show_catalog(obj, result) {
    ul = $('ulspd');
    ul.innerHTML = ''
    var title = Object.keys(result)
    var content = Object.values(result)
    for (var i = 0; i < title.length; i++) {

        var lielement = document.createElement('li');
        lielement.setAttribute('class', 'lispd')

        var belement = document.createElement('b');
        var spanelement = document.createElement('span');
        belement.innerHTML = title[i] + "&nbsp;"
        spanelement.innerHTML = content[i]
        lielement.appendChild(belement)
        lielement.appendChild(spanelement)
        ul.appendChild(lielement)
    }
    catalog.appendChild(ul)

    function sendValue(index) {
        console.log(index);
        var collect = isCollect(obj, index)

        var URL = "novel_read.html?book=" + obj + '&page=' + index + '&day=' + dn + '&collect=' + collect;
        window.location.href = URL;
    }
    var li = document.getElementsByTagName('li')
    console.log(li)
    for (var i = 0; i < li.length; i++) {
        li[i].index = i + 1;
        li[i].onclick = function () {
            sendValue(this.index)
        }
    }
}

function show_content(obj, result) {

    title = $('title');
    t = document.getElementsByTagName('title')[0];
    key = Object.keys(result)[0]
    title.innerHTML = key
    console.log(t)
    t.innerHTML = key

    values = Object.values(result)[0]
    para = values.split("<br>")
    content = $('fintion_container');
    for (var i = 1; i < para.length; i++) {
        p = document.createElement('p');
        p.innerHTML = para[i];
        content.appendChild(p)
    }
}

function jsonp(url, a) {
    var jsonp = document.createElement('script');
    jsonp.type = 'text/javascript';
    jsonp.src = url;
    jsonp.id = 'red_script'
    document.getElementsByTagName('head')[0].appendChild(jsonp);
    script = $('red_script')
    script.parentNode.removeChild(script);
    let dn = a
}