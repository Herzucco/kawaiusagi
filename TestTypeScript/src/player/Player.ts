/**
 * Created by BreizhPanda on 20/11/2014.
 */
///<reference path="../../babylon.1.14.d.ts"/>
import g = require("../game/GameObject");
import inp = require("../inputs/inputs");
import bo = require("../decor/BasicObstacle");

export class Player extends g.GameObject{

    public x : number;
    public y : number;
    public z : number;
    public characterNb : number;
    public radius : number;
    startRotationSpeed : number;
    characterRadiusRatio : number;
    rotationDir : number;
    rotationSpeed : number;
    characterTable : Prince[];

    scene : BABYLON.Scene;
    sphereMesh : BABYLON.Mesh;

    constructor(x : number, y : number, z :number, scene : BABYLON.Scene) {
        super();

        this.x = x;
        this.y = y;
        this.z = z;

        this.radius = 5;
        this.rotationDir = 1; // 1 : sens anti-horaire, -1 : sens horaire
        this.startRotationSpeed = 0.01;
        this.rotationSpeed = this.startRotationSpeed;
        this.characterRadiusRatio = 5;
        this.characterNb = 7;
        this.characterTable = [];


        // création du mesh Sphere //
        this.sphereMesh  = BABYLON.Mesh.CreateSphere("PlayerSphere", 10, this.radius, scene);
        this.sphereMesh.position = new BABYLON.Vector3(this.x, this.y, this.z);
        this.scene = scene;
        this.sphereMesh.isVisible = false;


        // création des princes //
        for(i=1; i<=this.characterNb; i++)
        {
            var i : number;
            var progress : number = i/this.characterNb;
            var angle : number = progress * Math.PI * 2;
            var posX : number = Math.sin(angle) * (this.radius/2 + (this.radius/this.characterRadiusRatio)*0.5) - this.x;
            var posY : number = Math.cos(angle) * (this.radius/2 + (this.radius/this.characterRadiusRatio)*0.5) - this.y;
            var posZ : number = 0;
            var characterRatio = this.radius/this.characterRadiusRatio;
            var color : string;
            if(i%2 == 0)
                color = "BLUE";
            else
                color = "RED";

            var prince = new Prince(posX, posY, posZ, color, characterRatio, this.sphereMesh, scene);

            this.characterTable.push(prince);
        }
    }

    update(deltaTime : number){
        super.update(deltaTime);
        
        this.rotateSphere();

        var i : number;
        for(i = 0; i < this.characterTable.length; i++)
        {
            this.characterTable[i].mesh.setPositionWithLocalVector(this.characterTable[i].mesh.jumpAnimationVector);
        }

        if(inp.inputs["A"]){
            for(i = 0; i < this.characterTable.length; i++)
            {
                this.scene.beginAnimation(this.characterTable[i].mesh, 0, 25, false);
            }
        }
    }

    rotateSphere() {
        this.sphereMesh.rotation.z += this.rotationSpeed * this.rotationDir;
    }

    checkCollisionForMesh(obstacle : bo.BasicObstacle){
        var i : number;
        for(i = 0; i < this.characterTable.length; i++){
            if(obstacle.mesh.intersectsMesh(this.characterTable[i].sphereMesh)){
                obstacle.destroy();
                this.lostPrince(i);
            }
        }
    }

    lostPrince(index : number){
        console.log("prince "+index+" lost");
    }
}

class Prince {

    x : number;
    y : number;
    z : number;
    scene : BABYLON.Scene;
    color : string;
    sphereMesh : BABYLON.Mesh;
    characterRatio : number;
    mesh : BABYLON.Mesh;

    constructor(x : number, y : number, z :number, color : string, characterRatio : number, sphereMesh : BABYLON.Mesh, scene : BABYLON.Scene) {

        this.x = x;
        this.y = y;
        this.z = z;
        this.color = color;
        this.sphereMesh = sphereMesh;
        this.characterRatio = characterRatio;

       // var princeMesh : BABYLON.Mesh  = BABYLON.Mesh.CreateSphere("PrinceSphere", 10, this.characterRadius , scene);
        var princeMesh : BABYLON.Mesh  = BABYLON.Mesh.CreateBox("box", this.characterRatio, scene);
        princeMesh.rotation.z = (Math.atan2(this.y - this.sphereMesh.position.y, this.x - this.sphereMesh.position.x));
        princeMesh.parent = this.sphereMesh;
        princeMesh.position = new BABYLON.Vector3(this.x,this.y, this.z);

        princeMesh.jumpAnimationVector = new BABYLON.Vector3(0, 3, 0);

        var animationBox = new BABYLON.Animation("anim", "jumpAnimationVector", 60, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

        var keys = [];
        keys.push({
            frame: 0,
            value: new BABYLON.Vector3(0, 3, 0)
        },{
            frame: 10,
            value: new BABYLON.Vector3(0, 4.5, 0)
        },{
            frame: 15,
            value: new BABYLON.Vector3(0, 5, 0)
        },{
            frame: 25,
            value: new BABYLON.Vector3(0, 3, 0)
        });

        animationBox.setKeys(keys);
        princeMesh.animations.push(animationBox);

        this.mesh = princeMesh;

        this.mesh.actionManager = new BABYLON.ActionManager(scene);
    }

}