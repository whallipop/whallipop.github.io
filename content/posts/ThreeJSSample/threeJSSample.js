import {OrbitRendererDevice, RendererDeviceManager, OrbitParams} from "../../js/ThreeJSHelper/commonUtils.js";

let rendererDevice = new OrbitRendererDevice({
        orbitParams: OrbitParams.create({
            maxDistance: 100, maxPolarAngle: Math.PI,
        }),
    })
RendererDeviceManager.RegisterRenderer(rendererDevice.GetRegisterProxy());
RendererDeviceManager.Animate();