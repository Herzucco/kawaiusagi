/**
 * Created by herzucco on 21/11/2014.
 */
///<reference path="../../babylon.1.14.d.ts"/>
import h = require("./Helix");
import p = require("../player/Player");


export var spawnDistance : number;
export var globalSpeed : number;
export var decreaseFactor : number;

var scene : BABYLON.Scene;
var player : p.Player;
var frequency : number;
var time : number = 0;
var collectibleFrequency : number = 3;
var type : string = "";

export function generateObstacle(radius : number, scene : BABYLON.Scene, player : p.Player, color : string){
    var helix : h.Helix = new h.Helix(0, 0, spawnDistance, globalSpeed, color, player, scene);
}

export function launch(f : number, p : p.Player, s : BABYLON.Scene){
    frequency = f;
    player = p;
    scene = s;
}

export function update(deltaTime : number){
    time += deltaTime/10;

    frequency -= decreaseFactor * (deltaTime / 10);
    globalSpeed += decreaseFactor * (deltaTime / 10);
    if(time >= frequency){
        time = 0;
        var whichObstacle = Math.random()*10;
        var color;
        if(whichObstacle > 5) {
            color = "RED";
        }else{
            color = "BLUE";
        }
        generateObstacle(player.radius, scene, player, color);
    }
}
