import * as BABYLON from 'babylonjs';


import {vicshowAxis2D,vicshowAxis} from './util/axes.js';
import {vicgui,drbutt} from './util/gui.js';
import {groundGrid} from './util/ground_grid.js';
import {planeGrid} from './util/plane_grid.js';
import {genfit} from './util/fit_cruve.js';
import {createRay} from './util/ray.js';


export function xscene(engine) {
    const scene = new BABYLON.Scene(engine);
    // scene.useRightHandedSystem = true
    //mesh created with default size so height is 1
    const camera = new BABYLON.ArcRotateCamera("camera",-Math.PI / 2, Math.PI /2, 10, new BABYLON.Vector3(10, 5, -20));
    // const camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 0, -5), scene);
    camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
    var distance = 24;	
    var aspect = scene.getEngine().getRenderingCanvasClientRect().height / scene.getEngine().getRenderingCanvasClientRect().width; 
    camera.orthoLeft = -distance/2;
    camera.orthoRight = distance / 2;
    camera.orthoBottom = camera.orthoLeft * aspect;
    camera.orthoTop = camera.orthoRight * aspect;
  
  //   camera.attachControl(canvas, true);
  
    // camera.lowerRadiusLimit =0;
    // camera.upperRadiusLimit =0;
    // const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
  
    scene.clearColor = new BABYLON.Color3.FromInts(160,160,160);
  
    let zpos=-51
    let gridxsize = 20
    let gridysize = 10
    let gridzsize = 20
    vicshowAxis2D(gridxsize,gridysize,{'x':'t','y':'x(t)'},scene);
    const planeOrigin=[gridxsize/2,gridysize/2,-1];

    const vicPlane= planeGrid([gridxsize/2,0,gridxsize/2],[0,0,1],gridxsize,gridysize,planeOrigin,null,scene);
  
  
      return scene;


}