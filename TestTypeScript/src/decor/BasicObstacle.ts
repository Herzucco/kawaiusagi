/**
 * Created by herzucco on 21/11/2014.
 */

///<reference path="../../babylon.1.14.d.ts"/>
import g = require("../game/GameObject");

export class BasicObstacle extends g.GameObject{
    mesh : BABYLON.Mesh;
    speed : number;

    constructor(name : string, size : number, scene : BABYLON.Scene, speed : number){
        super();

        this.mesh = BABYLON.Mesh.CreateBox(name, size, scene);
    }

    update(deltaTime : number){
        super.update(deltaTime);

        this.mesh.position.z -= this.speed * deltaTime;
    }
}