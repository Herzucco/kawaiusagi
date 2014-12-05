/**
 * Created by BreizhPanda on 21/11/2014.
 */
///<reference path="../../babylon.1.14.d.ts"/>
export var inputs : Object = {

};

export var codes : Object = {
    65 : "A",
    90 : "Z"
};

window.addEventListener("keydown", function(e){
    inputs[codes[e.keyCode]] = true;
});

window.addEventListener("keyup", function(e){
    inputs[codes[e.keyCode]] = false;
});