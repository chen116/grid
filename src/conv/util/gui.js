import * as GUI from 'babylonjs-gui';
import func_gen from './func_gen';


export  function vicgui(scene) {

    // GUI
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var panel = new BABYLON.GUI.StackPanel();
    panel.width = "220px";
    panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    advancedTexture.addControl(panel);

    var header = new BABYLON.GUI.TextBlock();
    header.text = "t=0";
    header.height = "20px";
    header.color = "white";
    panel.addControl(header); 

    var slider = new BABYLON.GUI.Slider("SliderStep");
    slider.scaleX = 1;
    slider.minimum = 0;
    slider.maximum = 9;
    slider.value = 0;
    slider.height = "20px";
    slider.width = "200px";
    slider.step = 1;
    slider.onValueChangedObservable.add(function(value) {
        header.text = "t = " + value;
        for (const mesh of scene.meshes) {
            if (  mesh.name.includes("signal")) mesh.visibility=0
            if (  mesh.name.includes("signal") && mesh.name.includes(value.toString()) ) mesh.visibility=1 
        }


        // if (skull) {
        //     skull.rotation.y = value;
        // }
    });
    panel.addControl(slider);    

    const button = new GUI.Button.CreateSimpleButton("buttStep", "step");
    button.width = 0.5;
    button.height = "23px";
    button.color = "white";
    button.background = "grey";
    button.onPointerUpObservable.add(function() {
        slider.value+=1
        slider.value=slider.value%(1+slider.maximum)
        //    box.rotation.y=parseInt(input.text, 10);
        });
    panel.addControl(button);
    
    const button2 = new GUI.Button.CreateSimpleButton("buttClear", "set");
    button2.width = 0.5;
    button2.height = "23px";
    button2.color = "white";
    button2.background = "grey";
    button2.onPointerUpObservable.add(function() {
        slider.value=0
        // for (const mesh of scene.meshes) {
        //     if ( mesh.name.includes("signal")) {
        //         mesh.dispose()
        //     } 
        // }
       scene.getMeshesByTags("signal").forEach(element => { element.dispose()});
        

            let hfuncStr = $('input[name=hfunc]:checked', '#hform').val()
            let xfuncStr = $('input[name=xfunc]:checked', '#xform').val()
            let harr = func_gen.getFuncArray(hfuncStr)
            let xarr = func_gen.getFuncArray(xfuncStr)
            let y_t=[]


            let maxt = 9
        for (let t = 0; t <=maxt; t++) { //harr.length + xarr.length -1
            let zpos = t
            let xarr_t=[] 
            let harr_t=[] 
            y_t.push(0)
            for (let tau=0; tau <=harr.length + xarr.length -1;tau++)
            {
            let h_xpos = tau-0.05
            let x_xpos=h_xpos+0.05*2
            let xpow = 0
            let hpow = 0
            if (!(tau > harr.length-1)) hpow = harr[tau][1]
            if  (! ( t-tau <0 || t-tau > xarr.length-1 )) xpow = xarr[t-tau][1]
            xarr_t.push(new BABYLON.Vector3(x_xpos, 0, zpos) , new BABYLON.Vector3(x_xpos, xpow, zpos) , new BABYLON.Vector3(x_xpos, 0, zpos))
            harr_t.push(new BABYLON.Vector3(h_xpos, 0, zpos) , new BABYLON.Vector3(h_xpos, hpow, zpos) , new BABYLON.Vector3(h_xpos, 0, zpos))
            y_t[t]+=hpow*xpow
        
            }
            const hline = BABYLON.MeshBuilder.CreateLines("signalht"+t.toString(), {points:harr_t   },scene );
            hline.enableEdgesRendering();	
            hline.edgesWidth = 10.0;
            hline.edgesColor = new BABYLON.Color4.FromInts(0,120,0,255) 
            hline.visibility=0
            BABYLON.Tags.AddTagsTo(hline, "signal");
            const xline = BABYLON.MeshBuilder.CreateLines("signalxt"+t.toString(), {points: xarr_t },scene );
            xline.enableEdgesRendering();	
            xline.edgesWidth = 10.0;
            xline.edgesColor = new BABYLON.Color4.FromInts(0,0,120,255) 
            xline.visibility=0
            BABYLON.Tags.AddTagsTo(xline, "signal");

            // const baseline = BABYLON.MeshBuilder.CreateLines("base"+t.toString(), {points:  [ new BABYLON.Vector3(0, 0, zpos)  , new BABYLON.Vector3(gridxsize, 0, zpos)    ] },scene );
            // baseline.enableEdgesRendering();	
            // baseline.edgesWidth = 5.0;
            // baseline.edgesColor = new BABYLON.Color4.FromInts(255,255,255,255) 
            const yline = BABYLON.MeshBuilder.CreateLines("signalyt"+t.toString(), {points:  [ new BABYLON.Vector3(maxt+1, y_t[t], zpos)  , new BABYLON.Vector3(maxt+1, 0, zpos)    ] },scene );
            yline.enableEdgesRendering();	
            yline.edgesWidth = 10.0;
            yline.edgesColor = new BABYLON.Color4.FromInts(120,0,0,255) 
            yline.visibility=0
            BABYLON.Tags.AddTagsTo(yline, "signal");


            if (t==0){
                yline.visibility=1
                xline.visibility=1
                hline.visibility=1
            }
        
        
        
        
        }
         
        });
    panel.addControl(button2);
}
