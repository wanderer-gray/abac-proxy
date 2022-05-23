import React, {
  useState,
  useMemo,
  useCallback
} from 'react'
import PropTypes from 'prop-types'
import {
  AddButton,
  Dialog,
  TextField,
  CodeField
} from '../component'
import { uuid } from '../utils'

export default function CreateCondition ({ onCreate }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [source, setSource] = useState('')

  const errors = useMemo(() => {
    return {
      title: !title.trim() ? 'Введите название' : undefined,
      source: !source.trim() ? 'Введите код' : undefined
    }
  }, [title, source])

  const onOpen = useCallback(() => {
    setTitle('')
    setSource('')

    setOpen(true)
  })
  const onClose = useCallback(() => setOpen(false))

  const onCreateCondition = useCallback(async () => {
    const existsError = Object.values(errors).some(Boolean)

    if (existsError) {
      nofity({
        variant: 'warning',
        message: 'Заполните все обязательные поля'
      })

      return
    }

    try {
      await ConditionAPI.createCondition(uuid(), title, source)

      onClose()
      onCreate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось создать условие'
      })
    }
  })

  return (
    <>
      <AddButton onClick={onOpen} />

      <Dialog
        title={'Создание условия'}
        open={open}
        onClose={onClose}
        onSave={onCreateCondition}
      >
        <TextField
          sx={{ marginBottom: 1 }}
          required={true}
          label={'Название'}
          placeholder={'Введите название...'}
          value={title}
          onChangeValue={setTitle}
          errorText={errors.title}
        />
        <CodeField
          required={true}
          rows={3}
          label={'Код'}
          placeholder={'Введите код...'}
          value={source}
          onChangeValue={setSource}
          errorText={errors.source}
        />
      </Dialog>
    </>
  )
}

CreateCondition.propTypes = {
  onCreate: PropTypes.func
}
