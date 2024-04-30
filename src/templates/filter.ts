export const filterTemplate = () => {
      return `
<template>
  <KTdrawer
    v-model="controller.filterShow.value"
    v-if="controller.filterShow.value"
    :destroy-on-close="true"
    :width="400"
  >
    <template #title>
      <h2>筛选</h2>
    </template>
    <KTForm
      :fields="controller.filterForm.value.fields"
      :onSubmit="controller.filterForm.value.onSubmit"
      :onReset="controller.filterForm.value?.onReset"
      v-bind="controller.filterForm.value.option"
    />
  </KTdrawer>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);
import { reinitializeComponents } from "@/core/plugins/keenthemes";
import controller from "../controller/index";

defineProps({
  title: {
    type: String,
    default: "",
  },
});

onMounted(() => {
  nextTick(() => {
    reinitializeComponents();
  });
});
</script>

<style scoped lang="scss"></style>


`
}
