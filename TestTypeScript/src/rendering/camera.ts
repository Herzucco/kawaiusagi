/**
 * Created by herzucco on 21/11/2014.
 */

///<reference path="../../babylon.1.14.d.ts"/>
export var camera : BABYLON.FreeCamera;

export function InitCamera(name : string, scene : BABYLON.Scene){
    camera = new BABYLON.FreeCamera(name, new BABYLON.Vector3(0, 3, 50), scene);
    camera.rotation.y -= Math.PI;
}
export function CameraTest(canvas : HTMLCanvasElement){
    //camera.attachControl(canvas);
}