<template>
  <TresCanvas window-size clear-color="#241246" shadows>
    <TresPerspectiveCamera :position="[1, 3, 8]" :look-at="[0,0,0]" />
    <Suspense>
      <primitive ref="opalRef" :object="model" />
    </Suspense>
    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight :position="[3, 3, 3]" :intensity="2" />
    <EffectComposer>
      <Bloom
        :intensity="1"
        :luminance-threshold="1"
        :luminance-smoothing="1"
        :mipmap-blur="true"
        :blend-function="1"
      />
    </EffectComposer>
  </TresCanvas>
</template>
<script setup lang="ts">
const { scene: model } = await useGLTF('/models/scene.gltf')
const opalRef = ref()
const { onLoop } = useRenderLoop()
onLoop(() => {
  if (opalRef.value) {
    opalRef.value.rotation.y += 0.01
  }
})
</script>
