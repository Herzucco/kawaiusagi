/**
 * Created by herzucco on 21/11/2014.
 */

///<reference path="../../babylon.1.14.d.ts"/>
import c = require("./canvasCreator");
import g = require("./GameObject");
import cam = require("../rendering/camera");
import p = require("../player/Player");
import og = require("../decor/ObstaclesGenerator");
import u = require("../UI/UI");
import ptcl = require("./Particles");
export var canvas : HTMLCanvasElement;
export var scene : BABYLON.Scene;
export var engine : BABYLON.Engine;
export var UI : UI;

export function Start(){
    canvas = c.CreateCanvas('scene', 500, 500);
    scene = c.CreateBabylonScene(canvas, 500, 500);
    engine = scene.getEngine();

    engine.runRenderLoop(function() {
        update(BABYLON.Tools.GetDeltaTime()/100);
    });

    cam.InitCamera("mainCamera", scene);
    cam.CameraTest(canvas);
    UI = new u.UI(canvas.width,canvas.height);
    var player = new p.Player(0,0,20,scene);

    var mainLight = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0, -5, -50), scene);
    mainLight.diffuse = new BABYLON.Color3(1, 1, 1);
    mainLight.specular = new BABYLON.Color3(0, 0, 0);

    og.spawnDistance = 100;
    og.globalSpeed = 1;
    og.decreaseFactor = 0.01;
    var particle = new ptcl.Particles(player.sphereMesh,scene);
    og.launch(2, player, scene);
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
