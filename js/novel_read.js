//URL参数，其他页面传递过来的数据
var book = ''
var page = 0
var dn = 'day'
    //
dn_css = $$('dn')[0]

var frmValue = ''

function getParam() {
    var frmValue = window.location.search;
    frmValue = decodeURIComponent(frmValue);
    frmValue = frmValue.substring(1);
    var urlValue = frmValue.split("&");
    book = urlValue[0].split("=")[1];
    page = urlValue[1].split("=")[1];
    dn = urlValue[2].split("=")[1];
    collect = urlValue[3].split("=")[1]
}
getParam()

function isCollect(book, page) {
    var gkd = JSON.parse(localStorage.getItem('bookmarkLists'))
    if (gkd != null) {
        for (var i = 0; i < gkd.length; i++) {
            if (gkd[i].book == book && gkd[i].page == page) {
                return 'true'
            }
        }
    }

    return 'false'
}

var collect = isCollect(book, page)
if (collect) {
    $('favourite').style.display = 'none'
    $('unfavourite').style.display = 'block'
} else {
    $('favourite').style.display = 'block'
    $('unfavourite').style.display = 'none'
}


//通过更改css连接，达到切换日夜间模式目的
dn_css.href = 'css/novel_read_' + dn + '.css'
var night_button = $$('button')[0]
var day_button = $$('button')[1]
if (dn == 'day') {
    day_button.style.display = 'none'
    night_button.style.display = 'block'
} else {
    night_button.style.display = 'none'
    day_button.style.display = 'block'
}


//通过jsonp，请求得到小说内容
function getNovel() {
    url = 'content/' + book + '_js/' + page + '.js?show_content';
    jsonp(url)
}
getNovel()


//左侧导航栏
var left_menu = $('left-menu')
var four_book = left_menu.children[4].children
var intro = $$('intro')

console.log(four_book[0].id)
for (var i = 0; i < four_book.length; i++) {
    four_book[i].index = i

    //点击跳转对应目录
    four_book[i].addEventListener('click', toBook);

    function toBook() {
        var url = 'catalog.html?index=' + this.id
        window.location.href = url
    }

    //鼠标滑过出现简介
    four_book[i].onmouseover = function() {
        intro[this.index].style.display = 'block'
    }
    four_book[i].onmouseout = function() {
        intro[this.index].style.display = 'none'
    }
}

//日夜间
day_button.onclick = function() {
    dn = 'day'
    dn_css.href = 'css/novel_read_' + dn + '.css'
    this.style.display = 'none'
    night_button.style.display = 'block'
}
night_button.onclick = function() {
        dn = 'night'
        dn_css.href = 'css/novel_read_' + dn + '.css'
        this.style.display = 'none'
        day_button.style.display = 'block'
    }
    //上下章节
var last_chapter = $('last_chapter')
var next_chapter = $('next_chapter')

lastpage = parseInt(page) - 1
nextpage = parseInt(page) + 1

var last_url = 'novel_read.html?book=' + book + '&page=' + lastpage + '&dn='
var next_url = 'novel_read.html?book=' + book + '&page=' + nextpage + '&dn='

last_chapter.addEventListener('click', toLast);
next_chapter.addEventListener('click', toNext);

function toLast() {
    collect = isCollect(book, lastpage)
    var kil = dn + '&collect=' + collect
    last_url += kil
    window.location.href = last_url
}

function toNext() {
    collect = isCollect(book, nextpage)
    var kil = dn + '&collect=' + collect
    next_url += kil
    window.location.href = next_url
}



//目录
var catalog = $('catalog');
var cata_button = $('cata_button');

cata_button.addEventListener('click', showCata);
var cho_cata = $$('cho_cata')

