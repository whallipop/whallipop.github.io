import {RendererDevice, RendererDeviceManager, OrbitParams} from "../../js/ThreeJSHelper/commonUtils.js";

let rendererDevice = new RendererDevice({
        orbitParams: OrbitParams,
    })
RendererDeviceManager.RegisterRenderer(rendererDevice);
RendererDeviceManager.Animate();