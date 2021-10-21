<template>
  <div class="layout-footer">
    &copy;
    <span class="font-medium ml-2">Eng. Elétrica</span>
  </div>
</template>

<script>
export default {
  name: "AppFooter",
  computed: {
    darkTheme()
    {
      return this.$appState.theme.startsWith('saga');
    }
  }
}
</script>

<style scoped>

</style>
