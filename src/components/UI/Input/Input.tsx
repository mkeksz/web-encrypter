import React, {CSSProperties, SyntheticEvent} from 'react'
import classes from './input.module.sass'


type TProps = {
  placeholder?: string,
  type: string,
  style?: CSSProperties,
  textError?: string,
  value?: string,
  onChange?: (event: SyntheticEvent) => void
}

export const Input = (p: TProps) => {
  return (
    <label>
      <input value={p.value} onChange={p.onChange} style={p.style} className={classes.input} type={p.type} placeholder={p.placeholder}/>
      {p.textError && (
        <>
          <br/>
          <span className={classes.error}>{p.textError}</span>
        </>
      )}
    </label>
  )
}
