export const componentsTemplate = (path: string, folderPath: string) => {
      return `<template>
  <div class="w-full">
    <Modal
      :width="600"
      v-model="show"
      :closeOnClickModal="false"
      ref="modalRef"
      @close="emit('update:modelValue', false)"
    >
      <div class="modal-content">
        <div class="modal-header py-3">
          <h5 class="modal-title">{{ title }}</h5>
          <div
            class="btn btn-icon btn-sm btn-active-light-primary ms-2"
            @click="emit('update:modelValue', false)"
          >
            <i class="ki-duotone ki-cross fs-1">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
          </div>
        </div>
        <div
          class="modal-body scroll-y pe-7 hover-scroll-overlay-y"
          id="kt_modal_scroll"
          data-kt-scroll="true"
          data-kt-scroll-activate="{default: false, lg: true}"
          data-kt-scroll-max-height="auto"
          data-kt-scroll-wrappers="#kt_modal_scroll"
          data-kt-scroll-offset="300px"
        >
          <!-- form -->
          <!-- v-bind="createMenu.form.value.option" -->
          <!-- v-model="permissionController.updatePermissionsForm.value?.fields" -->
          <KTForm
            :fields="controller.form.value?.fields"
            :onSubmit="controller.form.value?.onSubmit"
          />
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
const show = ref(false);
const emit = defineEmits(["update:modelValue"]);
import { initializeComponents } from "@/core/plugins/keenthemes";

defineProps({
  controller:{
    type:Object,
    required:true,
    default:()=>{}
  },
  title: {
    type: String,
    required:true,
    default: "",
  },
});

onMounted(() => {
  initializeComponents();
  show.value = true;
  nextTick(() => {
    // kt_modal_scroll 滚动条到最上·
    const scroll = document.getElementById("kt_modal_scroll");
    if (scroll) {
      setTimeout(() => {
        scroll.scrollTop = 0;
      }, 0);
    }
  });
});
</script>

<style scoped lang="scss"></style>`
}
