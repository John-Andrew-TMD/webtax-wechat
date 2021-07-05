// vue.config.js
var webpack = require('webpack') //引入webpack库
const { API_CONFIG_URL } = require("./src/config/config");
const NODE_ENV = process.env.NODE_ENV;
const path = require("path");
const resolve = dir => {
  return path.join(__dirname, dir);
};

// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// 定义压缩文件类型
const productionGzipExtensions = ["js", "css"];
module.exports = {
  configureWebpack: config => {
    if (
      process.env.VUE_APP_CURRENTMODE == "prod" ||
      process.env.VUE_APP_CURRENTMODE == "production"
    ) {
      console.log(process.env.VUE_APP_CURRENTMODE);
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
    config.externals = {
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      axios: "axios",
      vant: "vant",
      moment: "moment"
    };
    if (NODE_ENV === "production") {
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"), //匹配文件名
          threshold: 20480, //对10K以上的数据进行压缩
          minRatio: 0.8,
          deleteOriginalAssets: false //是否删除源文件
        })
      );
    }
  },
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  productionSourceMap: NODE_ENV === "production" ? false : true,
  // publicPath: './', hash模式打包
  // publicPath: '/', history模式打包
  // 路径配置：这里注意跟router的bese路径相对应起来，‘/app’配置表示后端访问目录是app下的目录，否则是根目录
  publicPath: NODE_ENV === "production" ? "/mp" : "/",
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: "static",
  // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  filenameHashing: true,
  chainWebpack: config => {
    config.plugin('ignore')
            .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));//忽略/moment/locale下的所有文件
    // config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    config.plugins.delete("preload"); // TODO: need test
    config.plugins.delete("prefetch"); // TODO: need test
    config.optimization.splitChunks({
      chunks: "all",
      cacheGroups: {
        // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块
        commons: {
          name: "chunk-commons",
          test: resolve("src/components"),
          minChunks: 3, //  被至少用三次以上打包分离
          priority: 5, // 优先级
          reuseExistingChunk: true // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
        },
        node_vendors: {
          name: "chunk-libs",
          chunks: "initial", // 只打包初始时依赖的第三方
          test: /[\\/]node_modules[\\/]/,
          priority: 10
        },
        // vantUI: {
        //   name: "chunk-vantUI", // 单独将 vantUI 拆包
        //   priority: 20, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的
        //   test: /[\\/]node_modules[\\/]_?vant(.*)/
        // }
      }
    });
    config.optimization.runtimeChunk("single");
    config.resolve.alias
      .set("@", resolve("src"))
      .set("observable", resolve("src/observable"))
      .set("api", resolve("src/api"))
      .set("utils", resolve("src/utils"))
      .set("views", resolve("src/views"))
      .set("assets", resolve("src/assets"))
      .set("compQuestionnaire", resolve("src/views/questionnaire/components/components"))
      .set("components", resolve("src/components"));
  },
  // configureWebpack: {
  //   output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
  //       filename: `[name].${Version}.${Timestamp}.js`,
  //       chunkFilename: `[name].${Version}.${Timestamp}.js`
  //     },
  //  },
  css: {
    extract: true,
    // 是否开启 CSS source map？
    sourceMap: false
  },
  // 目前不走代理方式
  devServer: {
    host: "0.0.0.0",
    // port:80,
    hot: true,
    disableHostCheck: true,
    compress: true, //是否压缩
    open: false,
    https: false,
    hotOnly: false,
    progress: true, //将运行进度输出到控制台。
    proxy: {
      "/api": {
        target: API_CONFIG_URL, //请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users ,默认情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器。如果你想要接受需要配置secure: false
        pathRewrite: {
          "^/api": "/"
        },
        context: ["/auth", "/api"],
        ws: true,
        changeOrigin: true
      }
    }
  },
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // 是否使用包含运行时编译器的Vue核心的构建
  runtimeCompiler: false,
  // 跨域设置
  // 可取值参考： https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_settings_attributes
  crossorigin: undefined,
  // 构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性, 默认false
  integrity: false
};
