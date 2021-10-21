<template>
  <div class="layout-menu-container">
    <AppSubmenu :items="model"
                :root="true"
                class="layout-menu"
                @menuitem-click="onMenuItemClick"/>
  </div>
</template>

<script>
import AppSubmenu from './AppSubmenu';

export default {
  props: {
    model: Array
  },
  methods: {
    onMenuItemClick(event)
    {
      this.$emit('menuitem-click', event);
    }
  },
  components: {
    'AppSubmenu': AppSubmenu
  }
}
</script>

<style scoped>

</style>
