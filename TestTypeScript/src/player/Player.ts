/**
 * Created by BreizhPanda on 20/11/2014.
 */
///<reference path="../../babylon.1.14.d.ts"/>
export class Player{

    x : number;
    y : number;
    z : number;
    characterNb : number;
    radius : number;
    startRotationSpeed : number;
    characterRadiusRatio : number;
    rotationDir : number;
    rotationSpeed : number;
    characterTable : BABYLON.Mesh[];

    scene : BABYLON.Scene;
    sphereMesh : BABYLON.Mesh;

    constructor(x : number, y : number, z :number, scene : BABYLON.Scene) {
        this.x = x;
        this.y = y;
        this.z = z;

        this.radius = 5;
        this.rotationDir = 1; // 1 : sens anti-horaire, -1 : sens horaire
        this.startRotationSpeed = 0.01;
        this.rotationSpeed = this.startRotationSpeed;
        this.characterRadiusRatio = 5;
        this.characterNb = 5;
        this.characterTable = [];

        // création du mesh Sphere //
        this.sphereMesh  = BABYLON.Mesh.CreateSphere("PlayerSphere", 10, this.radius, scene);
        this.sphereMesh.position = new BABYLON.Vector3(this.x, this.y, this.z);


        // création des princes //
        for(i=1; i<=this.characterNb; i++)
        {
            var i : number;
            var progress : number = i/this.characterNb;
            var angle : number = progress * Math.PI * 2;
            var posX : number = Math.sin(angle) * (this.radius/2 + (this.radius/this.characterRadiusRatio)*0.5) - this.x;
            var posY : number = Math.cos(angle) * (this.radius/2 + (this.radius/this.characterRadiusRatio)*0.5) - this.y;
            var posZ : number = 0;

            var princeMesh : BABYLON.Mesh  = BABYLON.Mesh.CreateSphere("PrinceSphere", 10, this.radius/this.characterRadiusRatio, scene);

           princeMesh.parent = this.sphereMesh;
            princeMesh.position = new BABYLON.Vector3(posX,posY, posZ);
            this.characterTable.push(princeMesh);
        }
    }

    update(){
        this.rotateSphere();

    }

    rotateSphere() {
        this.sphereMesh.rotation.z += this.rotationSpeed * this.rotationDir;
    }

}