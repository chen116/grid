

  export  function vicshowAxisConv(sizex,sizey,sizez,axesStrings,scene) {

    sizex=1.0*sizex
    sizey=1.05*sizey
    sizez=1.05*sizez
    const makeTextPlane = function(text, color, size) {
      size=12/10
    const dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 99, scene, true);
    dynamicTexture.hasAlpha = true;
    dynamicTexture.drawText(text, 5, 40, "bold 54px Arial", color , "transparent", true);
    const plane = new BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
    plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
    plane.material.backFaceCulling = false;
    plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
    plane.material.diffuseTexture = dynamicTexture;
    return plane;
     };

     let arrowSize = 10

    const axisX = BABYLON.Mesh.CreateLines("axisX", [
      new BABYLON.Vector3.Zero(), new BABYLON.Vector3(sizex, 0, 0), new BABYLON.Vector3(sizex * 0.95, 0.05 * arrowSize, 0),
      new BABYLON.Vector3(sizex, 0, 0), new BABYLON.Vector3(sizex * 0.95, -0.05 * arrowSize, 0)
      ], scene);
    axisX.color = new BABYLON.Color3(1, 0, 0);
    const xChar = makeTextPlane(axesStrings.x, "red", sizex / 10);
    xChar.position = new BABYLON.Vector3(-arrowSize*0.05+ sizex, -0.05 * arrowSize, 0);

    const axisY = BABYLON.Mesh.CreateLines("axisY", [
        new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, sizey, 0), new BABYLON.Vector3( -0.05 * arrowSize, sizey * 0.95, 0),
        new BABYLON.Vector3(0, sizey, 0), new BABYLON.Vector3( 0.05 * arrowSize, sizey * 0.95, 0)
        ], scene);
    axisY.color = new BABYLON.Color3(0, 1, 0);
    axisY.color = new BABYLON.Color3(1, 0, 0);
    const yChar = makeTextPlane(axesStrings.y, "green", sizey / 10);
    yChar.position = new BABYLON.Vector3(0, arrowSize*0.05+ sizey, -0.05 * arrowSize);


    const axisZ = BABYLON.Mesh.CreateLines("axisZ", [
      new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, sizez),
      new BABYLON.Vector3(arrowSize*0.05,0 ,sizez * 0.95),
      new BABYLON.Vector3(0, 0, sizez), new BABYLON.Vector3(-arrowSize*0.05,0,sizez * 0.95)
      ], scene );
      axisZ.color = new BABYLON.Color3(1, 0, 0);
    const zChar = makeTextPlane(axesStrings.z, "red", sizez / 10);
    zChar.position = new BABYLON.Vector3(0,0.05 * arrowSize,  arrowSize*0.05+sizez);



    const axisY2 = BABYLON.Mesh.CreateLines("axisY2", [
       new BABYLON.Vector3(sizex, 0, sizez),   new BABYLON.Vector3(sizex, sizey, sizez), 
      new BABYLON.Vector3( -0.05 * arrowSize+sizex, sizey * 0.95, sizez),
      new BABYLON.Vector3(sizex, sizey, sizez), 
      new BABYLON.Vector3( 0.05 * arrowSize+sizex, sizey * 0.95, sizez)
      ], scene);
  axisY2.color = new BABYLON.Color3(1, 0, 1);
  const yChar2 = makeTextPlane(axesStrings.y2, "green", sizey / 10);
  yChar2.position = new BABYLON.Vector3(sizex, arrowSize*0.05+ sizey, sizez);


  const axisZ2 = BABYLON.Mesh.CreateLines("axisZ2", [
    new BABYLON.Vector3(sizex,0,0), new BABYLON.Vector3(sizex, 0, sizez),
    new BABYLON.Vector3(sizex+arrowSize*0.05, 0,sizez * 0.95),
    new BABYLON.Vector3(sizex, 0, sizez), new BABYLON.Vector3(sizex-arrowSize*0.05,0,sizez * 0.95)
    ], scene );
    axisZ2.color = new BABYLON.Color3(1, 0, 0);
