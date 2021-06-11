


import * as BABYLON from 'babylonjs';


import * as Materials from 'babylonjs-materials';
export  function groundGrid(scene) {
  const gridmaterial = new Materials.GridMaterial("GridMaterial", scene);
  gridmaterial.majorUnitFrequency = 5;
  gridmaterial.minorUnitVisibility = 0.3;
  gridmaterial.gridRatio = 0.1;
  gridmaterial.backFaceCulling = false;
  gridmaterial.mainColor = new BABYLON.Color3.FromInts(0,0,255);
  gridmaterial.lineColor = new BABYLON.Color3.FromInts(0,255,0);
  gridmaterial.opacity = 0.8;
  gridmaterial.zOffset = 0.0;
       const gridMesh = BABYLON.Mesh.CreateGround("gridx", 1.0, 0.0, 1, scene);
       gridMesh.scaling.x = 5;//Math.max(width, depth);
       gridMesh.scaling.z = 5;//gridMesh.scaling.x;
       gridMesh.position.y = -0.0;
       gridMesh.isPickable = true;
       gridMesh.material = gridmaterial;
       gridMesh.alphaIndex = 2;

       const gridMesh2 = BABYLON.Mesh.CreateGround("grid2", 1.0, 0.0, 100, scene);
       gridMesh2.scaling.x = 5;//Math.max(width, depth);
       gridMesh2.scaling.z = 5;//gridMesh2.scaling.x;
       gridMesh2.rotation.z = Math.PI / 2;
       gridMesh2.isPickable = false;
       gridMesh2.material = gridmaterial;
       gridMesh2.alphaIndex = 2;

       const gridMesh3 = BABYLON.Mesh.CreateGround("grid2", 1.0, 0.0, 100, scene,true);
       gridMesh3.scaling.z = 5;//Math.max(width, depth);
       gridMesh3.scaling.y = 5;//gridMesh3.scaling.x;
       gridMesh3.scaling.x = 5;//gridMesh3.scaling.x;
       gridMesh3.rotation.x = Math.PI / 2;
       gridMesh3.isPickable = false;
       gridMesh3.material = gridmaterial;
       gridMesh3.alphaIndex = 2;

       scene.meshes.find(m => m.name === 'BackgroundPlane').alphaIndex = 0;

     }
