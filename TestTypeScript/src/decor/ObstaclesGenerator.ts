/**
 * Created by herzucco on 21/11/2014.
 */
///<reference path="../../babylon.1.14.d.ts"/>
import bo = require("./BasicObstacle");
import p = require("../player/Player");


export var spawnDistance : number;
export var globalSpeed : number;

export function generateObstacle(radius : number, scene : BABYLON.Scene, player : p.Player){
    var angle : number = Math.random() * 10 * Math.PI * 2;
    var posX : number = Math.sin(angle) * radius/2;
    var posY : number = Math.cos(angle) * radius/2;

    var b : bo.BasicObstacle = new bo.BasicObstacle("bo", 1, scene, globalSpeed, player);
    b.mesh.position = new BABYLON.Vector3(posX, posY, spawnDistance);
}