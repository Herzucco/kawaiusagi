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

        this.particleSystem.minEmitBox = new BABYLON.Vector3(-0.2, 0, 0); // Starting all from
        this.particleSystem.maxEmitBox = new BABYLON.Vector3(0.2, 0, 0); // To...

        // Colors of all particles
        this.particleSystem.color1 = new BABYLON.Color4(0.8, 0.03, 0.14, 1.0);
        this.particleSystem.color2 = new BABYLON.Color4(0.89, 0.29, 0.03, 1.0);
        this.particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

        // Size of each particle (random between...
        this.particleSystem.minSize = 0.1;
        this.particleSystem.maxSize = 1;

        // Life time of each particle (random between...
        this.particleSystem.minLifeTime = 0.3;
        this.particleSystem.maxLifeTime = 1;

        // Emission rate
        this.particleSystem.emitRate = 1500;

        // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
        this.particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

        // Direction of each particle after it has been emitted
        this.particleSystem.direction1 = new BABYLON.Vector3(Math.sin(Math.random()*10), Math.sin(Math.random()*10), Math.sin(Math.random()*10));
        this.particleSystem.direction2 = new BABYLON.Vector3(Math.sin(Math.random()*10), Math.sin(Math.random()*10), Math.sin(Math.random()*10));

        // Angular speed, in radians
        this.particleSystem.minAngularSpeed = 0;
        this.particleSystem.maxAngularSpeed = Math.PI;

        // Speed
        this.particleSystem.minEmitPower = 10;
        this.particleSystem.maxEmitPower = 10;
        this.particleSystem.updateSpeed = 0.005;

        this.particleSystem.targetStopDuration = 0.25;
        this.particleSystem.disposeOnStop = true;

        // Start the particle system
        this.particleSystem.start();


    }
}