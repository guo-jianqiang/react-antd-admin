/** @format */

import LazyComponent from '../../components/LazyComponent/LazyComponent'
export default LazyComponent(() => import(/* webpackChunkName: "Table" */ './Table'))
