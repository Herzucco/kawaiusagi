/**
 * Created by herzucco on 07/12/2014.
 */



/**
 * Created by Herzucco on 20/11/2014.
 */
///<reference path="../../babylon.1.14.d.ts"/>
import g = require("../game/GameObject");
import inp = require("../inputs/inputs");
import bo = require("../decor/BasicObstacle");
import ga = require("../game/game");


export class Helix extends g.GameObject{
    public x : number;
    public y : number;
    public z : number;
    public obstaclesNb : number;
    public radius : number;
    startRotationSpeed : number;
    obstacleRadiusRatio : number;
    rotationDir : number;
    rotationSpeed : number;
    public obstacleTable : bo.BasicObstacle[];
    rotationSpeedRatio : number;
    scene : BABYLON.Scene;
    public sphereMesh : BABYLON.Mesh;
    color : string;
    speed : number;
    input : string;
    timer : number;
    timeToReach : number = 0.5;

    constructor(x : number, y : number, z :number, speed : number, color: string, scene : BABYLON.Scene) {
        super();

        if(color == "RED"){
            this.color = color;
            this.rotationDir = 1; // 1 : sens anti-horaire, -1 : sens horaire
            this.input = "Z";
        }else{
            this.color = color;
            this.rotationDir = -1; // 1 : sens anti-horaire, -1 : sens horaire
            this.input = "A";
        }

        this.x = x;
        this.y = y;
        this.z = z;
        this.rotationSpeedRatio = 10;
        this.radius = 5;
        this.startRotationSpeed = 0.005;
        this.rotationSpeed = this.startRotationSpeed;
        this.obstacleRadiusRatio = 5;
        this.obstaclesNb = Math.floor(Math.random()*4)+2;
        this.obstacleTable = [];
        this.speed = speed;
        this.timer = this.timeToReach;

        // création du mesh Sphere //
        this.sphereMesh  = BABYLON.Mesh.CreateSphere("Helix", 10, 1, scene);
        this.sphereMesh.position = new BABYLON.Vector3(0, 0, this.z);
        this.scene = scene;
        //this.sphereMesh.isVisible = false;

        this.generate();

    }


    update(deltaTime : number){
        super.update(deltaTime);

        this.timer += deltaTime/10;

        this.rotateSphere();
        this.sphereMesh.position.z += this.speed * (deltaTime/10);

        if(inp.inputs[this.input] && this.timer >= this.timeToReach){
            this.timer = 0;
            this.rotationDir *= -1;
        }

        if(this.sphereMesh.position.z >= 55){
            ga.UI.score += 1;
            this.destroy();
        }
    }

    rotateSphere() {
        this.sphereMesh.rotation.z += (this.rotationSpeed/this.obstaclesNb*this.rotationSpeedRatio) * this.rotationDir;
    }

    generate(){
        // création des pales //
        for(i=1; i<=this.obstaclesNb; i++)  // On va répartir les pales équitablement autour de la sphere en fonction de leur nombre
        {
            var i : number;
            var progress : number = i/this.obstaclesNb;
            var angle : number = progress * Math.PI * 2;
            var obstacleRatio = this.radius/this.obstacleRadiusRatio;
            var posX : number = Math.sin(angle) * (this.radius/2 + obstacleRatio*0.5) - this.x;
            var posY : number = Math.cos(angle) * (this.radius/2 + obstacleRatio*0.5) - this.y;
            var posZ : number = 0;

            var obstacle = new bo.BasicObstacle(posX, posY, posZ, obstacleRatio, this.color, this.sphereMesh, this.scene);

            this.obstacleTable.push(obstacle);
        }
    }

    destroy(){
        this.sphereMesh.dispose(false);

        super.destroy();
    }
}