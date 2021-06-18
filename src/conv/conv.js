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
  //mesh created with default size so height is 1
  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI /2, 10, new BABYLON.Vector3(0, 0, -50));
  // const camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 0, -5), scene);
  camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
  var distance = 80;	
  var aspect = scene.getEngine().getRenderingCanvasClientRect().height / scene.getEngine().getRenderingCanvasClientRect().width; 
  camera.orthoLeft = -distance/2;
  camera.orthoRight = distance / 2;
  camera.orthoBottom = camera.orthoLeft * aspect;
  camera.orthoTop = camera.orthoRight * aspect;


  // camera.attachControl(canvas, true);

  // camera.lowerRadiusLimit =0;
  // camera.upperRadiusLimit =0;
  // const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

  scene.clearColor = new BABYLON.Color3(0.7,0.7,0.7);

  let zpos=-51
  let dotrack = ActionEnum.none;
  let gridSize = 10
  vicshowAxis(gridSize*2,gridSize*1,scene);
  drbutt(dotrack,scene);
  const vicPlane= planeGrid([0,0,0],[0,0,1],gridSize*4,gridSize*2,null,scene);

  const [vbox,vsphere,vray,vrayHelper] = createRay(zpos,scene);

  var pathSoFar = []


  var updateLine = function(previous,current) {


    let userFittedLine = scene.getMeshByName("userFittedLine")
    if (userFittedLine!=null)
    {
      userFittedLine.dispose()
    }

    let userLine = scene.getMeshByName("userLine")
    if (userLine!=null)
    {
      current.z=-5
      scene.getMeshByName("userLine").dispose();
      pathSoFar.push( current   );
    }
    else
    {
      previous.z=-5
      current.z=-5
      pathSoFar.push( previous );
      pathSoFar.push( current );

    }
      let drawnLine =  BABYLON.Mesh.CreateLines("userLine", pathSoFar, scene);
      drawnLine.color = new BABYLON.Color3(1, 1, 1);
   
  };




  scene.registerBeforeRender(function() {
    if(donegen==1)
    {
      scene.getMeshByName("userLine").dispose();
      donegen=0
    }

    if (dotrack==ActionEnum.picking)
    {
      var hitInfo = vray.intersectsMeshes([scene.getMeshByName("userFittedLine")]);

      if(hitInfo.length){
          //console.log(hitInfo);
          vsphere.setEnabled(true);
          vsphere.position.copyFrom(hitInfo[0].pickedPoint);
      }else{
          vsphere.setEnabled(false);
      }
    }

    // scene.activeCamera.beta = Math.PI / 2;
    //  scene.activeCamera.alpha = 3*Math.PI/2 ;

  });





    var temp;
  scene.onPointerDown = function(ev, pk){

    if (pk.hit) {
      document.getElementById("x").innerHTML= "x:"+pk.pickedPoint.x;
      document.getElementById("y").innerHTML="y:"+pk.pickedPoint.y;

      // if (dotrack==ActionEnum.none)
      // {
      //   dotrack=ActionEnum.scribble;
      //   temp  =  pk.pickedPoint;
      // }
      switch (dotrack){
        default:
          break;
        case ActionEnum.none:
          dotrack =ActionEnum.scribble;
          temp  =  pk.pickedPoint;
          break;
        case ActionEnum.picking:
          dotrack=ActionEnum.picked
          break;


      }
    }


  }
  scene.onPointerMove = function (evt, pickResult) {

    var pk = scene.pick(scene.pointerX, scene.pointerY);

      switch(dotrack){
        case ActionEnum.scribble:
          if (pk.pickedPoint!=null)
          {
            updateLine(temp,pk.pickedPoint);
            temp= pk.pickedPoint;
          }
          break;
        case ActionEnum.picking:
          if (pk.pickedPoint!=null)
          {
            vbox.position.x = pk.pickedPoint._x;
            // vbox.position.y = pk.pickedPoint._y;
          }
          break;
        default:
          break;    

      }



  }



  var drawReg=function(array){
    let qq = []
    for (let i = 0; i < array.length; i++) {
      qq.push(  new BABYLON.Vector3(array[i][0], array[i][1], -50 )  )
      
    }
    let drawnLine =  BABYLON.Mesh.CreateLines("userFittedLine", qq, scene);
    drawnLine.color = new BABYLON.Color3(0, 1, 0);
  }



     scene.onPointerUp = function(ev, pk){
       if(dotrack==ActionEnum.scribble)
       {
        let drawnLinePos = scene.getMeshByName("userLine").getVerticesData(BABYLON.VertexBuffer.PositionKind)
        console.log(drawnLinePos);
        
        pathSoFar=[];
        //  drawReg(genfit(drawnLinePos))
       
         genfit(drawnLinePos,zpos,scene).then(function(resolve,reject){
          // alert(res); // if the promise condition is met, this alert is fired
      document.getElementById("y").innerHTML="done";
      dotrack=ActionEnum.picking
      vrayHelper.show(scene);
          donegen=1
      });

      dotrack=ActionEnum.drawing
       }
        

     }


  // add a button
// let button = document.getElementById("button");
  let button = document.createElement("button");
  button.textContent = "Press mE!!!";
  button.style.position = "absolute";
  button.style.zIndex = 1000;
  button.addEventListener("click",function () {


      let hv = document.getElementById("lname").value;

      console.log("click")
      // box.scaling.x =parseFloat(hv);
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
// window.addEventListener("mousemove", function (event) {
//   console.log(scene.pointerX, scene.pointerY, event);
//   // We try to pick an object
//     // var pickResult = scene.pick(scene.pointerX, scene.pointerY);
// });
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
        engine.resize();
});
