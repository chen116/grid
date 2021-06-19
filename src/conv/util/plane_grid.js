import * as BABYLON from 'babylonjs';

import * as Materials from 'babylonjs-materials';

export  function planeGrid( p0, normVec,width,height, mat,  scene) {

if (mat==null){
     const gridmaterial = new Materials.GridMaterial("GridMaterial", scene);
     gridmaterial.majorUnitFrequency =2;
     gridmaterial.minorUnitVisibility = 0.;
     gridmaterial.majorUnitVisibility = 0.1;
     gridmaterial.gridRatio = 1;
     gridmaterial.backFaceCulling = false;
     gridmaterial.mainColor = new BABYLON.Color3.White;
     gridmaterial.lineColor = new BABYLON.Color3.White;
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
     plane.position.x = height/2
     plane.position.z = width/2
     return plane;
}



