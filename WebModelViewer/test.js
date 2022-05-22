const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {

    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI * 0.5, Math.PI * 0.5, 5, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

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

var is_skinned_mesh = false;

if (is_skinned_mesh) {
    const importPromise = BABYLON.SceneLoader.ImportMeshAsync(["Armature"], "GLTF/", "E_act_move.gltf", scene);
    importPromise.then((result) => {
        // Result has meshes, particleSystems, skeletons, animationGroups and transformNodes
        console.log(result);

        // 移動
        result.transformNodes[14].position = new BABYLON.Vector3(0, -1.5, 0);

        // 動態改材質
        // var m = new BABYLON.StandardMaterial("myMaterial", scene);
        // m.diffuseColor = new BABYLON.Color3(0, 1, 0);
        // result.meshes[1].material = m;
    });
} else {
    const importPromise = BABYLON.SceneLoader.ImportMeshAsync(["MotoBody"], "GLTF/", "bike_3.gltf", scene);
    importPromise.then((result) => {
        // Result has meshes, particleSystems, skeletons, animationGroups and transformNodes
        console.log(result);

        // 移動
        result.transformNodes[0].position = new BABYLON.Vector3(0, -0.5, 0);

        // 動態改材質
        var m = new BABYLON.StandardMaterial("myMaterial", scene);
        m.diffuseColor = new BABYLON.Color3(0, 1, 0);
        result.meshes[3].material = m;
    });
}