const zChar2 = makeTextPlane(axesStrings.z, "green", sizey / 10);
zChar2.position = new BABYLON.Vector3(sizex+arrowSize*0.15, arrowSize*0.05, -0.05 * arrowSize+ sizez);
    // const axisZ = BABYLON.Mesh.CreateLines("axisZ", [
    //     new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
    //     new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
    //     ], scene);
    // axisZ.color = new BABYLON.Color3(0, 0, 1);
    // const zChar = makeTextPlane("Z", "blue", size / 10);
    // zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);

    // var liney = BABYLON.Mesh.CreateLines("liney", [ 
    //   new BABYLON.Vector3(0,  -sizey, -3),  new BABYLON.Vector3(0,  sizey, -3)], scene);
    //   liney.color = new BABYLON.Color3(1, 0, 0);
    //   var linex = BABYLON.Mesh.CreateLines("linex", [ 
    //     new BABYLON.Vector3(-sizex,0, -3),  new BABYLON.Vector3( sizex,0, -3)], scene);
    //     linex.color = new BABYLON.Color3(1, 0, 0);
  };

  export  function vicshowAxis(sizex,sizey,sizez,axesStrings,scene) {
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

     let arrowSize = 10

    const axisX = BABYLON.Mesh.CreateLines("axisX", [
      new BABYLON.Vector3.Zero(), new BABYLON.Vector3(sizex, 0, 0), new BABYLON.Vector3(sizex * 0.95, 0.05 * arrowSize, 0),
      new BABYLON.Vector3(sizex, 0, 0), new BABYLON.Vector3(sizex * 0.95, -0.05 * arrowSize, 0)
      ], scene);
    axisX.color = new BABYLON.Color3(1, 0, 0);
    const xChar = makeTextPlane(axesStrings.x, "red", sizex / 10);
    xChar.position = new BABYLON.Vector3(-arrowSize*0.05+ sizex, -0.05 * arrowSize, 0);

    const axisY = BABYLON.Mesh.CreateLines("axisY", [
        new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, sizey, 0), new BABYLON.Vector3( -0.05 * arrowSize, sizey * 0.95, 0),
        new BABYLON.Vector3(0, sizey, 0), new BABYLON.Vector3( 0.05 * arrowSize, sizey * 0.95, 0)
        ], scene);
    axisY.color = new BABYLON.Color3(0, 1, 0);
    axisY.color = new BABYLON.Color3(1, 0, 0);
    const yChar = makeTextPlane(axesStrings.y, "green", sizey / 10);
    yChar.position = new BABYLON.Vector3(0, arrowSize*0.05+ sizey, -0.05 * arrowSize);


    const axisZ = BABYLON.Mesh.CreateLines("axisZ", [
      new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, sizez),
      new BABYLON.Vector3(0, arrowSize*0.05,sizez * 0.95),
      new BABYLON.Vector3(0, 0, sizez), new BABYLON.Vector3(0,arrowSize*0.05,sizez * 0.95)
      ], scene );
      axisZ.color = new BABYLON.Color3(1, 0, 0);
    const zChar = makeTextPlane(axesStrings.z, "red", sizez / 10);
    zChar.position = new BABYLON.Vector3(0,0.05 * arrowSize,  arrowSize*0.05+sizez);


    // const axisZ = BABYLON.Mesh.CreateLines("axisZ", [
    //     new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
    //     new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
    //     ], scene);
    // axisZ.color = new BABYLON.Color3(0, 0, 1);
    // const zChar = makeTextPlane("Z", "blue", size / 10);
    // zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);

    // var liney = BABYLON.Mesh.CreateLines("liney", [ 
    //   new BABYLON.Vector3(0,  -sizey, -3),  new BABYLON.Vector3(0,  sizey, -3)], scene);
    //   liney.color = new BABYLON.Color3(1, 0, 0);
    //   var linex = BABYLON.Mesh.CreateLines("linex", [ 
    //     new BABYLON.Vector3(-sizex,0, -3),  new BABYLON.Vector3( sizex,0, -3)], scene);
    //     linex.color = new BABYLON.Color3(1, 0, 0);
  };
  export  function vicshowAxis2D(sizex,sizey,axesStrings,scene) {
    const makeTextPlane = function(text, color, size) {
      size=12/10
    const dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 99, scene, true);
    dynamicTexture.hasAlpha = true;
    dynamicTexture.drawText(text, 0, 45, "bold 60px Arial", color , "transparent", true);
    const plane = new BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
    plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
    // plane.material.backFaceCulling = false;
    // plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
    plane.material.diffuseTexture = dynamicTexture;
    return plane;
     };

     let arrowSize = 10

    const axisX = BABYLON.Mesh.CreateLines("axisX", [
      new BABYLON.Vector3.Zero(), new BABYLON.Vector3(sizex, 0, 0), new BABYLON.Vector3(sizex * 0.95, 0.05 * arrowSize, 0),
      new BABYLON.Vector3(sizex, 0, 0), new BABYLON.Vector3(sizex * 0.95, -0.05 * arrowSize, 0)
      ], scene);
    axisX.color = new BABYLON.Color3(1, 0, 0);
    const xChar = makeTextPlane(axesStrings.x, "red", sizex / 10);
    xChar.position = new BABYLON.Vector3(arrowSize*0.05+ sizex, -0.05 * arrowSize, 0);

    const axisY = BABYLON.Mesh.CreateLines("axisY", [
        new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, sizey, 0), new BABYLON.Vector3( -0.05 * arrowSize, sizey * 0.95, 0),
        new BABYLON.Vector3(0, sizey, 0), new BABYLON.Vector3( 0.05 * arrowSize, sizey * 0.95, 0)
        ], scene);
    axisY.color = new BABYLON.Color3(0, 1, 0);
    axisY.color = new BABYLON.Color3(1, 0, 0);
    const yChar = makeTextPlane(axesStrings.y, "green", sizey / 10);
    yChar.position = new BABYLON.Vector3(0, arrowSize*0.05+ sizey, -0.05 * arrowSize);




    // const axisZ = BABYLON.Mesh.CreateLines("axisZ", [
    //     new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
    //     new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
    //     ], scene);
    // axisZ.color = new BABYLON.Color3(0, 0, 1);
    // const zChar = makeTextPlane("Z", "blue", size / 10);
    // zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);

    // var liney = BABYLON.Mesh.CreateLines("liney", [ 
    //   new BABYLON.Vector3(0,  -sizey, -3),  new BABYLON.Vector3(0,  sizey, -3)], scene);
    //   liney.color = new BABYLON.Color3(1, 0, 0);
    //   var linex = BABYLON.Mesh.CreateLines("linex", [ 
    //     new BABYLON.Vector3(-sizex,0, -3),  new BABYLON.Vector3( sizex,0, -3)], scene);
    //     linex.color = new BABYLON.Color3(1, 0, 0);
  };
