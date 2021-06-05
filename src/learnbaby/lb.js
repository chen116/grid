import * as BABYLON from 'babylonjs';


import * as Materials from 'babylonjs-materials';


const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format
const createScene = function () {

    const scene = new BABYLON.Scene(engine);




//mesh created with default size so height is 1
const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2.1, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
camera.attachControl(canvas, true);
const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

const box = BABYLON.MeshBuilder.CreateBox("box", {});
box.position.y = 0.5;
box.rotation.y = Math.PI / 4;


const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});
roof.scaling.x = 0.75;
roof.rotation.z = Math.PI / 2;
roof.position.y = 1.22;
// mesh.position =(2, 3, 4);//(2, 3, 4)
// mesh.position.addInPlace(new Vector3(2, 3, 4)); //(-1 + 2, 2 + 3, 1 + 4) = (1, 5, 5)
// mesh.translate(new BABYLON.Vector3(2, 3, 4), 1, BABYLON.Space.WORLD);
// mesh.position.x += 2; //(2, 2, 1)
// mesh.position.y += 3; //(2, 3, 1)
// mesh.position.z += 4; //(2, 3, 4)
// mesh.translate(new BABYLON.Vector3(2, 3, 4), 1, BABYLON.Space.LOCAL);
// mesh.setPositionWithLocalVector(new BABYLON.Vector3(2, 3, 4));
// mesh.locallyTranslate(new BABYLON.Vector3(2, 3. 4));


      const helper = scene.createDefaultEnvironment({
           enableGroundShadow: false
       });
       helper.setMainColor(BABYLON.Color3.White());
       //helper.ground.position.y += 0.01;

       // GRID
       const extend = scene.getWorldExtends();
       const width = (extend.max.x - extend.min.x) * 5;
       const depth = (extend.max.z - extend.min.z) * 5;




       const gridmaterial = new Materials.GridMaterial("GridMaterial", scene);
       gridmaterial.majorUnitFrequency = 10;
       gridmaterial.minorUnitVisibility = 0.3;
       gridmaterial.gridRatio = 0.001;
       gridmaterial.backFaceCulling = false;
       gridmaterial.mainColor = new BABYLON.Color3.FromInts(0,0,255);
       gridmaterial.lineColor = new BABYLON.Color3.FromInts(0,255,0);
       gridmaterial.opacity = 0.8;
       gridmaterial.zOffset = 0.0;


       const gridMesh = BABYLON.Mesh.CreateGround("gridx", 1.0, 0.0, 1, scene);
       gridMesh.scaling.x = Math.max(width, depth);
       gridMesh.scaling.z = gridMesh.scaling.x;
       gridMesh.isPickable = false;
       gridMesh.material = gridmaterial;
       gridMesh.alphaIndex = 2;

       const gridMesh2 = BABYLON.Mesh.CreateGround("grid2", 1.0, 0.0, 100, scene);
       gridMesh2.scaling.x = Math.max(width, depth);
       gridMesh2.scaling.z = gridMesh2.scaling.x;
       gridMesh2.rotation.z = Math.PI / 2;
       gridMesh2.isPickable = false;
       gridMesh2.material = gridmaterial;
       gridMesh2.alphaIndex = 2;



       scene.meshes.find(m => m.name === 'BackgroundPlane').alphaIndex = 1;

    return scene;
};

const scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
        scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
        engine.resize();
});
