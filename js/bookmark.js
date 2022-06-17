function $(id) {
    return document.getElementById(id)
}
function $$(classname) {
    return document.getElementsByClassName(classname)
}

function isHave(bookmarkLists) {
    var tbody = document.getElementsByTagName('tbody')[0]
    var book = ''
    if (bookmarkLists[0]) {
        tbody.innerHTML = ''
        for (var i = 0; i < bookmarkLists.length; i++) {
            tr = document.createElement('tr');
            td1 = document.createElement('td');
            td2 = document.createElement('td');
            td3 = document.createElement('td');
            td4 = '<td class="nocollect" onclick=del(this)>取消收藏</td>';
            a1 = document.createElement('a');
            a2 = document.createElement('a');

            td1.className = 'bookname';
            td2.className = 'chap';
            td3.className = 'time';

            book = bookmarkLists[i]['book']

            a1.href = 'catalog.html?book=' + book;
            a2.href = bookmarkLists[i]['url'];

            if (book == 'red')
                book = '红楼梦';
            if (book == 'west')
                book = '西游记';
            if (book == 'water')
                book = '水浒传';
            if (book == 'three')
                book = '三国演义';
            a1.innerHTML = book;
            a2.innerHTML = bookmarkLists[i]['chapter'];
            td3.innerHTML = bookmarkLists[i]['time'];
            td4.innerHTML = '取消收藏';

            td1.appendChild(a1);
            td2.appendChild(a2);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            var a = tr.innerHTML;
            tr.innerHTML = a + td4;
            tbody.appendChild(tr);
        }
    }
    else {
        tr = document.createElement('tr');
        td1 = document.createElement('td');
        td2 = document.createElement('td');
        td3 = document.createElement('td');
        td4 = document.createElement('td');

        a = document.createElement('a');

        td1.innerHTML = '还没有收藏文章';
        td2.innerHTML = '还没有收藏文章';
        td3.innerHTML = '还没有收藏文章';
        a.innerHTML = '点击前往书架';
        a.href = 'bookshelf.html';

        td4.appendChild(a);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tbody.appendChild(tr);
    }

}

isHave(JSON.parse(localStorage.getItem('bookmarkLists')))

function del(obj) {
    if (confirm("是否取消收藏")) {

        obj.parentNode.parentNode.removeChild(obj.parentNode)
        var chap = obj.parentNode.getElementsByTagName('a')[1].innerHTML
        var bookmarkLists = []

        if (localStorage.getItem('bookmarkLists')) {
            var gkd = JSON.parse(localStorage.getItem('bookmarkLists'))
            console.log(gkd)
            for (var i = 0; i < gkd.length; i++) {
                if (gkd[i]['chapter'] == chap) {
                    continue
                }
                bookmarkLists.push(gkd[i])
                console.log(gkd)
            }
        }
        localStorage['bookmarkLists'] = JSON.stringify(bookmarkLists)
        isHave(bookmarkLists)
    }
}
