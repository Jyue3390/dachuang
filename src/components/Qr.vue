<template>
    <div id="qrcode" ref="qrcode"></div>
</template>

<script>
  import QRCode from 'qrcodejs2'  // 引入qrcode
    export default {
        name: "qrcode",
      methods: {
        qrcode() {
          let qrcode = new QRCode('qrcode', {
            width: 132,
            height: 132,
            text: 'https://www.baidu.com', // 需要二维码跳转的地址
            colorDark : "#000", //前景色
        	colorLight : "rgba(0,0,0,0)", //背景色
          })
        },
      },

      mounted () {
        this.qrcode();
      },
    }
</script>

<style scoped>

  #qrcode{
    width: 100px;
    height: 100px;
  }
</style>
