function rollupPluginTransferManifest(opts) {
  return {
    name: "rollup-plugin-transfer-manifest", // rollup插件名称，必须符合格式
    generateBundle(options, bundle) {
      console.log(options, bundle);

      // code : load就是插件对象特有的属性，这里可以放一些逻辑
    }
  }
}


export default rollupPluginTransferManifest