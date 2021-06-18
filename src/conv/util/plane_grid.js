import * as BABYLON from 'babylonjs';

import * as Materials from 'babylonjs-materials';

export  function planeGrid( p0, normVec,width,height, mat,  scene) {

if (mat==null){
     const gridmaterial = new Materials.GridMaterial("GridMaterial", scene);
     gridmaterial.majorUnitFrequency = 5;
     gridmaterial.minorUnitVisibility = 0.3;
     gridmaterial.gridRatio = 1;
     gridmaterial.backFaceCulling = false;
     gridmaterial.mainColor = new BABYLON.Color3.FromInts(50,180,250);
     gridmaterial.lineColor = new BABYLON.Color3.FromInts(50,50,50);
     gridmaterial.opacity = 0.8;
     gridmaterial.zOffset = 0.0;
     mat = gridmaterial

}

 const position = new BABYLON.Vector3.FromArray(p0);
 const normalTo =  new BABYLON.Vector3.FromArray(normVec);
  const abstractPlane = BABYLON.Plane.FromPositionAndNormal(position,
       normalTo);
  //
  const plane = BABYLON.MeshBuilder.CreatePlane("plane", {width:width,height:height,sourcePlane: abstractPlane, sideOrientation: BABYLON.Mesh.DOUBLESIDE},scene);
  plane.material = mat;
  plane.isPickable = true;

     return plane;
}
