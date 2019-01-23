<template>
  <div class="vue-home">
    <div class="vue-home-welcome">
      <HelloWord></HelloWord>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWord from '../components/HelloWorld.vue';
@Component({
  components: { HelloWord },
})
export default class Home extends Vue {}
</script>
<style lang="less" rel="stylesheet/less">
.@{vue-css-prefix}home {
  -webkit-app-region: drag;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  &-welcome {
  }
}
</style>
