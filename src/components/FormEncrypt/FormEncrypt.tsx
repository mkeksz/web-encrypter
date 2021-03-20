import React, {SyntheticEvent, useState} from 'react'
import {Input} from '../UI/Input/Input'
import {Button} from '../UI/Button/Button'
import {TFile} from '../../types'
import {encryptFile} from './formEncrypt.functions'


const textError = 'Введите ключ'

type TProps = {
  file: TFile,
  setShowProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setProgress: React.Dispatch<React.SetStateAction<number>>,
  setTextProgress: React.Dispatch<React.SetStateAction<string>>,
  setHrefDownload: React.Dispatch<React.SetStateAction<string>>,
  setFilenameResult: React.Dispatch<React.SetStateAction<string>>
}

export const FormEncrypt = (p: TProps) => {
  const [password, setPassword] = useState('')
  const [showError, setShowError] = useState(false)

  const onClickCrypt = (decrypt = false) => {
    if (!password) {
      setShowError(true)
      return
    }
    p.file && encryptFile(p.file, p.setShowProgress, p.setProgress, p.setTextProgress, p.setHrefDownload, p.setFilenameResult, password, decrypt)
  }
  const onChangePassword = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement
    setPassword(target.value)
    setShowError(!target.value)
  }

  return (
    <div style={{paddingTop: '40px'}}>
      <Input textError={showError ? textError : ''} value={password} onChange={onChangePassword} type='password' placeholder='Ключ шифрования'/>
      <br/>
      <br/>
      <br/>
      <div style={{display: 'grid', gridGap: '20px', gridTemplateColumns: '50% 50%'}}>
        <Button disabled={showError} style={{width: '100%'}} onClick={() => onClickCrypt()}>
          Зашифровать
        </Button>
        <Button disabled={showError} style={{width: '100%'}} onClick={() => onClickCrypt(true)}>
          Расшифровать
        </Button>
      </div>
    </div>
  )
}
