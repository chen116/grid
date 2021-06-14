import * as BABYLON from 'babylonjs';


import {showAxis} from './util/axes.js';
import {vicgui,drbutt} from './util/gui.js';
import {groundGrid} from './util/ground_grid.js';
import {planeGrid} from './util/plane_grid.js';
import {genfit} from './util/fit_cruve.js';
const ActionEnum = Object.freeze({
  "none":0,
  "scribble":1, 
  "pick":2, "wednesday":3})

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
// Add your code here matching the playground format
const createScene = function () {
  var donegen = -1
  const scene = new BABYLON.Scene(engine);
  //mesh created with default size so height is 1
  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI /2, 20, new BABYLON.Vector3(0, 0, -120));

  camera.lowerRadiusLimit =0;
  camera.upperRadiusLimit =0;
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

  scene.clearColor = BABYLON.Color3.Gray();


  const vicPlane= planeGrid([0,0,0],[0,0,1],350,100,nul-l,scene);

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

  let dotrack = ActionEnum.none;
  scene.registerBeforeRender(function() {
  if(donegen==1)
    {scene.getMeshByName("userLine").dispose();
  donegen=0}

    // scene.activeCamera.beta = Math.PI / 2;
    //  scene.activeCamera.alpha = 3*Math.PI/2 ;

  });


    showAxis(50,scene);
    drbutt(scene);

    var temp;
  scene.onPointerDown = function(ev, pk){

    if (pk.hit) {
      if (dotrack==ActionEnum.none)
      {
        dotrack=ActionEnum.scribble;
        temp  =  pk.pickedPoint;
      }
    }


  }
  scene.onPointerMove = function (evt, pickResult) {

    var pk = scene.pick(scene.pointerX, scene.pointerY);

      if (dotrack==ActionEnum.scribble)
      {
        if (pk.pickedPoint!=null)
        {
          updateLine(temp,pk.pickedPoint);
          temp= pk.pickedPoint;
        }
      }
      else if(dotrack==ActionEnum.pick)
      {
        if (pk.pickedPoint!=null)
        {

        }
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
       

         genfit(drawnLinePos,scene).then(function(resolve,reject){
          // alert(res); // if the promise condition is met, this alert is fired
      document.getElementById("y").innerHTML="done";
  
          donegen=(1)
      });
       }
         dotrack=ActionEnum.pick

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
