import 'bulma/css/bulma.css';
import * as BABYLON from 'babylonjs';

import * as Materials from 'babylonjs-materials';

import {showAxis,vicshowAxis,vicshowAxisConv} from './util/axes.js';
import {vicgui,drbutt} from './util/gui.js';
import {groundGrid} from './util/ground_grid.js';
import {planeGrid} from './util/plane_grid.js';
import {genfit} from './util/fit_cruve.js';
import {createRay} from './util/ray.js';
import {funcEnum} from './util/vars.js';
import func_gen from './util/func_gen';


// var SPECTOR = require("spectorjs");

// var spector = new SPECTOR.Spector();
// spector.displayUI();
const canvasMain = document.getElementById("renderCanvas"); // Get the canvas element
const engineMain = new BABYLON.Engine(canvasMain, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format
const createScene = function (engine) {
  var donegen = -1
  const scene = new BABYLON.Scene(engine);
  vicgui(scene);

  // scene.useRightHandedSystem = true

  //mesh created with default size so height is 1
  const camera = new BABYLON.ArcRotateCamera("camera", -(Math.PI / 3.5), (Math.PI/2)*(2/3), 40, new BABYLON.Vector3(5, 5,2));

  // const camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 0, -5), scene);
  camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
  var distance = 20;	
  var aspect = scene.getEngine().getRenderingCanvasClientRect().height / scene.getEngine().getRenderingCanvasClientRect().width; 
  camera.orthoLeft = -distance/2;
  camera.orthoRight = distance / 2;
  camera.orthoBottom = camera.orthoLeft * aspect;
  camera.orthoTop = camera.orthoRight * aspect;

  camera.attachControl(canvasMain, true);

  // camera.lowerRadiusLimit =0;
  // camera.upperRadiusLimit =0;
  // const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

  scene.clearColor = new BABYLON.Color3.FromInts(170,170,170);

  let zpos=-51
  let gridxsize = 10
  let gridysize = 5
  let gridzsize = 10
  vicshowAxisConv(gridxsize,gridysize,gridzsize,{'x':'tau','y':'','z':'t', 'y2':'h*x'},scene);

  const planeOrigin = [gridxsize/2,0,gridzsize/2];
  const vicPlane= planeGrid([1,0,1],[0,1,0],gridzsize,gridxsize,planeOrigin,null,scene);


  const gridmaterial = new Materials.GridMaterial("GridMaterial", scene);
  gridmaterial.majorUnitFrequency =1;
  gridmaterial.minorUnitVisibility = 0.;
  gridmaterial.majorUnitVisibility = 0.;
  gridmaterial.gridRatio = 0.1;
  gridmaterial.backFaceCulling = false;
  gridmaterial.mainColor = new BABYLON.Color3.White;
  gridmaterial.lineColor = new BABYLON.Color3.White;
  gridmaterial.opacity = 0.8;
  gridmaterial.zOffset = 0.0;
  const yoftPlane= planeGrid([0,1,1],[1,0,0],gridzsize,gridysize,[ gridxsize,gridysize/2,gridzsize/2 ],gridmaterial,scene);






    return scene;
};

const sceneMain = createScene(engineMain); //Call the createScene function



// Register a render loop to repeatedly render the scene
engineMain.runRenderLoop(function () {


  sceneMain.render();
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
// $('#hform input').on('change', function() {
//   alert($('input[name=hfunc]:checked', '#hform').val()); 
// });