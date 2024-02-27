import {OrbitRendererDeviceCreator, RendererDeviceManager, OrbitParams} from "../../js/ThreeJSHelper/commonUtils.js";

const rendererDevice = OrbitRendererDeviceCreator.create({
        orbitParams: OrbitParams.create({
            maxDistance: 100, maxPolarAngle: Math.PI/2,
        }),
    })
RendererDeviceManager.RegisterRenderer(rendererDevice);
console.log(RendererDeviceManager.rendererDeviceArray);
RendererDeviceManager.Animate();
