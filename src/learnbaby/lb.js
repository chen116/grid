import * as BABYLON from 'babylonjs';


import * as Materials from 'babylonjs-materials';
import {showAxis} from './util/axes.js';
import {vicgui} from './util/gui.js';

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format
const createScene = function () {

    const scene = new BABYLON.Scene(engine);




//mesh created with default size so height is 1
const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI /2, 15, new BABYLON.Vector3(0, 0, 0));
// const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2.1, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));


camera.attachControl(canvas, true);
camera.lowerRadiusLimit =5;
camera.upperRadiusLimit =50;


const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
//

const options = {
    size: 0.5,

};


    const box = BABYLON.MeshBuilder.CreateBox("box", options);
    box.position.y = 0.25;
    box.rotation.y = 0;
    box.scaling.x=1;

//
// const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});
// roof.scaling.x = 1.75;
// roof.rotation.z = Math.PI / 2;
// roof.position.y = 1.22;
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
       gridmaterial.majorUnitFrequency = 5;
       gridmaterial.minorUnitVisibility = 0.3;
       gridmaterial.gridRatio = 0.1;
       gridmaterial.backFaceCulling = false;
       gridmaterial.mainColor = new BABYLON.Color3.FromInts(0,0,255);
       gridmaterial.lineColor = new BABYLON.Color3.FromInts(0,255,0);
       gridmaterial.opacity = 0.8;
       gridmaterial.zOffset = 0.0;


       const gridMesh = BABYLON.Mesh.CreateGround("gridx", 1.0, 0.0, 1, scene);
       gridMesh.scaling.x = 5;//Math.max(width, depth);
       gridMesh.scaling.z = 5;//gridMesh.scaling.x;
       gridMesh.position.y = -0.0;
       gridMesh.isPickable = true;
       gridMesh.material = gridmaterial;
       gridMesh.alphaIndex = 2;

       const gridMesh2 = BABYLON.Mesh.CreateGround("grid2", 1.0, 0.0, 100, scene);
       gridMesh2.scaling.x = 5;//Math.max(width, depth);
       gridMesh2.scaling.z = 5;//gridMesh2.scaling.x;
       gridMesh2.rotation.z = Math.PI / 2;
       gridMesh2.isPickable = false;
       gridMesh2.material = gridmaterial;
       gridMesh2.alphaIndex = 2;

       const gridMesh3 = BABYLON.Mesh.CreateGround("grid2", 1.0, 0.0, 100, scene,true);
       gridMesh3.scaling.z = 5;//Math.max(width, depth);
       gridMesh3.scaling.y = 5;//gridMesh3.scaling.x;
       gridMesh3.scaling.x = 5;//gridMesh3.scaling.x;
       gridMesh3.rotation.x = Math.PI / 2;
       gridMesh3.isPickable = false;
       gridMesh3.material = gridmaterial;
       gridMesh3.alphaIndex = 2;

       scene.meshes.find(m => m.name === 'BackgroundPlane').alphaIndex = 0;








  showAxis(2,scene);
vicgui(scene);





{

  const abstractPlane = BABYLON.Plane.FromPositionAndNormal(new BABYLON.Vector3(0, 0, 0),
       new BABYLON.Vector3(0, 1, 0));
  //
  const plane = BABYLON.MeshBuilder.CreatePlane("plane", {width:10,height:10,sourcePlane: abstractPlane, sideOrientation: BABYLON.Mesh.DOUBLESIDE},scene);
  plane.material = gridmaterial;


const path = []

for(var ii = 0; ii <100 ; ii++)
{
    path.push(new BABYLON.Vector3(ii,0,ii))
}

var line =  BABYLON.Mesh.CreateLines("line", path, scene);

    //Array of paths to construct tube
	var myPath = [
		 	new BABYLON.Vector3(0, -1, 0.0),
			new BABYLON.Vector3(0, 3, 0)
	];

}


{
  var path = [];
  for(var i = -20; i < 20; i++) {
    var x = i;
    var y = 0;
    var z = 0;
    path.push(new BABYLON.Vector3(x, y, z));
  }
  var mesh = BABYLON.Mesh.CreateLines("lines", path, scene, true);
  var updatePath = function(path, k) {
    for (var i = 0; i < path.length; i++) {
      var x = path[i].x;
      var z = path[i].z;
      var y = 5 * Math.sin(i / 3 + k);
      path[i].x = x;
      path[i].y = y;
      path[i].z = z;
    }
  };

}

  // morphing
  var k = 0;
  scene.registerBeforeRender(function() {
    updatePath(path, k);
    //updateLines(mesh, path);
    mesh = BABYLON.Mesh.CreateLines(null, path, null, null, mesh);
    k += 0.05;
    // pl.position = camera.position;
  });

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
