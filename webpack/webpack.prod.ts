import {CleanWebpackPlugin} from 'clean-webpack-plugin'
import webpackMerge from "webpack-merge";
import common from './webpack.common'
import paths from './getPath'
export default webpackMerge(common, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin()
    ]
})
