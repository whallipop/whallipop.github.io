import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

export const OrbitParams = {
    minDistance: 20,
    maxDistance: 50,
    maxPolarAngle: Math.PI / 2,
}

// let container, group, camera, scene, renderer;
export class RendererDevice {
    constructor({
        lightInfoList = null, orbitParams = null, onWindowResize = null,
        useContainerSize = true,
    }) {
        this.container = document.getElementById('container');
        this.useContainerSize = useContainerSize;
        this.UpdateSize();

        // create scene
        this.scene = new THREE.Scene();
    
        // create renderer
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( this.width, this.height );
        document.body.appendChild( this.renderer.domElement );
        
        // create camera
        this.camera = new THREE.PerspectiveCamera( 40, this.width / this.height, 1, 1000 );
        this.camera.position.set( 15, 20, 30 );
        this.scene.add( this.camera);
        if (orbitParams != null){
            AttachOrbitControls(this.camera, this.renderer.domElement, orbitParams);
        }

        // light list
        this.AddLight(lightInfoList);

        // TODO(): AxesHelper
        this.scene.add( new THREE.AxesHelper( 20 ) );

        this.TestScene();

        // Add to container
        this.container.appendChild( this.renderer.domElement );
        window.addEventListener('resize', onWindowResize != null ? onWindowResize : this.onWindowResizeDefault);
    }

    UpdateSize(){
        if (this.useContainerSize){
            this.width = this.container.offsetWidth;
            this.height = this.container.offsetHeight;
        }
        else {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
        }
    }

    AddLight(lightInfoList){
        // if (lightInfoList == null || typeof(lightInfoList) != "Array" || lightInfoList.length > 0) {
        //     return;
        // }
        // TODO():
        // ambient light
        this.scene.add( new THREE.AmbientLight( 0x666666 ) );

        // point light
        const light = new THREE.PointLight( 0xffffff, 3, 0, 0 );
        this.camera.add( light );
    }

    onWindowResizeDefault() {
        this.UpdateSize();
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( this.width, this.height );
    }

    TestScene(){
        // textures
        const loader = new THREE.TextureLoader();
        const texture = loader.load( 'sprites/disc.png' );
        texture.colorSpace = THREE.SRGBColorSpace;

        this.group = new THREE.Group();
        this.scene.add( this.group );

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
        this.group.add( points );

        // convex hull

        const meshMaterial = new THREE.MeshLambertMaterial( {
            color: 0xffffff,
            opacity: 0.5,
            side: THREE.DoubleSide,
            transparent: true
        } );

        const meshGeometry = new ConvexGeometry( vertices );

        const mesh = new THREE.Mesh( meshGeometry, meshMaterial );
        this.group.add( mesh );
    }
};

export class RendererDeviceManager {
    static rendererDeviceArray = [];
    static Animate(){
        requestAnimationFrame( RendererDeviceManager.Animate );
        RendererDeviceManager.rendererDeviceArray.forEach((rendererDevice) => 
            rendererDevice.renderer.render( 
                rendererDevice.scene, rendererDevice.camera));
    }

    static RegisterRenderer(renderDevice){
        this.rendererDeviceArray.push(renderDevice);
    }

    static UnRegisterRenderer(renderDevice){
        const index = this.rendererDeviceArray.indexOf(renderDevice);
        if (index > -1) { // only splice array when item is found
            this.rendererDeviceArray.splice(index, 1); // 2nd parameter means remove one item only
        }
    }
}

export function AnimateRenderer( rendererDevice) {
    var global_animate = function(){
        requestAnimationFrame( global_animate );
        rendererDevice.renderer.render( rendererDevice.scene, rendererDevice.camera);
    }
    global_animate();
}

function AttachOrbitControls(camera, domElement, orbitParams) {
    // orbit camera controls
    const controls = new OrbitControls( camera, domElement );
    controls.minDistance = orbitParams.minDistance;
    controls.maxDistance = orbitParams.maxDistance;
    controls.maxPolarAngle = orbitParams.maxPolarAngle;
}
