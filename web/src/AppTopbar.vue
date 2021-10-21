<template>
  <div class="layout-topbar">
    <router-link class="layout-topbar-logo"
                 to="/">
      <img :src="'images/logo.jpg'"
           alt="Logo"/>
    </router-link>
    <button class="p-link layout-menu-button layout-topbar-button"
            @click="onMenuToggle">
      <i class="pi pi-bars"></i>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    onMenuToggle(event)
    {
      this.$emit('menu-toggle', event);
    },
  }
}
</script>
