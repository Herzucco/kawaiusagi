/**
 * Created by herzucco on 21/11/2014.
 */

///<reference path="../../babylon.1.14.d.ts"/>
import c = require("./canvasCreator");
import g = require("./GameObject");
import cam = require("../rendering/camera");

export var canvas : HTMLCanvasElement;
export var scene : BABYLON.Scene;
export var engine : BABYLON.Engine;

export function Start(){
    canvas = c.CreateCanvas('scene', 500, 500);
    scene = c.CreateBabylonScene(canvas, 500, 500);
    engine = scene.getEngine();

    engine.runRenderLoop(function() {
        update(BABYLON.Tools.GetDeltaTime()/100);
    });

    cam.InitCamera("mainCamera", scene);
    cam.CameraTest(canvas);
}

function update(deltaTime : number) {
    var i : number;

    g.GarbageObjects();

    for(i = 0; i < g.gameObjects.length; i++){
        g.gameObjects[i].update(deltaTime);
    }

    scene.render();
}
