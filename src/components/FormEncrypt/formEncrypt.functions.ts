import React from 'react'
import AES from 'crypto-js/aes'
import CryptoJS from 'crypto-js'


type TEncryptedFile = {
  name?: string,
  algorithm?: string,
  cipherText: string
}

export function encryptFile(
  file: File,
  setShowProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setProgress: React.Dispatch<React.SetStateAction<number>>,
  setTextProgress: React.Dispatch<React.SetStateAction<string>>,
  setHrefDownload: React.Dispatch<React.SetStateAction<string>>,
  setFilenameResult: React.Dispatch<React.SetStateAction<string>>,
  password: string,
  decrypt?: boolean
) {
  let reader = new FileReader()
  if (decrypt) reader.readAsText(file)
  else reader.readAsDataURL(file)

  reader.onprogress = (event) => {
    setShowProgress(true)
    setTextProgress('Чтение файла')

    const progress = +(100/(event.total/event.loaded)).toFixed(1)
    setProgress(progress)
  }
  reader.onerror = () => {
    console.log(reader.error)
  }
  reader.onload = () => {
    setTextProgress(decrypt ? 'Файл расшифрован' : 'Файл зашифрован')

    if (decrypt) {
      let objectCrypt: TEncryptedFile
      try {
        objectCrypt = JSON.parse(reader.result as string)
      } catch {
        alert('Неверный формат файла!')
        setShowProgress(false)
        return
      }
      if (!objectCrypt.cipherText) {
        alert('Неверный формат файла!')
        setShowProgress(false)
        return
      }

      const crypt = AES.decrypt(objectCrypt.cipherText, password)
      const content = crypt.toString(CryptoJS.enc.Latin1)
      console.info('Result decrypt:', content)

      if(!/^data:/.test(content)){
        alert('Неверный ключ или путь к файлу! Попробуйте еще раз.')
        setShowProgress(false)
        return
      }

      if (objectCrypt.name) objectCrypt.name = objectCrypt.name.replace('/+/', ' ')

      const result = content
      const nameFileResult = objectCrypt.name || file.name.replace('.crypt', '')

      setFilenameResult(nameFileResult)
      setHrefDownload(result)
    } else {
      const crypt = AES.encrypt(reader.result, password)
      const cipherText = crypt.toString()
      console.info('Result encrypt:', cipherText)
      const nameFile = file.name.replace(/\.[^/.]+$/, '')

      const objectResult: TEncryptedFile = {
        name: file.name.replace(/ /g, '/+/'),
        algorithm: 'AES-256',
        cipherText,
      }
      const safeString = JSON.stringify(objectResult)
      const result = 'data:application/octet-stream,'+safeString
      const nameFileResult = nameFile + '.crypt'

      setFilenameResult(nameFileResult)
      setHrefDownload(result)
    }
  }
}
