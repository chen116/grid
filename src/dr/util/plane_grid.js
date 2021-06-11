import * as BABYLON from 'babylonjs';


export  function planeGrid( p0, normVec,width,height, mat,  scene) {



 const position = new BABYLON.Vector3.FromArray(p0);
 const normalTo =  new BABYLON.Vector3.FromArray(normVec);
  const abstractPlane = BABYLON.Plane.FromPositionAndNormal(position,
       normalTo);
  //
  const plane = BABYLON.MeshBuilder.CreatePlane("plane", {width:width,height:height,sourcePlane: abstractPlane, sideOrientation: BABYLON.Mesh.DOUBLESIDE},scene);
  plane.material = mat;
  plane.isPickable = false;


}
