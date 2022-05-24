const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {

    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI * 0.5, Math.PI * 0.5, 10, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    scene.debugLayer.show();
    return scene;
};

const scene = createScene();

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});

// BABYLON.SceneLoader.Append("GLTF/", "E_act_move.glb", scene, function (scene) {
//     scene.activeCamera.alpha += 0.5 * Math.PI;
// });

var r;
const importPromise = BABYLON.SceneLoader.ImportMeshAsync(["Armature"], "GLTF/", "E_act_move.gltf", scene);
// const importPromise = BABYLON.SceneLoader.ImportMeshAsync(["SK_N_41_Body_001_2_SkeletalMeshComponent0"], "GLTF/Pet2/", "PetBody.gltf", scene);
importPromise.then((result) => {
    // Result has meshes, particleSystems, skeletons, animationGroups and transformNodes
    console.log(result);

    r = result;

    var sphere = BABYLON.Mesh.CreateSphere("sphereObject", 16, 1, scene);
    sphere.attachToBone(r.skeletons[0].bones[7], r.meshes[0]);


    // 動態改材質
    var m = new BABYLON.StandardMaterial("myMaterial", scene);
    var path = (Math.random() > 0.5) ? "Texture/uv_E.png" : "Texture/E.png";
    m.diffuseTexture = new BABYLON.Texture(path, scene, true, false);
    result.meshes[1].material = m;
});
