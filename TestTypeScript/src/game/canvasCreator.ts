/**
 * Created by herzucco on 20/11/2014.
 */
///<reference path="../../babylon.1.14.d.ts"/>
export function CreateCanvas(id : string, x : number, y : number) : HTMLCanvasElement{
    var canvas = <HTMLCanvasElement>document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.id = id;
    canvas.width = x;
    canvas.height = y;

    return canvas;
}

export function CreateBabylonScene(canvas : HTMLCanvasElement, x : number, y : number) : BABYLON.Scene{
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);

    canvas.width = x;

    canvas.height = y;

    return scene;
}