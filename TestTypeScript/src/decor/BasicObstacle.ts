/**
 * Created by herzucco on 21/11/2014.
 */

///<reference path="../../babylon.1.14.d.ts"/>
import g = require("../game/GameObject");
import p = require("../player/Player");
import m = require("../rendering/materials");

/************************************************
 * Obstacle of Helix Class
 *
 * @number : x - x relative position
 * @number : y - y relative position
 * @number : z - z relative position
 * @number : ratio - obstacle ratio
 * @number : color - color of the obstacle mesh
 * @number : sphereMesh - parent mesh of the obstacle's mesh
 * @number : scene - scene containing the mesh
 ************************************************/
export class BasicObstacle extends g.GameObject {
    public jumpHeight : number;

    x : number;
    y : number;
    z : number;

    player : p.Player;

    scene : BABYLON.Scene;
    sphereMesh : BABYLON.Mesh;
    mesh : BABYLON.Mesh;

    ratio : number;
    isJumping : boolean;
    isJumper : boolean;

    constructor(x : number, y : number, z :number, ratio : number, color : string, player : p.Player, sphereMesh : BABYLON.Mesh, scene : BABYLON.Scene) {
        super();

        //assigning values
        this.x = x;
        this.y = y;
        this.z = z;
        this.player = player;
        this.sphereMesh = sphereMesh;
        this.ratio = ratio;
        this.isJumping = false;
        this.jumpHeight = 2;
        this.scene = scene;

        //creating, positioning and scaling the mesh
        var mesh : BABYLON.Mesh  = BABYLON.Mesh.CreateBox("box", this.ratio, scene);
        mesh.rotation.z = (Math.atan2(this.y - this.sphereMesh.position.y, this.x - this.sphereMesh.position.x));
        mesh.parent = this.sphereMesh;
        mesh.position = new BABYLON.Vector3(this.x,this.y, this.z);
        mesh.scaling.y = 5;

        //get material for the mesh
        mesh.material = m.GetMaterial(color+"_Obstacle");
        mesh.jumpAnimationVector = new BABYLON.Vector3(0, 0.5, 0);

        if(Math.random()*10 > 7.5){
            var keys = [];
            keys.push({
                frame: 0,
                value: new BABYLON.Vector3(0, 0.5, 0)
            },{
                frame: 25,
                value: new BABYLON.Vector3(0, this.jumpHeight-1, 0)
            },{
                frame: 40,
                value: new BABYLON.Vector3(0, this.jumpHeight, 0)
            },{
                frame: 60,
                value: new BABYLON.Vector3(0, 0.5, 0)
            });

            var jumpAnimation = new BABYLON.Animation("anim", "jumpAnimationVector", 60, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
            jumpAnimation.setKeys(keys);
            mesh.animations.push(jumpAnimation);

            this.isJumper = true;
        }

        this.mesh = mesh;

    }

    endJump(){
        this.isJumping = false;
    }

    update(deltaTime : number){
        super.update(deltaTime);

        this.mesh.setPositionWithLocalVector(this.mesh.jumpAnimationVector);
        this.jump();
        this.player.checkCollisionForMesh(this);
    }

    jump(){
        if(!this.isJumping && this.isJumper){
            this.scene.beginAnimation(this.mesh, 0, 60, false, 1,
                this.endJump.bind(this));

            this.isJumping = true;
        }

    }
}