import * as BABYLON from 'babylonjs';


export  function planeGrid( p0, normVec, mat,  scene) {



 const position = new BABYLON.Vector3.FromArray(p0);
 const normalTo =  new BABYLON.Vector3.FromArray(normVec);
  const abstractPlane = BABYLON.Plane.FromPositionAndNormal(position,
       normalTo);
  //
  const plane = BABYLON.MeshBuilder.CreatePlane("plane", {width:20,height:20,sourcePlane: abstractPlane, sideOrientation: BABYLON.Mesh.DOUBLESIDE},scene);
  plane.material = mat;


}
