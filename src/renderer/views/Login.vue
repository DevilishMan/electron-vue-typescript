<template>
  <div class="vue-login">
    <a class="vue-login__btn" :disabled="isLogining" href="javascript:void(0);" @click="openMainWin">open main window</a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Utils } from '../utils/util';
@Component({
  components: {},
})
export default class Login extends Vue {
  private isLogining: boolean = false;
  public openMainWin(): void {
    if (Utils.isAppClient()) {
      import('electron').then(electron => {
        this.isLogining = false;
        electron.ipcRenderer.send('openMainWindow');
      });
    } else {
      this.isLogining = false;
      window.location.href = '/index.html';
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less">
.@{vue-css-prefix}login {
  -webkit-app-region: drag;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &__btn {
    margin-top: 100px;
  }
}
</style>
