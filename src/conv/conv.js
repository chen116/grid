import * as BABYLON from 'babylonjs';


import {showAxis,vicshowAxis} from './util/axes.js';
import {vicgui,drbutt} from './util/gui.js';
import {groundGrid} from './util/ground_grid.js';
import {planeGrid} from './util/plane_grid.js';
import {genfit} from './util/fit_cruve.js';
import {createRay} from './util/ray.js';
const ActionEnum = Object.freeze({
  "none":0,
  "scribble":1, 
   "drawing":2,"picking":3,"picked":4})

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
// Add your code here matching the playground format
const createScene = function () {
  var donegen = -1
  const scene = new BABYLON.Scene(engine);

  // scene.useRightHandedSystem = true

  //mesh created with default size so height is 1
  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI /4, (Math.PI/2)*(3/4), 30, new BABYLON.Vector3(20, 5,10));

  // const camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 0, -5), scene);
  camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
  var distance = 48;	
  var aspect = scene.getEngine().getRenderingCanvasClientRect().height / scene.getEngine().getRenderingCanvasClientRect().width; 
  camera.orthoLeft = -distance/2;
  camera.orthoRight = distance / 2;
  camera.orthoBottom = camera.orthoLeft * aspect;
  camera.orthoTop = camera.orthoRight * aspect;

//   camera.attachControl(canvas, true);

  // camera.lowerRadiusLimit =0;
  // camera.upperRadiusLimit =0;
  // const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

  scene.clearColor = new BABYLON.Color3(0.7,0.7,0.7);

  let zpos=-51
  let dotrack = ActionEnum.none;
  let gridxsize = 20
  let gridysize = 10
  let gridzsize = 40
  vicshowAxis(gridxsize,gridysize,gridzsize,scene);
  const vicPlane= planeGrid([gridxsize/2,0,gridzsize/2],[0,1,0],gridzsize,gridxsize,null,scene);


    return scene;
};

const scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
   
        scene.render();
});
// window.addEventListener("mousemove", function (event) {
//   console.log(scene.pointerX, scene.pointerY, event);
//   // We try to pick an object
//     // var pickResult = scene.pick(scene.pointerX, scene.pointerY);
// });
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
        engine.resize();
});
