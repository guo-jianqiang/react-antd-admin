import webpack from "webpack";
import webpackMerge from "webpack-merge";
import common from './webpack.common'
import paths from "./getPath";

export default webpackMerge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: paths.DIST,
        compress: true,
        hot: true,
        port: 8000,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
})
