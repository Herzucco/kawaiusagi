/**
 * Created by BreizhPanda on 21/11/2014.
 */
///<reference path="../../babylon.1.14.d.ts"/>

//The inputs dictionary, used to check inputs holding in update loop
export var inputs : Object = {

};

export var codes : Object = {
    65 : "A",
    90 : "Z",
    69 : "E",
    32 : "Space"
};

window.addEventListener("keydown", function(e){
    inputs[codes[e.keyCode]] = true;
});

window.addEventListener("keyup", function(e){
    inputs[codes[e.keyCode]] = false;
});