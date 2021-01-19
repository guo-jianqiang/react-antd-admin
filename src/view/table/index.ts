/** @format */

import LazyComponent from '../../commpent/LazyComponent/LazyComponent'
export default LazyComponent(() => import(/* webpackChunkName: "Table" */ './Table'))
