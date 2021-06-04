import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize(window.innerWidth, window.innerHeight);


  const fov = 60;
  const aspect = window.innerWidth / window.innerHeight;  // the canvas default
  const near = 1;
  const far = 10000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 5, 1.5).setLength(100);
  const controls = new OrbitControls(camera, canvas);

  // const controls = new OrbitControls(camera, canvas);


  const scene = new THREE.Scene();


  const axes = buildAxes( 1000 );
  scene.add(axes);


  const plane = new THREE.GridHelper(100, 10);
  scene.add(plane);
  //
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(10, 16, 8), new THREE.MeshBasicMaterial({color: "red", wireframe: true}));
  sphere.position.set(-20, 0, 0);
  const cube = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshBasicMaterial({color: "green", wireframe: true}));
  cube.position.set(20, 0, 0);
  const worldAxis = new THREE.AxesHelper(20);
  sphere.add(worldAxis);
  scene.add(sphere);
  scene.add(cube);

  const sphereAxis = new THREE.AxesHelper(20);
  sphere.add(sphereAxis);
  const cubeAxis = new THREE.AxesHelper(20);
  cube.add(cubeAxis);



//3d grid
let xSize = 3;
let ySize = 4;
let zSize = 5;
let n = xSize * ySize * zSize;

let geometry = new THREE.BufferGeometry();

function mapTo3D(i) {
	let z = Math.floor(i / (xSize * ySize));
	i -= z * xSize * ySize;
	let y = Math.floor(i / xSize);
	let x = i % xSize;
	return { x: x, y: y, z: z };
}

function mapFrom3D(x, y, z) {
	return x + y * xSize + z * xSize * ySize;
}

let positions = [];
for (let i = 0; i < n; i++) {
	let p = mapTo3D(i);
	positions.push((p.x - xSize / 2) / xSize);
	positions.push((p.y - ySize / 2) / ySize);
	positions.push((p.z - zSize / 2) / zSize);
}
let positionAttribute = new THREE.Float32BufferAttribute(positions, 3);
geometry.setAttribute("position", positionAttribute);

let indexPairs = [];
for (let i = 0; i < n; i++) {
	let p = mapTo3D(i);
	if (p.x + 1 < xSize) {
		indexPairs.push(i);
		indexPairs.push(mapFrom3D(p.x + 1, p.y, p.z));
	}
	if (p.y + 1 < ySize) {
		indexPairs.push(i);
		indexPairs.push(mapFrom3D(p.x, p.y + 1, p.z));
	}
	if (p.z + 1 < zSize) {
		indexPairs.push(i);
		indexPairs.push(mapFrom3D(p.x, p.y, p.z + 1));
	}
}
geometry.setIndex(indexPairs);
let lines = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial());
scene.add(lines);


  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width  = canvas.clientWidth  * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {

    // if (resizeRendererToDisplaySize(renderer)) {
    //   const canvas = renderer.domElement;
    //   camera.aspect = canvas.clientWidth / canvas.clientHeight;
    //   camera.updateProjectionMatrix();
    //   document.querySelector('#ee').textContent="yes";
    // }
    // else{
    //   document.querySelector('#ee').textContent="no";
    // }
    // document.querySelector('#ee').textContent=time;



    renderer.render(scene, camera);
    requestAnimationFrame(render);

  }
  requestAnimationFrame(render);

}


function vicbuildAxis(src,dst,a,b){
    const points = [];
    points.push( src );
    points.push( dst );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );

    const material = new THREE.LineDashedMaterial({ linewidth: 3, color: 0xffff00 });
    // geometry.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

    const line = new THREE.Line( geometry, material );
    return line;

  }
  function buildAxes( length ) {
      var axes = new THREE.Object3D();

      axes.add( vicbuildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) ); // +X
      axes.add( vicbuildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0xFF0000, true) ); // -X
      axes.add( vicbuildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00, false ) ); // +Y
      axes.add( vicbuildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x00FF00, true ) ); // -Y
      axes.add( vicbuildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); // +Z
      axes.add( vicbuildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x0000FF, true ) ); // -Z

      return axes;

  }

main();

