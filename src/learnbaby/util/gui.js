import * as GUI from 'babylonjs-gui';

export  function vicgui(scene) {


  const blueMat = new BABYLON.StandardMaterial("blue", scene);
  blueMat.emissiveColor = new BABYLON.Color3(0,0,1);

  const redMat = new BABYLON.StandardMaterial("red", scene);
  redMat.emissiveColor = new BABYLON.Color3(1,0,0);

  const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
  box.position.y = 0.5;
  // const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 3, height:3}, scene)

  const toSize = function(isChecked) {
  if (isChecked) {
          box.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
      }
      else {
          box.scaling = new BABYLON.Vector3(1, 1, 1);
      }
  }

  const toPlace = function(isChecked) {
  if (isChecked) {
          box.position.y = 1.5;
      }
      else {
          box.position.y = 0.5;
      }
  }

  const setColor = function(but) {
  switch(but) {
          case 0:
              box.material = blueMat;
          break
          case 1:
              box.material = redMat;
          break
      }
  }

  const orientateY = function(angle) {
  box.rotation.y = angle;
  }

  const displayValue = function(value) {
      return BABYLON.Tools.ToDegrees(value) | 0;
  }

  const transformGroup = new GUI.CheckboxGroup("Transformation");
  transformGroup.addCheckbox("Small", toSize);
  transformGroup.addCheckbox("High", toPlace);

  const colorGroup = new GUI.RadioGroup("Color");
  colorGroup.addRadio("Blue", setColor, true);
  colorGroup.addRadio("Red", setColor);

  const rotateGroup = new GUI.SliderGroup("Rotation", "S");
  rotateGroup.addSlider("Angle", orientateY, "degs", 0, 2 * Math.PI, 0, displayValue)

  const input = new GUI.InputText("dddd");
  input.width = 0.2;
  input.maxWidth = 0.2;
  input.height = "40px";
  input.text = "input:";
  input.color = "white";
      input.background = "green";


  const button = GUI.Button.CreateSimpleButton("but", "Click Me");
  button.width = 0.2;
  button.height = "40px";
  button.color = "white";
  button.background = "green";
  button.onPointerUpObservable.add(function() {
         box.rotation.y=parseInt(input.text, 10);
      });

  //         const plane = BABYLON.Mesh.CreatePlane("plane", 2);
  // // plane.parent = scene;
  // plane.position.y = 2;
  const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
  //const advancedTexture2 = GUI.AdvancedDynamicTexture.CreateForMesh(plane);
  const panel = new GUI.StackPanel();
  panel.background = "black";
  panel.width = 0.2;
  panel.addControl(button);
  panel.addControl(input);

  const selectBox = new GUI.SelectionPanel("sp", [transformGroup, colorGroup, rotateGroup]);
  selectBox.width = 0.15;
  selectBox.height = 0.7;
  selectBox.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  selectBox.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

  advancedTexture.addControl(selectBox);
  advancedTexture.addControl(panel);
  panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
  selectBox.removeFromGroupSelector(0, 0);


}
