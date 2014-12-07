/**
 * Created by herzucco on 21/11/2014.
 */

///<reference path="../../babylon.1.14.d.ts"/>
import m = require("../rendering/materials")
import c = require("./canvasCreator");
import g = require("./GameObject");
import cam = require("../rendering/camera");
import p = require("../player/Player");
import og = require("../decor/ObstaclesGenerator");
import u = require("../UI/UI");
import ptcl = require("./Particles");
import sp = require("./starParticles");

export var canvas : HTMLCanvasElement;
export var scene : BABYLON.Scene;
export var engine : BABYLON.Engine;
export var UI : u.UI;
export var layer : BABYLON.Layer;

export function Start(){
    canvas = c.CreateCanvas('scene', 1024, 768);
    scene = c.CreateBabylonScene(canvas, 1024, 768);
    scene.clearColor = new BABYLON.Color3(0,0,0);
    engine = scene.getEngine();

    engine.runRenderLoop(function() {
        update(BABYLON.Tools.GetDeltaTime()/100);
    });

    cam.InitCamera("mainCamera", scene);
    cam.CameraTest(canvas);
    UI = new u.UI(canvas.width,canvas.height);
    UI.TweenAlpha(true);
    var player = new p.Player(0,0,20,scene);

    var mainLight = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0, 5, -50), scene);
    mainLight.diffuse = new BABYLON.Color3(1, 1, 1);
    mainLight.specular = new BABYLON.Color3(0, 0, 0);

    generateMaterials();

    og.spawnDistance = 100;
    og.globalSpeed = 10;
    og.decreaseFactor = 0.01;
    var particle : ptcl.Particles = new ptcl.Particles(player.sphereMesh,scene);
    var starparticle : sp.starParticles = new sp.starParticles(50,50, scene);
    og.launch(2, player, scene);

    //ex background
    //layer = new BABYLON.Layer("background", "./images/skybox.png", scene,true);
}

function update(deltaTime : number) {
    scene.render();
    UI.DrawUI();

    var i : number;
    g.GarbageObjects();

    for(i = 0; i < g.gameObjects.length; i++){
        g.gameObjects[i].update(deltaTime);
    }
    og.update(deltaTime);
}

function generateMaterials(){
    var redMaterial = new BABYLON.StandardMaterial("red obstacle material", scene);
    var blueMaterial = new BABYLON.StandardMaterial("blue obstacle material", scene);

    redMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
    blueMaterial.diffuseColor = new BABYLON.Color3(0, 0, 1);

    m.AddMaterial("RED_Obstacle", redMaterial);
    m.AddMaterial("BLUE_Obstacle", blueMaterial);
}
