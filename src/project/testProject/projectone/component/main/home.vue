<template>
  <div class='contaniner'>
    <qrcode-vue :value="qrCodeVal"
                :size="littleQrCodeSize"
                level='H'></qrcode-vue>
    <ui-button type="default"></ui-button>
  </div>
</template>
<script>
import { Button } from 'mtapp-ui'
import QrcodeVue from '@/lib/qrCode/index'
export default {
  name: 'home',
  data() {
    return {
      qrCodeVal: '',
      littleQrCodeSize: '50'
    }
  },
  components: {
    QrcodeVue,
    [Button.name]: Button
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
</style>