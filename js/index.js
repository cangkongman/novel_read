function $(id) {
    return document.getElementById(id)
}
function $$(classname) {
    return document.getElementsByClassName(classname)
}

function getLocalTime(nS) {
    return new Date(parseInt(nS)).toLocaleString().replace(/ 年 | 月/g, "-")
        .replace(/日/g, " ")
        .replace(/上午/g, "  AM  ")
        .replace(/下午/g, "  PM  ");
}

window.onload = function () {
    var serverTime = $('serverTime')
    setInterval(function () {
        var time = new Date().getTime()
        serverTime.innerHTML = '北京时间 '+getLocalTime(time)
    },100)
    var li = document.querySelectorAll(".littlebox li");
    console.log(li)
    contant1 = $$('contant1')
    for (var i = 0; i < li.length; i++) {
        li[i].index = i
        li[i].onmouseover = function () {
            if (this.index % 2)
                contant1[this.index - 1].style.display = 'none'
            else
                contant1[this.index + 1].style.display = 'none'

            contant1[this.index].style.display = 'block'
            if (this.index == 0) {
                $('zuo').style.display = 'block'
                $('you').style.display = 'block'
            }
            if (this.index == 1) {
                $('zuo').style.display = 'none'
                $('you').style.display = 'none'
            }
        }
    }
    var div = document.querySelectorAll("#first div");
    var index = 0
    function getA() {
        for (var i = 0; i < div.length; i++) {
            if (div[i].style.display == 'block') {
                return i
            }
        }
    }
    $('zuo').onclick = function () {
        var a = getA()
        index = a - 1
        if (a == 0)
            index = 3
        console.log(index)
        div[index].style.display = 'block'
        div[a].style.display = 'none'
    }
    $('you').onclick = function () {
        var a = getA()
        index = a + 1
        if (a == 3)
            index = 0
        console.log(index)
        div[index].style.display = 'block'
        div[a].style.display = 'none'
    }

    var book = document.querySelectorAll(".contant1 div");
    for (var i = 4; i < book.length; i++) {
        book[i].index = i
        console.log(book[i])
        book[i].onclick = function () {
            alert('目前只有四大名著的资源，其他小说暂未上架')
        }
    }

    var fourBook = document.querySelectorAll("#first div");
    for (var i = 0; i < fourBook.length; i++) {
        fourBook[i].index = i
        var book
        fourBook[i].onclick = function () {

            if (this.index == 0)
                book = 'red'
            if (this.index == 1)
                book = 'west'
            if (this.index == 2)
                book = 'water'
            if (this.index == 3)
                book = 'three'
            url = 'catalog.html?book=' + book
            window.location.href = url
        }
    }
}
