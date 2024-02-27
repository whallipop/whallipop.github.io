import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

export const OrbitParams = {
    minDistance: 20,
    maxDistance: 50,
    maxPolarAngle: Math.PI/2,
    create: function ({minDistance = 20, maxDistance= 50, maxPolarAngle= Math.PI/2}) {
      const newParams = Object.create(this);
      newParams.minDistance = minDistance;
      newParams.maxDistance = maxDistance;
      newParams.maxPolarAngle = maxPolarAngle;
      return newParams;
    }
}

//#region The "virtual base class" of the RendererDevice
export const RendererDeviceInterface = {
    width: 0, height: 0,
    renderer: null, camera: null, scene: null,
    container: null, useContainerSize: true,
    create: function (
        width, height,
        container, scene, renderer, camera,
        useContainerSize=true,
        onWindowResize=null) {
      const newProxy = Object.create(this);
      newProxy.container = container;
      newProxy.renderer = renderer;
      newProxy.camera = camera;
      newProxy.scene = scene;
      newProxy.useContainerSize = useContainerSize;
      // custom windows resize callback
      newProxy.onWindowResize = onWindowResize == null? RendererDeviceManager.onWindowResizeDefault : onWindowResize;
      newProxy.InitRenderer();
      return newProxy;
    },

    InitRenderer: function(){
        this.scene.add( this.camera);
        // Add to container
        this.container.appendChild( this.renderer.domElement );
    }
}
//#endregion

// #region basic creators
class SceneCreator{
    static create(){
        const scene = new THREE.Scene();
        // scene.background = new THREE.Color( 0xffffff ); //useless?

        // AxesHelper
        scene.add( new THREE.AxesHelper( 100 ));

        // TODO
        TestScene(scene);
        return scene;
    }
}

class RendererCreator{
    static create(width, height, renderScale){
        var renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio * renderScale);
        renderer.setSize( width, height );
        document.body.appendChild( renderer.domElement );
        return renderer;
    }
}

class BasicCameraCreator{
    static create(width, height){
        const camera = new THREE.PerspectiveCamera( 40, width / height, 1, 1000 );
        camera.position.set( 15, 20, 30 );
        return camera;
    }
}
// #endregion

// #region Device creators
export class OrbitRendererDeviceCreator {
    static create({
        lightInfoList = null, orbitParams = OrbitParams, onWindowResize = null,
        useContainerSize = true, renderScale = 1,
    }) {
        const container = document.getElementById('container');
        const [width, height] = RendererDeviceManager.UpdateSize(useContainerSize, container);

        const orbitRendererDevice = RendererDeviceInterface.create(
            width, height, container,
            SceneCreator.create(),
            RendererCreator.create(width, height, renderScale),
            BasicCameraCreator.create(width, height),
            useContainerSize, onWindowResize)
        
        this.AttachOrbitControls(orbitRendererDevice, orbitParams);
        
        // TODO
        AddLight(lightInfoList, orbitRendererDevice);

        return orbitRendererDevice;
    }

    static AttachOrbitControls(rendererDevice, orbitParams) {
        // orbit camera controls
        const controls = new OrbitControls( rendererDevice.camera, rendererDevice.renderer.domElement );
        controls.minDistance = orbitParams.minDistance;
        controls.maxDistance = orbitParams.maxDistance;
        controls.maxPolarAngle = orbitParams.maxPolarAngle;
    }
};
// #endregion

// #region Renderer Device Manager
export class RendererDeviceManager {
    static rendererDeviceArray = [];
    static Animate(){
        requestAnimationFrame( RendererDeviceManager.Animate );
        RendererDeviceManager.rendererDeviceArray.forEach((rendererDevice) => 
            rendererDevice.renderer.render( 
                rendererDevice.scene, rendererDevice.camera));
    }

    static globalOnWindowResize(){
        RendererDeviceManager.rendererDeviceArray.forEach((rendererDevice) => 
            rendererDevice.onWindowResize(rendererDevice));
    }

    static RegisterRenderer(renderDeviceInterface){
        this.rendererDeviceArray.push(renderDeviceInterface);
    }

    static UnRegisterRenderer(renderDevice){
        const index = this.rendererDeviceArray.indexOf(renderDevice);
        if (index > -1) { // only splice array when item is found
            this.rendererDeviceArray.splice(index, 1); // 2nd parameter means remove one item only
        }
    }

    static Init(){
        window.addEventListener('resize', RendererDeviceManager.globalOnWindowResize);
    }

    static onWindowResizeDefault(rendererDevice) {
        const [width, height] = RendererDeviceManager.UpdateSize(
            rendererDevice.useContainerSize, rendererDevice.container);
        rendererDevice.width = width;
        rendererDevice.height = height;
        rendererDevice.camera.aspect = rendererDevice.width / rendererDevice.height;
        rendererDevice.camera.updateProjectionMatrix();
        rendererDevice.renderer.setSize( rendererDevice.width, rendererDevice.height);
    }

    static UpdateSize(useContainerSize, container){
        if (useContainerSize){
            return [container.offsetWidth, container.offsetHeight];
        }
        else {
            return [window.innerWidth, window.innerHeight];
        }
    }
}
//#endregion

RendererDeviceManager.Init();


export function AddLight(lightInfoList, rendererDevice){
    // if (lightInfoList == null || typeof(lightInfoList) != "Array" || lightInfoList.length > 0) {
    //     return;
    // }
    // TODO():
    // ambient light
    rendererDevice.scene.add( new THREE.AmbientLight( 0x666666 ) );

    // point light
    const light = new THREE.PointLight( 0xffffff, 3, 0, 0 );
    rendererDevice.camera.add( light );
}

export function TestScene(scene){
    // textures
    const loader = new THREE.TextureLoader();
    const texture = loader.load( 'sprites/disc.png' );
    texture.colorSpace = THREE.SRGBColorSpace;

    const group = new THREE.Group();
    scene.add( group );

    // points
    let dodecahedronGeometry = new THREE.DodecahedronGeometry( 10 );

    // if normal and uv attributes are not removed, mergeVertices() can't consolidate indentical vertices with different normal/uv data
    dodecahedronGeometry.deleteAttribute( 'normal' );
    dodecahedronGeometry.deleteAttribute( 'uv' );

    dodecahedronGeometry = BufferGeometryUtils.mergeVertices( dodecahedronGeometry );

    const vertices = [];
    const positionAttribute = dodecahedronGeometry.getAttribute( 'position' );

    for ( let i = 0; i < positionAttribute.count; i ++ ) {

        const vertex = new THREE.Vector3();
        vertex.fromBufferAttribute( positionAttribute, i );
        vertices.push( vertex );

    }

    const pointsMaterial = new THREE.PointsMaterial( {
        color: 0x0080ff,
        map: texture,
        size: 1,
        alphaTest: 0.5
    } );

    const pointsGeometry = new THREE.BufferGeometry().setFromPoints( vertices );

    const points = new THREE.Points( pointsGeometry, pointsMaterial );
    group.add( points );

    // convex hull

    const meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0xffffff,
        opacity: 0.5,
        side: THREE.DoubleSide,
        transparent: true
    } );

    const meshGeometry = new ConvexGeometry( vertices );

    const mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    group.add( mesh );
}