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
    type : string;
    constructor(name : string, size : number, scene : BABYLON.Scene, speed : number, player : p.Player, type : string){
        super();


        this.mesh = BABYLON.Mesh.CreateBox(name, size, scene);
        this.speed = speed;
        this.player = player;
        this.scene = scene;
        this.type = type;

        var obstacleMaterial = new BABYLON.StandardMaterial("prince material", scene);
        switch (this.type){
            case "OBSTACLE" :
                obstacleMaterial.diffuseColor = new BABYLON.Color3(0,0,0);
                break;
            case "COLLECTIBLE" :
                obstacleMaterial.diffuseColor = new BABYLON.Color3(1,1,0);
                break;
        }
        this.mesh.material = obstacleMaterial;

    }


    update(deltaTime : number){
        super.update(deltaTime);

        this.mesh.position.z -= this.speed * deltaTime;
        switch (this.type){
            case "OBSTACLE" :
                this.player.checkCollisionForMesh(this);
                break;
            case "COLLECTIBLE" :
                this.player.checkCollectibleCatch(this);
                break;
        }





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