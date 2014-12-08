/**
 * Created by herzucco on 21/11/2014.
 */
///<reference path="../../babylon.1.14.d.ts"/>

//The materials dictionary, used to not duplicate materials
export var materials : Object = {};

export function AddMaterial(name : string, material : BABYLON.StandardMaterial){
    materials[name] = material;
}

export function GetMaterial(name : string) : BABYLON.StandardMaterial{
    return materials[name];
}
