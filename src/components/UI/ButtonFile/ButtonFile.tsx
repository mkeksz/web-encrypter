import React, {SyntheticEvent} from 'react'
import classes from './buttonFile.module.sass'


type TProps = {
  onChange: (event: SyntheticEvent) => void,
  onClick: () => void,
  nameFile?: string | null
}

export const ButtonFile = (p: TProps) => {
  return (
    <label onClick={p.onClick}>
      <div className={classes.buttonFile}>
        <span>{p.nameFile || 'выберите файл'}</span>
      </div>
      <input onChange={p.onChange} type='file' name='file' style={{display: 'none'}}/>
    </label>
  )
}
