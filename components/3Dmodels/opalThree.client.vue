<script setup lang="ts">
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  Fog,
  AmbientLight,
  Vector2,
  DirectionalLight
} from 'three'
import { useWindowSize } from '@vueuse/core'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader'

let renderer: WebGLRenderer
let composer: EffectComposer
let renderPass: RenderPass
let controls: OrbitControls

const conSize: Ref<HTMLElement | null> = ref(null)
const experience: Ref<HTMLCanvasElement | null> = ref(null)

const width = ref(0)
const height = ref(0)
const aspectRatio = computed(() => width.value / height.value)

const bgColor = new Color('#300F7B')

const scene = new Scene()

// scene.fog = new Fog(bgColor, 0.1, 75)
// scene.background = bgColor

const camera = new PerspectiveCamera(75, aspectRatio.value, 0.1, 1000)
camera.position.set(0, 0.5, 3)

scene.add(camera)

const ambientLight = new AmbientLight(0x3700B3, 7)
scene.add(ambientLight)

const directionalLight = new DirectionalLight(0xB899FF, 10)
directionalLight.position.set(3, 3, 3)
scene.add(directionalLight)

const { load } = useGLTFModel()

const { scene: model } = await load('/models/scene.gltf') as { scene: any }

scene.add(model)

function updateCamera () {
  camera.aspect = aspectRatio.value
  camera.updateProjectionMatrix()
}

function updateRenderer () {
  renderer.setSize(width.value, height.value)
  renderer.render(scene, camera)
  const bloomPass = new UnrealBloomPass(new Vector2(width.value, height.value), 10, 5, 10)
  const luminancePass = new ShaderPass(LuminosityShader)
  composer.addPass(renderPass)
  composer.addPass(bloomPass)
  composer.addPass(luminancePass)
}

function setRenderer () {
  if (experience.value) {
    renderer = new WebGLRenderer({ canvas: experience.value, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))
    // controls = new OrbitControls(camera, renderer.domElement)
    // controls.enableDamping = true

    composer = new EffectComposer(renderer)
    renderPass = new RenderPass(scene, camera)

    updateRenderer()
  }
}

function outputsize () {
  if (conSize.value) {
    width.value = conSize.value.offsetWidth
    height.value = conSize.value.offsetWidth
    updateCamera()
    updateRenderer()
  }
}
watch(aspectRatio, () => {
  updateCamera()
  updateRenderer()
})

watch(experience, () => {
  setRenderer()
  loop()
})
watch(conSize, () => {
  if (conSize.value) {
    new ResizeObserver(outputsize).observe(conSize.value)
    outputsize()
  }
})

const loop = () => {
  // controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(loop)
  scene.children[3].children[0].rotation.z += 0.005
}
</script>
<template>
  <div ref="conSize" class="flex size-full justify-center">
    <canvas ref="experience" />
  </div>
</template>
