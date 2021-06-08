import * as BABYLON from 'babylonjs';


import * as Materials from 'babylonjs-materials';
import {showAxis} from './util/axes.js';
import {vicgui} from './util/gui.js';
import {groundGrid} from './util/ground_grid.js';
import {planeGrid} from './util/plane_grid.js';
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
    box.position.y = -2;
    box.rotation.y = 0;
    box.scaling.x=2;


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
       gridmaterial.gridRatio = 1;
       gridmaterial.backFaceCulling = false;
       gridmaterial.mainColor = new BABYLON.Color3.FromInts(50,180,250);
       gridmaterial.lineColor = new BABYLON.Color3.FromInts(50,50,50);
       gridmaterial.opacity = 0.8;
       gridmaterial.zOffset = 0.0;







       //groundGrid(scene);

  //planeGid()

  vicgui(scene);


planeGrid([0,0,0],[0,0,1],gridmaterial,scene);


{

  // const abstractPlane = BABYLON.Plane.FromPositionAndNormal(new BABYLON.Vector3(0, 0, 0),
  //      new BABYLON.Vector3(0, 1, 0));
  // //
  // const plane = BABYLON.MeshBuilder.CreatePlane("plane", {width:10,height:10,sourcePlane: abstractPlane, sideOrientation: BABYLON.Mesh.DOUBLESIDE},scene);
  // plane.material = gridmaterial;


const path = []

for(var ii = 0; ii <=5 ; ii++)
{
    path.push(new BABYLON.Vector3(ii,ii,0))
}

var line =  BABYLON.Mesh.CreateLines("line", path, scene);
}


{
  var path = [];
  for(var i = -5; i <= 5; i=i+.5) {
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
      var y = 5 * Math.sin(i / 2 + k);
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


    showAxis(5,scene);


  scene.onPointerDown = function(ev, pk){
    console.log("x",pk.pickedPoint.x);
    console.log("y",pk.pickedPoint.y);
    console.log("z",pk.pickedPoint.z);
    document.getElementById("x").innerHTML="x:"+pk.pickedPoint.x;
    document.getElementById("y").innerHTML="y:"+pk.pickedPoint.y;
    document.getElementById("z").innerHTML="z:"+pk.pickedPoint.z;

  }



  // add a button
let button = document.getElementById("button");
  // let button = document.createElement("button");
  button.textContent = "Press mE!!!";
  button.style.position = "absolute";
  button.style.zIndex = 1000;
  button.addEventListener("click",function () {


      let hv = document.getElementById("lname").value;

      console.log("click")
      box.scaling.x =parseFloat(hv);
  });
  canvas.parentElement.appendChild(button);

  // cleanup
  scene.onDisposeObservable.add(()=> {
      button.remove();
  })

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
