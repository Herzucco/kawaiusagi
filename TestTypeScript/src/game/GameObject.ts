/**
 * Created by herzucco on 21/11/2014.
 */

///<reference path="../../babylon.1.14.d.ts"/>
export var gameObjects : Array<GameObject>;
gameObjects = new Array<GameObject>();

export function GarbageObjects(){
    var i : number;

    for(i = 0; i < gameObjects.length; i++){
        delete gameObjects[i];
        gameObjects.splice(i, 1);
        i--;
    }
}

export class GameObject{
    destroyed : boolean;

    constructor(){
        gameObjects.push(this);
    }

    update(deltaTime : number) {
        //update code
    }

    destroy() {
        this.destroyed = true;
    }
}

