///<reference path="../babylon.1.14.d.ts"/>
export function Start(){
    var lastTimeMsec = null;

    var canvas = <HTMLCanvasElement>document.getElementById("canvas");

    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);
    scene.enablePhysics(new BABYLON.Vector3(0,-100,0), new BABYLON.OimoJSPlugin());

    canvas.width = 500;
    canvas.height = 500;
    var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, 0), scene);
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 30, 0), scene);
    var sphere : BABYLON.Mesh = BABYLON.Mesh.CreateSphere("sphere", 10, 20, scene);

    var box : BABYLON.Mesh = BABYLON.Mesh.CreateBox("boxo", 1, scene);
    box.position = new BABYLON.Vector3(0, -20, 30);
    box.scaling.z = 1000;
    box.scaling.x = 100;
    sphere.position = new BABYLON.Vector3(0, 0, 60);
    camera.attachControl(canvas);

    var material : BABYLON.StandardMaterial = new BABYLON.StandardMaterial("materialTest", scene);
    material.diffuseColor = new BABYLON.Color3(0, 0, 255);
    material.specularPower = 10;

    sphere.material = material;
    sphere.setPhysicsState({impostor:BABYLON.PhysicsEngine.SphereImpostor, move:true, mass:100, friction:0.5, restitution:0.99});
    box.setPhysicsState({impostor:BABYLON.PhysicsEngine.BoxImpostor, move:false, friction:0.9});
    //sphere.applyImpulse(new BABYLON.Vector3(0, -200, 1000), new BABYLON.Vector3(0, 0, 0));


    var animationBox = new BABYLON.Animation("anim", "position.y", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keys = [];
    keys.push({
        frame: 0,
        value: 1
    },{
        frame: 100,
        value: 30
    },{
        frame: 200,
        value: 1
    });

    animationBox.setKeys(keys);

    for(var x = 0; x < 5; x++){
        for(var i = -5; i < 5; i++){
            var box : BABYLON.Mesh = BABYLON.Mesh.CreateBox("boxo"+i, 1, scene);
            box.position = new BABYLON.Vector3(i*10, 1*(x+1), 200);

            box.scaling.z = 10;
            box.scaling.x = 10;
            box.scaling.y = 10;

            //box.setPhysicsState({impostor:BABYLON.PhysicsEngine.BoxImpostor, move:true, mass:2, friction:0.5});
            box.animations.push(animationBox);
            scene.beginAnimation(box, 0, 200, true);
        }

    }


    var loader = new BABYLON.AssetsManager(scene);

    var meshTask = loader.addMeshTask("task", "", "./meshs/", "prince.babylon");

    meshTask.onSuccess =function(task : any) {
        var mesh : BABYLON.Mesh = task.loadedMeshes[0];
        mesh.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
        mesh.position.z = 30;
        mesh.position.y = -10;
    };

    loader.onFinish = function (tasks) {

    };

    loader.load();

    function render(nowMsec) {
        //lastTimeMsec	= lastTimeMsec || nowMsec-1000/60;
        //var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec) / 1000;
        //lastTimeMsec	= nowMsec;

        scene.render();
    }

    engine.runRenderLoop(function() {
        render(0);
    });
}