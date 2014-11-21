/**
 * Created by herzucco on 21/11/2014.
 */

///<reference path="../../babylon.1.14.d.ts"/>
export var camera : BABYLON.Camera;

export function InitCamera(name : string, scene : BABYLON.Scene){
    camera = new BABYLON.FreeCamera(name, new BABYLON.Vector3(0, 0, 0), scene);
}

export function CameraTest(canvas : HTMLCanvasElement){
    camera.attachControl(canvas);
}