function slid(obj1, iTarget1, speed1, obj2, iTarget2, speed2) {
    var timer1 = setInterval(function() {
        if (obj1.offsetLeft == iTarget1) {
            clearInterval(timer1);

            var timer2 = setInterval(function() {
                if (obj2.offsetLeft == iTarget2) {
                    clearInterval(timer2);
                } else
                    obj2.style.left = obj2.offsetLeft + speed2 + 'px';
            }, 30);
        } else
            obj1.style.left = obj1.offsetLeft + speed1 + 'px';
    }, 30);
}

function showCata() {
    url = 'catalog/' + book + '.js?show_catalog'
    jsonp(url)

    aLeft = left_menu.offsetLeft
    bLeft = catalog.offsetLeft

    aTarget = -left_menu.offsetWidth
    bTarget = -catalog.offsetWidth
    console.log(bTarget)
    if (aLeft == 0)
        slid(left_menu, aTarget, -10, catalog, 0, 16)
    else
        slid(catalog, bTarget, -16, left_menu, 0, 10)
}

for (var i = 0; i < cho_cata.length; i++) {
    var url = ''
    cho_cata[i].index = i
    cho_cata[i].onmouseover = function() {
        this.style.height = '70px'
        this.style.lineHeight = '70px'
        this.style.cursor = 'pointer'
    }
    cho_cata[i].onmouseout = function() {
        this.style.lineHeight = '50px'
        this.style.height = '50px'
    }
    var a = ''
    cho_cata[i].onclick = function() {
        if (this.index == 0)
            a = 'red'
        else if (this.index == 1)
            a = 'west'
        else if (this.index == 2)
            a = 'water'
        else
            a = 'three'
        url = 'catalog/' + a + '.js?show_catalog'
        jsonp(url, dn)
    }
}

let button = document.querySelector('.heart');

function getLocalTime(nS) {
    return new Date(parseInt(nS)).toLocaleString().replace(/ 年 | 月/g, "-")
        .replace(/日/g, " ")
        .replace(/上午/g, "  AM  ")
        .replace(/下午/g, "  PM  ");
}


if (collect == 'true') {
    $('favourite').style.display = 'none'
    $('unfavourite').style.display = 'block'
} else {
    $('favourite').style.display = 'block'
    $('unfavourite').style.display = 'none'
}


$('favourite').onclick = function() {

    collect = 'true'
    $('favourite').style.display = 'none'
    $('unfavourite').style.display = 'block'

    console.log('添加收藏')
    var bookmarkLists = []
    var temp = {}
    if (localStorage.getItem('bookmarkLists')) {
        var gkd = JSON.parse(localStorage.getItem('bookmarkLists'))
        for (var i = 0; i < gkd.length; i++) {
            console.log(gkd[i])
            bookmarkLists.push(gkd[i])
        }
    }

    var time = new Date().getTime()

    temp['book'] = book
    temp['chapter'] = document.getElementsByTagName('title')[0].innerHTML
    temp['page'] = page
    temp['url'] = 'novel_read.html?book=' + book + '&page=' + page + '&dn=day&collect=true'
    temp['time'] = getLocalTime(time)
    temp['digest'] = $$('content')[0].innerHTML.substring(0, 80)

    bookmarkLists.push(temp)

    localStorage['bookmarkLists'] = JSON.stringify(bookmarkLists)
}
$('unfavourite').onclick = function() {

    collect = 'false'
    $('favourite').style.display = 'block'
    $('unfavourite').style.display = 'none'

    var url = 'novel_read.html?book=' + book + '&page=' + page + '&dn=day&collect=true'
    console.log('取消收藏')
    var bookmarkLists = []

    if (localStorage.getItem('bookmarkLists')) {
        var gkd = JSON.parse(localStorage.getItem('bookmarkLists'))
        console.log(gkd)
        for (var i = 0; i < gkd.length; i++) {
            if (gkd[i]['url'] == url) {
                continue
            }
            bookmarkLists.push(gkd[i])
            console.log(gkd)

        }
    }

    localStorage['bookmarkLists'] = JSON.stringify(bookmarkLists)
}