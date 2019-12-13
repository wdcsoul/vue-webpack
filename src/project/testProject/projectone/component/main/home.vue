<template>
  <div class='contaniner'>
    <qrcode-vue :value="qrCodeVal"
                :size="littleQrCodeSize"
                level='H'></qrcode-vue>
  </div>
</template>
<script>
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
    QrcodeVue
  }
}
</script>
<style lang="less" scoped>
</style>