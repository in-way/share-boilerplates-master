# 说明

## 特殊说明
这一版的组件脚手架，只能打包单个组件（不是你只能写一个组件的意思），不能打包ui库。意思是入口只有一个！如果需要打包ui库，请联系我（ui组/郑小波）~

## Rollup
组件最后打包是使用Rollup，如需了解，请参考[官方文档](http://www.rollupjs.com/)。

## 流程说明

- 在src/components写你的组件
- 在src/App.js下展示你的组件
- 在rollup.config.common.js输入你的入口文件

```js
export default {
    input: './src/components/Button/index.js', // 打包入口，根据你的项目而定
    cssExtract: true // 是否抽取出css文件
};
```

- 执行npm start   
会同时执行`sharekit server`和`npm run build-component-dev`两条命令。前者是可以预览你的组件，后者是实时编译你的组件。如果碰到什么问题...重新执行一次`npm start`

- 最后调试你的组件无误了，可以执行最后的编译

```bash
npm run build-component-prod
```

有什么问题请联系我~（ui组/郑小波）
