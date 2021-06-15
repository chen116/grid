import * as BABYLON from 'babylonjs';
export function createRay(zpos,scene)
{

    var vbox = BABYLON.Mesh.CreateBox("vbox", 1, scene);
    vbox.position.x= 0;
    vbox.position.z = zpos;
    vbox.position.y = -49;
    vbox.setEnabled(true);

    var ray = new BABYLON.Ray();
    var rayHelper = new BABYLON.RayHelper(ray);
    
    var localMeshDirection = new BABYLON.Vector3(0, 1, 0);
    var localMeshOrigin = new BABYLON.Vector3(0, 0, 0);
    var length = 50*20;
    
    rayHelper.attachToMesh(vbox, localMeshDirection, localMeshOrigin, length);
    // rayHelper.show(scene,BABYLON.Color3.Red);


    var sphere = BABYLON.MeshBuilder.CreateSphere('vsphere', {diameter: 0.25}, scene);
    
    sphere.setEnabled(false);


    return  [vbox,sphere,ray,rayHelper]


}