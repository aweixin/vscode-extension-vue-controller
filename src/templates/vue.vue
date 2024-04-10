<template>
      <div>组件内容</div>
</template>

<script setup>
      // emit
      const emit = defineEmits(["close", "success"])
      // props
      const props = defineProps({
            msg: String,
      })
      // 函数
      const show = () => {
            console.log("组件调用")
      }
      // 暴露show 方法 ref 调用
      defineExpose({ show })
</script>

<style lang="scss" scoped></style>
