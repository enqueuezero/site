<template>
  <div class="mermaid">
    <slot></slot>
  </div>
</template>

<script>
// https://github.com/vuejs/vuepress/issues/111#issuecomment-414309982
export default {
  mounted() {
    import("mermaid/dist/mermaid").then(m => {
      m.initialize({
        startOnLoad: true
      });
      m.init();
    });
  }
};
</script>
