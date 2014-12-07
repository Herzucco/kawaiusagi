/**
 * Created by BreizhPanda on 07/12/2014.
 */
    ///<reference path="../../babylon.1.14.d.ts"/>
export class starParticles {

    particleSystem : BABYLON.ParticleSystem;
    width : number;
    height : number;


    constructor (height : number, width : number, scene : BABYLON.Scene){
        this.particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
        this.particleSystem.particleTexture = new BABYLON.Texture("./images/flare1.jpg", scene);
        this.width = width;
        this.height = height;
        var emiterMesh : BABYLON.Mesh = BABYLON.Mesh.CreateSphere("star emiter", 1, 1, scene);
        emiterMesh.position.z = 20;
        emiterMesh.isVisible = false;
        this.particleSystem.emitter = emiterMesh;

       this.particleSystem.minEmitBox = new BABYLON.Vector3(this.width/2 *(-1), this.height/2 *(-1), 0); // Starting all from
        this.particleSystem.maxEmitBox = new BABYLON.Vector3(this.width/2, this.height/2, 0); // To...*/

        // Colors of all particles
        this.particleSystem.color1 = new BABYLON.Color4(0, 0, 0, 1.0);
        //this.particleSystem.color2 = new BABYLON.Color4(0, 0, 0, 0.5);


        // Size of each particle (random between...
        this.particleSystem.minSize = 0.1;
        this.particleSystem.maxSize = 1;
        this.particleSystem.minAngularSpeed = 0;
        this.particleSystem.maxAngularSpeed = 0;
        // Life time of each particle (random between...
        this.particleSystem.minLifeTime = 2;
        this.particleSystem.maxLifeTime = 2;

        // Emission rate
        this.particleSystem.emitRate = 500;

        // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
        this.particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

        // Direction of each particle after it has been emitted
        this.particleSystem.direction1 = new BABYLON.Vector3(0, 0, 50);
        //this.particleSystem.direction2 = new BABYLON.Vector3(0,1,0);

        // Angular speed, in radians
        this.particleSystem.minAngularSpeed = 0;
        this.particleSystem.maxAngularSpeed = Math.PI;

        // Speed
        this.particleSystem.minEmitPower = 10;
        this.particleSystem.maxEmitPower = 10;
        this.particleSystem.updateSpeed = 0.005;

       // this.particleSystem.targetStopDuration = 0.25;
        //this.particleSystem.disposeOnStop = true;

        // Start the particle system
        this.particleSystem.start();


    }
}