<template>
  <div id="app"
       @touchmove.prevent>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {}
}
</script>

<style>
</style>