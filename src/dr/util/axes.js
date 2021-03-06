export  function showAxis(size,scene) {
  
    const makeTextPlane = function(text, color, size) {
    const dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
    dynamicTexture.hasAlpha = true;
    dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color , "transparent", true);
    const plane = new BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
    plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
    plane.material.backFaceCulling = false;
    plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
    plane.material.diffuseTexture = dynamicTexture;
    return plane;
     };

    const axisX = BABYLON.Mesh.CreateLines("axisX", [
      new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
      new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
      ], scene);
    axisX.color = new BABYLON.Color3(1, 0, 0);
    const xChar = makeTextPlane("X", "red", size / 10);
    xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);

    const axisY = BABYLON.Mesh.CreateLines("axisY", [
        new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( -0.05 * size, size * 0.95, 0),
        new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( 0.05 * size, size * 0.95, 0)
        ], scene);
    // axisY.color = new BABYLON.Color3(0, 1, 0);
    axisY.color = new BABYLON.Color3(1, 0, 0);
    const yChar = makeTextPlane("Y", "green", size / 10);
    yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
    // const axisZ = BABYLON.Mesh.CreateLines("axisZ", [
    //     new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
    //     new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
    //     ], scene);
    // axisZ.color = new BABYLON.Color3(0, 0, 1);
    // const zChar = makeTextPlane("Z", "blue", size / 10);
    // zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);

    var liney = BABYLON.Mesh.CreateLines("liney", [ 
      new BABYLON.Vector3(0,  -size, -3),  new BABYLON.Vector3(0,  size, -3)], scene);
      liney.color = new BABYLON.Color3(1, 0, 0);
      var linex = BABYLON.Mesh.CreateLines("linex", [ 
        new BABYLON.Vector3(-size,0, -3),  new BABYLON.Vector3( size,0, -3)], scene);
        linex.color = new BABYLON.Color3(1, 0, 0);
  };


  export  function vicshowAxis(sizex,sizey,scene) {
    const makeTextPlane = function(text, color, size) {
      size=12/10
    const dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
    dynamicTexture.hasAlpha = true;
    dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color , "transparent", true);
    const plane = new BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
    plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
    plane.material.backFaceCulling = false;
    plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
    plane.material.diffuseTexture = dynamicTexture;
    return plane;
     };

    const axisX = BABYLON.Mesh.CreateLines("axisX", [
      new BABYLON.Vector3.Zero(), new BABYLON.Vector3(sizex, 0, 0), new BABYLON.Vector3(sizex * 0.95, 0.05 * sizex, 0),
      new BABYLON.Vector3(sizex, 0, 0), new BABYLON.Vector3(sizex * 0.95, -0.05 * sizex, 0)
      ], scene);
    axisX.color = new BABYLON.Color3(1, 0, 0);
    const xChar = makeTextPlane("X", "red", sizex / 10);
    xChar.position = new BABYLON.Vector3(0.9 * sizex, -0.05 * sizex, 0);

    const axisY = BABYLON.Mesh.CreateLines("axisY", [
        new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, sizey, 0), new BABYLON.Vector3( -0.05 * sizey, sizey * 0.95, 0),
        new BABYLON.Vector3(0, sizey, 0), new BABYLON.Vector3( 0.05 * sizey, sizey * 0.95, 0)
        ], scene);
    // axisY.color = new BABYLON.Color3(0, 1, 0);
    axisY.color = new BABYLON.Color3(1, 0, 0);
    const yChar = makeTextPlane("Y", "green", sizey / 10);
    yChar.position = new BABYLON.Vector3(0, 0.9 * sizey, -0.05 * sizey);
    // const axisZ = BABYLON.Mesh.CreateLines("axisZ", [
    //     new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
    //     new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
    //     ], scene);
    // axisZ.color = new BABYLON.Color3(0, 0, 1);
    // const zChar = makeTextPlane("Z", "blue", size / 10);
    // zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);

    var liney = BABYLON.Mesh.CreateLines("liney", [ 
      new BABYLON.Vector3(0,  -sizey, -3),  new BABYLON.Vector3(0,  sizey, -3)], scene);
      liney.color = new BABYLON.Color3(1, 0, 0);
      var linex = BABYLON.Mesh.CreateLines("linex", [ 
        new BABYLON.Vector3(-sizex,0, -3),  new BABYLON.Vector3( sizex,0, -3)], scene);
        linex.color = new BABYLON.Color3(1, 0, 0);
  };
