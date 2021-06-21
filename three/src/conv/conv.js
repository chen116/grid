import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


function main() {
  const canvas = document.querySelector('#renderCanvas');
  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize(1080*.65, 500);


  const fov = 60;
  const aspect = 1080*.65 / 500;  // the canvas default
  const near = 1;
  const far = 10000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 5, 1.5).setLength(100);
  const controls = new OrbitControls(camera, canvas);

  // const controls = new OrbitControls(camera, canvas);


  const scene = new THREE.Scene();


  const plane = new THREE.GridHelper(100, 10);
  plane.rotation.set(Math.PI/2,0,0)
//   plane.rotation= new THREE.Euler(0, 0, 0)
  scene.add(plane);

    {
        const axesHelper = new THREE.AxesHelper( 100 );
        scene.add( axesHelper );
    }


    const gridHelper = new THREE.GridHelper(100, 10); // 500 is grid size, 20 is grid step
    gridHelper.position.set( 0, 0, 0);
    gridHelper.rotation.set( 0, 0, 0);
    scene.add(gridHelper);
    // const gridHelper2 = new THREE.GridHelper(100, 10);
    // gridHelper2.rotation.set( Math.PI / 2, 0, 0);
    // scene.add(gridHelper2);
    const gridHelper3= gridHelper.clone();
    gridHelper3.rotation.set( Math.PI / 2, 0, Math.PI / 2);
    scene.add(gridHelper3);
    


  function render(time) {


    renderer.render(scene, camera);
    requestAnimationFrame(render);

  }
  requestAnimationFrame(render);

}



main();

