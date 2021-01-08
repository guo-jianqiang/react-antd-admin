import {CleanWebpackPlugin} from 'clean-webpack-plugin'
import webpackMerge from "webpack-merge";
import common from './webpack.common'
import paths from './getPath'
export default webpackMerge(common, {
    mode: 'production',
    output: {
        pathinfo: true,
        filename: '[name].[chunkhash].js',
        path: paths.DIST,
        chunkFilename: '[name].[chunkhash].js'
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
})
