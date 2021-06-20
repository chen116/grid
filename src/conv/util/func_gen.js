





function drawSin(scene){
    let line =  scene.getMeshByName("funcPath")
    while(line!=null)
    {
      line.dispose()
      line =  scene.getMeshByName("funcPath")
    }
    const path= [];
    for (let t = 0; t <= 4; t += 1) {
        t= Math.round(t* 100) / 100
        // t=parseFloat(t).toPrecision(2) 
        let x = t;
        let y = Math.sin(t) + 2;
        let z = -50;
        path.push(new BABYLON.Vector3(x, y, z))
        if(t%1==0)
        {
        const lines = BABYLON.MeshBuilder.CreateLines("funcPath", {points:  [ new BABYLON.Vector3(x, 0, -2)  , new BABYLON.Vector3(x, y, -2)    ],
            colors:[new BABYLON.Color4(0, 0,0.5, 1),  new BABYLON.Color4(0,0, 0.5, 1)]   },scene );
            lines.enableEdgesRendering();	
            lines.edgesWidth = 20.0;
            lines.edgesColor = new BABYLON.Color4(0, 0, 0.5, 1);
        }
    
    }
    // for (const mesh of scene.meshes) {
    //     if (mesh.name === 'path') {
    //      console.log('pathhh')
    //     } 
    // }
    return
}

function drawExp(scene){
    let line =  scene.getMeshByName("funcPath")
    while(line!=null)
    {
      line.dispose()
      line =  scene.getMeshByName("funcPath")
    }
    const path= [];
    for (let t = 0; t <= 4; t += 1) {
        t= Math.round(t* 100) / 100
        // t=parseFloat(t).toPrecision(2) 
        let x = t;
        let y = 1*Math.exp(-0.25*t);
        let z = -50;
        path.push(new BABYLON.Vector3(x, y, z))
        if(t%1==0)
        {
        const lines = BABYLON.MeshBuilder.CreateLines("funcPath", {points:  [ new BABYLON.Vector3(x, 0, -2)  , new BABYLON.Vector3(x, y, -2)    ],
            colors:[new BABYLON.Color4(0, 0,0.5, 1),  new BABYLON.Color4(0,0, 0.5, 1)]   },scene );
            lines.enableEdgesRendering();	
            lines.edgesWidth = 20.0;
            lines.edgesColor = new BABYLON.Color4(0, 0, 0.5, 1);
        }
    
    }

}
module.exports = {
    changeColorFuncPath: function(color,scene){
        for (const mesh of scene.meshes) {
            if (mesh.name === 'funcPath') {
                // mesh.edgesWidth = 20.0;
                mesh.edgesColor= new BABYLON.Color4.FromInts(color[0],color[1],color[2],255);//new BABYLON.Color3.FromInts(color[0],color[1],color[2]);

            } 
        }


    },
    withStr: function(funcStr,scene){
        switch(funcStr) {
            case "exp":
                drawExp(scene);
              break;
            case "sin":
                drawSin(scene);
              break;
            default:
              break;
          } 
      
    },

    getFuncArray: function(funcStr){
        let path= [];
        switch(funcStr){
            case "sin":
                for (let t = 0; t <= 4; t += 1) {
                    t= Math.round(t* 100) / 100
                    let x = t;
                    let y = Math.sin(t) + 2;
                    path.push([x,y])
                }
                break;
            case "exp":
                for (let t = 0; t <= 4; t += 1) {
                    t= Math.round(t* 100) / 100
                    let x = t;
                    let y = 1*Math.exp(-0.25*t);
                    path.push([x,y])
                }
                break;
            default:
                break;
        }
        return path;     
    },

}