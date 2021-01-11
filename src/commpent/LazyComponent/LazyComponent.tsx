/** @format */

import React from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Loadable from 'react-loadable'

NProgress.configure({showSpinner: false})

const LazyLoad = () => {
  React.useEffect(() => {
    NProgress.start()

    return () => {
      NProgress.done()
    }
  })

  return <React.Fragment />
}
const LoadComponent = (loader: any) => {
  return Loadable({
    loader,
    loading: () => <LazyLoad />,
  })
}

export default LoadComponent
