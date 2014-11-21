/**
 * Created by herzucco on 21/11/2014.
 */

///<reference path="../../babylon.1.14.d.ts"/>
import g = require("../game/GameObject");
import p = require("../player/Player");

export class BasicObstacle extends g.GameObject{
    mesh : BABYLON.Mesh;
    speed : number;
    player : p.Player;

    constructor(name : string, size : number, scene : BABYLON.Scene, speed : number, player : p.Player){
        super();

        this.mesh = BABYLON.Mesh.CreateBox(name, size, scene);
        this.speed = speed;
    }

    update(deltaTime : number){
        super.update(deltaTime);

        this.mesh.position.z -= this.speed * deltaTime;
        //this.player.checkCollisionForMesh(this.mesh);
    }
}