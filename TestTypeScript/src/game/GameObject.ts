/**
 * Created by herzucco on 21/11/2014.
 */

///<reference path="../../babylon.1.14.d.ts"/>
export var gameObjects : Array<GameObject>;
gameObjects = new Array<GameObject>();

//Called at each update to check destroyed gameobjects and remove them from memory
export function GarbageObjects(){
    var i : number;

    for(i = 0; i < gameObjects.length; i++){
        if(gameObjects[i].destroyed){
            delete gameObjects[i];
            gameObjects.splice(i, 1);
            i--;
        }
    }
}

//Destroying all the gameobjects
export function DestroyAll(){
    var i : number;

    for(i = 0; i < gameObjects.length; i++){
        gameObjects[i].destroy();
    }
}

//Main GameObject class, used to update each object of the game and easily manage their destruction
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

