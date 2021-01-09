import LazyComponent from "../../commpent/LazyComponent/LazyComponent";
import React from "react";
export default LazyComponent(() => import(/* webpackChunkName: "Login" */'./Login'))
// export default React.lazy(() => import(/* webpackChunkName: "Login" */'./Login'))