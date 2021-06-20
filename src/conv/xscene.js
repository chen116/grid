import * as BABYLON from 'babylonjs';

import * as Materials from 'babylonjs-materials';

import {vicshowAxis2D,vicshowAxis,vicshowAxisConv} from './util/axes.js';
import {vicgui,drbutt} from './util/gui.js';
import {groundGrid} from './util/ground_grid.js';
import {planeGrid} from './util/plane_grid.js';
import {genfit} from './util/fit_cruve.js';
import {createRay} from './util/ray.js';
import {funcEnum} from './util/vars.js';
import { ajaxPrefilter } from 'jquery';
import func_gen from './util/func_gen';

const funcGen = require('./util/func_gen');

const canvas1 = document.getElementById("func2Canvas"); // Get the canvas element
const engine1 = new BABYLON.Engine(canvas1, true); // Generate the BABYLON 3D engine

let curFunc = $('input[name=xfunc]:checked', '#xform').val()

const  hscene = function(canvas,engine) {
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
  
    camera.attachControl(canvas, true);
  
    // camera.lowerRadiusLimit =0;
    // camera.upperRadiusLimit =0;
    // const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
  
    scene.clearColor = new BABYLON.Color3.FromInts(160,160,160);
  
    let zpos=-51
    let gridxsize = 20
    let gridysize = 10
    vicshowAxis2D(gridxsize,gridysize,{'x':'t','y':'x(t)'},scene);
    const planeOrigin=[gridxsize/2,gridysize/2,-1];

    const vicPlane= planeGrid([gridxsize/2,0,gridxsize/2],[0,0,1],gridxsize,gridysize,planeOrigin,null,scene);

    func_gen.withStr(curFunc,scene)
    func_gen.changeColorFuncPath( [0,0,120],scene )


  return scene;


}
const scene =  hscene(canvas1,engine1);

engine1.runRenderLoop(function () {
  scene.render();
});




$('#xform input').on('change', function() {
  let newFunc = $('input[name=xfunc]:checked', '#xform').val().toString()
  if (newFunc.localeCompare(curFunc)!=0)
  {
    func_gen.withStr(newFunc,scene)
    func_gen.changeColorFuncPath( [0,0,120],scene )

    curFunc=newFunc
  }
});