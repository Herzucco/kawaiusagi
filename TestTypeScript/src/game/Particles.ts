/**
 * Created by Adrien on 20/11/2014.
 */

 ///<reference path="../../babylon.1.14.d.ts"/>
export class Particles {

    particleSystem : BABYLON.ParticleSystem;

    constructor (emiter : BABYLON.Mesh, scene : BABYLON.Scene){
        this.particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
        this.particleSystem.particleTexture = new BABYLON.Texture("./images/Flare.png", scene);
        this.particleSystem.emitter = emiter;
        this.particleSystem.textureMask = new BABYLON.Color4(0.1, 0.8, 0.8, 1.0);
        this.particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, 0); // Starting all From
        this.particleSystem.maxEmitBox = new BABYLON.Vector3(1, 0, 0); // To...
        // Colors of all particles (splited in 2 + specific color before dispose)
        this.particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
        this.particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
        this.particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
        // Size of each particle (random between...)
        this.particleSystem.minSize = 0.1;
        this.particleSystem.maxSize = 0.5;
        // Life time of each particle (random between...)
        this.particleSystem.minLifeTime = 0.3;
        this.particleSystem.maxLifeTime = 1.5;
        this.particleSystem.emitRate = 1000;
        this.particleSystem.manualEmitCount = 300;
        //Set the gravity of all particles (not necessarily down)
        this.particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
        this.particleSystem.direction1 = new BABYLON.Vector3(-7, 8, 3);
        this.particleSystem.direction2 = new BABYLON.Vector3(7, 8, -3);
        this.particleSystem.minAngularSpeed = 0;
        this.particleSystem.maxAngularSpeed = Math.PI;
        this.particleSystem.minEmitPower = 1;
        this.particleSystem.maxEmitPower = 3;
        this.particleSystem.updateSpeed = 0.005;

        this.particleSystem.targetStopDuration = 5;
        this.particleSystem.disposeOnStop = true;
        this.particleSystem.start();
    }
}