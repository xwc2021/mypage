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

var g_result;
const importPromise = BABYLON.SceneLoader.ImportMeshAsync(["Armature"], "GLTF/", "E_act_move.gltf", scene);
importPromise.then((result) => {
    // Result has meshes, particleSystems, skeletons, animationGroups and transformNodes
    console.log("g_result", result);

    g_result = result;
    g_result.meshes[0].position = new BABYLON.Vector3(2, 0, 0);

    var m = getNoeMaterial();;
    m.getBlockByName("Color3 Pink").value = new BABYLON.Color3(1, 1, 0);
    g_result.meshes[1].material = m;

});

function getNoeMaterial() {
    var nodeMaterial = new BABYLON.NodeMaterial("node");

    // InputBlock
    var position = new BABYLON.InputBlock("position");
    position.visibleInInspector = false;
    position.visibleOnFrame = false;
    position.target = 1;
    position.setAsAttribute("position");

    // TransformBlock
    var WorldPos = new BABYLON.TransformBlock("WorldPos");
    WorldPos.visibleInInspector = false;
    WorldPos.visibleOnFrame = false;
    WorldPos.target = 1;
    WorldPos.complementZ = 0;
    WorldPos.complementW = 1;

    // InputBlock
    var World = new BABYLON.InputBlock("World");
    World.visibleInInspector = false;
    World.visibleOnFrame = false;
    World.target = 1;
    World.setAsSystemValue(BABYLON.NodeMaterialSystemValues.World);

    // TransformBlock
    var WorldPosViewProjectionTransform = new BABYLON.TransformBlock("WorldPos * ViewProjectionTransform");
    WorldPosViewProjectionTransform.visibleInInspector = false;
    WorldPosViewProjectionTransform.visibleOnFrame = false;
    WorldPosViewProjectionTransform.target = 1;
    WorldPosViewProjectionTransform.complementZ = 0;
    WorldPosViewProjectionTransform.complementW = 1;

    // InputBlock
    var ViewProjection = new BABYLON.InputBlock("ViewProjection");
    ViewProjection.visibleInInspector = false;
    ViewProjection.visibleOnFrame = false;
    ViewProjection.target = 1;
    ViewProjection.setAsSystemValue(BABYLON.NodeMaterialSystemValues.ViewProjection);

    // VertexOutputBlock
    var VertexOutput = new BABYLON.VertexOutputBlock("VertexOutput");
    VertexOutput.visibleInInspector = false;
    VertexOutput.visibleOnFrame = false;
    VertexOutput.target = 1;

    // InputBlock
    var uv = new BABYLON.InputBlock("uv");
    uv.visibleInInspector = false;
    uv.visibleOnFrame = false;
    uv.target = 1;
    uv.setAsAttribute("uv");

    // VectorSplitterBlock
    var VectorSplitter = new BABYLON.VectorSplitterBlock("VectorSplitter");
    VectorSplitter.visibleInInspector = false;
    VectorSplitter.visibleOnFrame = false;
    VectorSplitter.target = 4;

    // GradientBlock
    var Gradient = new BABYLON.GradientBlock("Gradient");
    Gradient.visibleInInspector = false;
    Gradient.visibleOnFrame = false;
    Gradient.target = 4;
    Gradient.colorSteps = [];
    Gradient.colorSteps.push(new BABYLON.GradientBlockColorStep(0.25, new BABYLON.Color3(0, 0, 0)));
    Gradient.colorSteps.push(new BABYLON.GradientBlockColorStep(1, new BABYLON.Color3(1, 1, 1)));

    // ReplaceColorBlock
    var Replacecolor = new BABYLON.ReplaceColorBlock("Replace color");
    Replacecolor.visibleInInspector = false;
    Replacecolor.visibleOnFrame = false;
    Replacecolor.target = 4;

    // InputBlock
    var Color = new BABYLON.InputBlock("Color3");
    Color.visibleInInspector = false;
    Color.visibleOnFrame = false;
    Color.target = 1;
    Color.value = new BABYLON.Color3(0, 0, 0);
    Color.isConstant = false;

    // InputBlock
    var Float = new BABYLON.InputBlock("Float");
    Float.visibleInInspector = false;
    Float.visibleOnFrame = false;
    Float.target = 1;
    Float.value = 0.25;
    Float.min = 0;
    Float.max = 0;
    Float.isBoolean = false;
    Float.matrixMode = 0;
    Float.animationType = BABYLON.AnimatedInputBlockTypes.None;
    Float.isConstant = false;

    // InputBlock
    var Color1 = new BABYLON.InputBlock("Color3 Pink");
    Color1.visibleInInspector = false;
    Color1.visibleOnFrame = false;
    Color1.target = 1;
    Color1.value = new BABYLON.Color3(1, 0.40784313725490196, 0.9058823529411765);
    Color1.isConstant = false;

    // FragmentOutputBlock
    var FragmentOutput = new BABYLON.FragmentOutputBlock("FragmentOutput");
    FragmentOutput.visibleInInspector = false;
    FragmentOutput.visibleOnFrame = false;
    FragmentOutput.target = 2;
    FragmentOutput.convertToGammaSpace = false;
    FragmentOutput.convertToLinearSpace = false;
    FragmentOutput.useLogarithmicDepth = false;

    // Connections
    position.output.connectTo(WorldPos.vector);
    World.output.connectTo(WorldPos.transform);
    WorldPos.output.connectTo(WorldPosViewProjectionTransform.vector);
    ViewProjection.output.connectTo(WorldPosViewProjectionTransform.transform);
    WorldPosViewProjectionTransform.output.connectTo(VertexOutput.vector);
    uv.output.connectTo(VectorSplitter.xyIn);
    VectorSplitter.x.connectTo(Gradient.gradient);
    Gradient.output.connectTo(Replacecolor.value);
    Color.output.connectTo(Replacecolor.reference);
    Float.output.connectTo(Replacecolor.distance);
    Color1.output.connectTo(Replacecolor.replacement);
    Replacecolor.output.connectTo(FragmentOutput.rgb);

    // Output nodes
    nodeMaterial.addOutputNode(VertexOutput);
    nodeMaterial.addOutputNode(FragmentOutput);
    nodeMaterial.build();
    return nodeMaterial;
}