/**
 * Created by BreizhPanda on 08/12/2014.
 */
///<reference path="../../babylon.1.14.d.ts"/>

export class deathParticles {

    particleSystem : BABYLON.ParticleSystem;

    constructor (emitter : BABYLON.Mesh, scene : BABYLON.Scene){
        this.particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
        this.particleSystem.particleTexture = new BABYLON.Texture("./images/Flare.png", scene);
        this.particleSystem.emitter = emitter;

        this.particleSystem.minEmitBox = new BABYLON.Vector3(-1, 1, 0); // Starting all from
        this.particleSystem.maxEmitBox = new BABYLON.Vector3(1, -1, 0); // To...

        // Colors of all particles
        this.particleSystem.color1 = new BABYLON.Color4(1, 0, 0, 1.0);
        this.particleSystem.color2 = new BABYLON.Color4(0, 0, 1, 1.0);
        this.particleSystem.colorDead = new BABYLON.Color4(1, 0, 1, 0.0);

        // Size of each particle (random between...
        this.particleSystem.minSize = 0.3;
        this.particleSystem.maxSize = 0.8;

        // Life time of each particle (random between...
        this.particleSystem.minLifeTime = 1;
        this.particleSystem.maxLifeTime = 2;

        // Emission rate
        this.particleSystem.emitRate = 2000;

        // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
        this.particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

        // Direction of each particle after it has been emitted
        this.particleSystem.direction1 = new BABYLON.Vector3(-10,10,-10);
        this.particleSystem.direction2 = new BABYLON.Vector3(10,-10,-10);

        // Angular speed, in radians
        this.particleSystem.minAngularSpeed = 0;
        this.particleSystem.maxAngularSpeed = Math.PI;

        // Speed
        this.particleSystem.minEmitPower = 10;
        this.particleSystem.maxEmitPower = 30;
        this.particleSystem.updateSpeed = 0.01;

        this.particleSystem.targetStopDuration = 0.25;
        this.particleSystem.disposeOnStop = true;

        // Start the particle system
        this.particleSystem.start();


    }
}