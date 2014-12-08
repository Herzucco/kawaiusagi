/**
 * Created by BreizhPanda on 20/11/2014.
 */
///<reference path="../../babylon.1.14.d.ts"/>
import g = require("../game/GameObject");
import inp = require("../inputs/inputs");
import bo = require("../decor/BasicObstacle");
import ga = require("../game/game");
import he = require("../decor/Helix");

export class Player extends g.GameObject {

    public x:number;
    public y:number;
    public z:number;
    public radius:number;
    scene:BABYLON.Scene;
    public sphereMesh:BABYLON.Mesh;

    constructor(x:number, y:number, z:number, scene:BABYLON.Scene) {
        super();

        this.x = x;
        this.y = y;
        this.z = z;
        this.radius = 0.05;


        // création du mesh Sphere //
        console.log(scene);
        this.sphereMesh = BABYLON.Mesh.CreateSphere("PlayerSphere", 10, this.radius, scene);
        this.sphereMesh.position = new BABYLON.Vector3(this.x, this.y, this.z);
        this.scene = scene;
    }


    update(deltaTime:number) {
        super.update(deltaTime);
    }

    checkCollisionForMesh(obstacle:bo.BasicObstacle) {
        if (obstacle.mesh.intersectsMesh(this.sphereMesh)) {
            obstacle.destroy();
            this.destroyPlayer();
        }
    }

    checkCollisionForCollectible(obstacle:bo.BasicObstacle) {
        if (obstacle.mesh.intersectsMesh(this.sphereMesh)) {
            ga.UI.score += 10;
        }
    }

    destroyPlayer() {
        ga.Stop();
        this.sphereMesh.dispose();
        console.log("player dead");

    }
}