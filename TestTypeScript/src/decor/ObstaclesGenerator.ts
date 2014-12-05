/**
 * Created by herzucco on 21/11/2014.
 */
///<reference path="../../babylon.1.14.d.ts"/>
import bo = require("./BasicObstacle");
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

export function generateObstacle(radius : number, scene : BABYLON.Scene, player : p.Player, type : string){
    var angle : number = Math.random() * 10 * Math.PI * 2;
    var posX : number = Math.sin(angle) * radius/2;
    var posY : number = Math.cos(angle) * radius/2;

    var b : bo.BasicObstacle = new bo.BasicObstacle(""+angle+"", 1, scene, globalSpeed, player, type);
    b.mesh.position = new BABYLON.Vector3(posX, posY, spawnDistance);
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
        if(whichObstacle > collectibleFrequency)
        {
            type = "OBSTACLE"
        }
        else
        {
            type = "COLLECTIBLE";
        }
        generateObstacle(player.radius, scene, player, type);
    }
}
