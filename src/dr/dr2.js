import * as BABYLON from 'babylonjs';


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
  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI /2, 20, new BABYLON.Vector3(0, 0, -100));
  // const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2.1, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
  // camera.attachControl(canvas, true);
  camera.lowerRadiusLimit =0;
  camera.upperRadiusLimit =0;
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
  // const box = BABYLON.MeshBuilder.CreateBox("box", { size: 0.});
  // box.isPickable=false;
  // const helper = scene.createDefaultEnvironment({
  //     enableGroundShadow: false
  // });
  // helper.setMainColor(BABYLON.Color3.White());
  scene.clearColor = BABYLON.Color3.Gray();

  //planeGid()
  // vicgui(scene);
  const vicPlane= planeGrid([0,0,0],[0,0,1],100,100,null,scene);

  var pathSoFar = []



  var updateLine = function(previous,current) {

    let userLine = scene.getMeshByName("userLine")
    if (userLine!=null)
    {
      scene.getMeshByName("userLine").dispose();
      // current.z=0

      pathSoFar.push( current   );
      let axisX =  BABYLON.Mesh.CreateLines("userLine", pathSoFar, scene);
        axisX.color = new BABYLON.Color3(1, 1, 1);
    }
    else
    {
      // previous.z=0
      // current.z=0
      pathSoFar.push( previous );
      pathSoFar.push( current );
      let axisX =  BABYLON.Mesh.CreateLines("userLine", pathSoFar, scene);
        axisX.color = new BABYLON.Color3(1, 1, 1);
    }
   
  };

  let dotrack = 0;


    scene.registerBeforeRender(function() {
      // scene.activeCamera.beta = Math.PI / 2;
      //  scene.activeCamera.alpha = 3*Math.PI/2 ;

    });


    showAxis(40,scene);

    var temp;
  scene.onPointerDown = function(ev, pk){

  //  var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    // var vp  = pickResult.ray.origin + pickResult.ray.direction * 1


    // var m = vicPlane.getWorldMatrix();
    // var v = new BABYLON.Vector3.TransformCoordinates(pk.pickedPoint, m);
    // // v.z=0
    // document.getElementById("xd").innerHTML="xd:"+v.x;
    // document.getElementById("yd").innerHTML="yd:"+v.y;
    // document.getElementById("zd").innerHTML="zd:"+v.z;

    // console.log(pk.hit)
    // document.getElementById("xd").innerHTML="x:"+pk.pickedPoint.x;
    // document.getElementById("yd").innerHTML="y:"+pk.pickedPoint.y;
    // document.getElementById("zd").innerHTML="z:"+pk.pickedPoint.z;


    if (pk.hit) {
      if (dotrack==0)
      {
        dotrack=1;
        temp  =  pk.pickedPoint;

      }
  

    }


  }
  scene.onPointerMove = function (evt, pickResult) {

    var pk = scene.pick(scene.pointerX, scene.pointerY);
    // document.getElementById("xm").innerHTML="x"+pk.pickedPoint.x;
    // document.getElementById("ym").innerHTML="y:"+pk.pickedPoint.y;
    // document.getElementById("zm").innerHTML="z:"+pk.pickedPoint.z;
      
      if (dotrack==1)
      {
        if (pk.pickedPoint!=null)
        {
          updateLine(temp,pk.pickedPoint);
          temp= pk.pickedPoint;
        }
      }


  }

     scene.onPointerUp = function(ev, pk){
  
       dotrack=0
        let drawnLinePos = scene.getMeshByName("userLine").getVerticesData(BABYLON.VertexBuffer.PositionKind)
        console.log(drawnLinePos)
        pathSoFar=[];

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
