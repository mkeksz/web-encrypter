import React from 'react'
import classes from './loadingPopout.module.sass'


type TProps = {
  show: boolean
}

export const LoadingPopout = (p: TProps) => {
  return p.show ? (
    <div className={classes.loadingPopout}>
      <div className={classes.loader}/>
    </div>
  ) : null
}
