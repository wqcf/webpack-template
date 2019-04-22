# 基于WEBPACK的Cesium工程

## 启动方法
1. 安装依赖：`npm install`  
2. 运行服务： `npm run start`  
3. 预览效果： 在浏览器输入`http://localhost:8000/pages/template.html`  

## 目录说明
* `assets` 目录为资源文件夹，放图片、数据、模型文件等  
* `src/css/` 目录为公共css目录  
* `src/js/` 目录为公共js目录  
* `src/pages/` 目录为所有页面目录  

## 添加页面
1. 在`src/pages/`创建新页面文件夹，并创建相关html、js、scss文件
2. 在`webpack.config.js`中搜索关键词`STEP`按照步骤，添加相关代码
