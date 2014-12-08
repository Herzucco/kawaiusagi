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
import ms = u.MenuState;

//The game manager, managing the game initialization and game over
export var canvas : HTMLCanvasElement;
export var scene : BABYLON.Scene;
export var engine : BABYLON.Engine;
export var UI : u.UI;
export var layer : BABYLON.Layer;

//Initialize the game - Only called one time
export function Init(){
    canvas = c.CreateCanvas('scene', 1024, 768);
    scene = c.CreateBabylonScene(canvas, 1024, 768);
    scene.clearColor = new BABYLON.Color3(0,0,0);
    engine = scene.getEngine();

    cam.InitCamera("mainCamera", scene);

    UI = new u.UI(canvas.width,canvas.height);
    UI.TweenAlpha(true);

    var mainLight = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0, 5, -50), scene);
    mainLight.diffuse = new BABYLON.Color3(1, 1, 1);
    mainLight.specular = new BABYLON.Color3(0, 0, 0);

    generateMaterials();
    generateFx();

    og.init(-100, 30, 0.05, 5, scene);

    engine.runRenderLoop(function() {
        update(BABYLON.Tools.GetDeltaTime()/100);
    });
}

//Launching the game - called each time the player press space to relaunch the game
export function Start(){
    var player = new p.Player(0,5,44.8,scene);
    og.launch(player);
}

//Main Loop, used to update all gameobjects and babylon rendering and data
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

//Creating and saving all the needed materials - Called one time, at Init
function generateMaterials(){
    var redMaterial = new BABYLON.StandardMaterial("red obstacle material", scene);
    var blueMaterial = new BABYLON.StandardMaterial("blue obstacle material", scene);
    var collectibleMaterial = new BABYLON.StandardMaterial("collectible material", scene);

    redMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
    blueMaterial.diffuseColor = new BABYLON.Color3(0, 0, 1);
    collectibleMaterial.diffuseColor = new BABYLON.Color3(1, 1, 0);

    m.AddMaterial("RED_Obstacle", redMaterial);
    m.AddMaterial("BLUE_Obstacle", blueMaterial);
    m.AddMaterial("collectible", collectibleMaterial);
}

//Creating the fx - Called one time, at Init
function generateFx(){
    // space particles generation /////////////////////

    var starparticle : sp.starParticles = new sp.starParticles(50,50, scene);

    ///////////////////////////////////////////////////////////////////////
    /////// Postprocessing Bloom effect ////////////////
    var blurWidth = 1.0;

    var postProcess0 = new BABYLON.PassPostProcess("Scene copy", 1.0, cam.camera);
    var postProcess1 = new BABYLON.PostProcess("Down sample", "./FX/downsample", ["screenSize", "highlightThreshold"], null, 0.25, cam.camera, BABYLON.Texture.BILINEAR_SAMPLINGMODE);
    postProcess1.onApply = function (effect) {
        effect.setFloat2("screenSize", postProcess1.width, postProcess1.height);
        effect.setFloat("highlightThreshold", 0.90);
    };
    var postProcess2 = new BABYLON.BlurPostProcess("Horizontal blur", new BABYLON.Vector2(1.0, 0), blurWidth, 0.5, cam.camera);
    var postProcess3 = new BABYLON.BlurPostProcess("Vertical blur", new BABYLON.Vector2(0, 1.0), blurWidth, 0.5, cam.camera);
    var postProcess4 = new BABYLON.PostProcess("Final compose", "./FX/compose", ["sceneIntensity", "glowIntensity", "highlightIntensity"], ["sceneSampler"], 1, cam.camera);
    postProcess4.onApply = function (effect) {
        effect.setTextureFromPostProcess("sceneSampler", postProcess0);
        effect.setFloat("sceneIntensity", 1);
        effect.setFloat("glowIntensity", 2);
        effect.setFloat("highlightIntensity", 5.0);
    };
}

//Stop the game when the player is destroyed
export function Stop(){
    g.DestroyAll();
    og.stop();
    UI.GameOver();
}