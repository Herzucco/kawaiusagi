/**
 * Created by herzucco on 21/11/2014.
 */

///<reference path="../../babylon.1.14.d.ts"/>
import g = require("../game/GameObject");
import p = require("../player/Player");


export class BasicObstacle extends g.GameObject{
    public mesh : BABYLON.Mesh;
    speed : number;
    player : p.Player;
    scene : BABYLON.Scene;
    line : BABYLON.LinesMesh;

    constructor(name : string, size : number, scene : BABYLON.Scene, speed : number, player : p.Player){
        super();


        this.mesh = BABYLON.Mesh.CreateBox(name, size, scene);
        this.speed = speed;
        this.player = player;
        this.scene = scene;


    }


    update(deltaTime : number){
        super.update(deltaTime);

        this.mesh.position.z -= this.speed * deltaTime;
        this.player.checkCollisionForMesh(this);

        if(this.line == null){
            this.line = BABYLON.Mesh.CreateLines("lines", [
                this.mesh.position,
                new BABYLON.Vector3(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z-1000),
            ], this.scene);
        }

        if(this.mesh.position.z <= 10){
            this.destroy();
        }
    }

    destroy(){
        this.mesh.dispose(false);
        this.line.dispose(false);

        super.destroy();
    }
}