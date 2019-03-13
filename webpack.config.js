const path = require("path");
const HWP = require("html-webpack-plugin");
module.exports = {
"entry":  [__dirname+"/src/index.js"],
output: {
  filename: "build.js",
  path: path.join(__dirname, "/dist")},
     module:{
        rules:[{
            exclude: /node_modules/,
            test: /\.js$/,
            loader: 'babel-loader'
        }]
         },
 plugins:[
     new HWP(
       {template: path.join(__dirname,"/src/index.html")}
      )
   ]
 };