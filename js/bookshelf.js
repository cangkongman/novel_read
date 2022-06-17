function $(id){
    return document.getElementById(id);
}
function $$(classname){
    return document.getElementsByClassName(classname);
}


var boom = $$('boom')[0];
var last = $$('last')[0];
var red = $('red');
var west = $('west');
var water = $('water');
var three = $('three');

red.addEventListener('click',read_red);
function read_red(){
    console.log('red')
    window.location.href = "catalog.html?index=red"
}
west.addEventListener('click',read_west);
function read_west(){
    window.location.href = "catalog.html?index=west"
}
water.addEventListener('click',read_water);
function read_water(){
    window.location.href = "catalog.html?index=water"
}
three.addEventListener('click',read_three);
function read_three(){
    window.location.href = "catalog.html?index=three"
}
