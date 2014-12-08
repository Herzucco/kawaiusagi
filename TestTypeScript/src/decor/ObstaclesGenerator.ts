/**
 * Created by herzucco on 21/11/2014.
 */
///<reference path="../../babylon.1.14.d.ts"/>
import h = require("./Helix");
import p = require("../player/Player");


var spawnDistance : number;
var globalSpeed : number;
var decreaseFactor : number;

var scene : BABYLON.Scene;
var player : p.Player;
var frequency : number;
var time : number = 0;

var isRunning : boolean = false;
export function generateObstacle(radius : number, scene : BABYLON.Scene, player : p.Player, color : string){
    var helix : h.Helix = new h.Helix(0, 0, spawnDistance, globalSpeed, color, player, scene);
}

export function init(sd : number, gs : number, df : number, f : number, s : BABYLON.Scene){
    spawnDistance = sd;
    globalSpeed = gs;
    decreaseFactor = df;
    frequency = f;
    scene = s;
}

export function launch(p : p.Player){
    player = p;
    isRunning = true;
}

export function stop(){
    isRunning = false;
    time = 0;
}

export function update(deltaTime : number){
    if(isRunning){
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
}
