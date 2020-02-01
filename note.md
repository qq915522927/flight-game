## run npm script
npm run build
npm run start
## install webpack and cli
npm install webpack webpack-cli --save-dev
## css loader
npm install --save-dev style-loader css-loader
## file loader
npm install --save-dev file-loader

## ts的module import 和 webpack的image 冲突， 必须声明 type
声明在 `src/ts/images.d.ts`

## url_loader就够了, 不需要显示的设置file_loader, 显示的设置反而会报错