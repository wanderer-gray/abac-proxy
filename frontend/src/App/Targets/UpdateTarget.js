import React, {
  useState,
  useMemo,
  useCallback
} from 'react'
import PropTypes from 'prop-types'
import {
  EditButton,
  Dialog,
  TextField,
  CodeField
} from '../component'

function getTargetData (target, { title, source }) {
  const targetData = {}

  if (target.title !== title) {
    targetData.title = title
  }

  if (target.source !== source) {
    targetData.source = source
  }

  return targetData
}

export default function UpdateTarget ({ target, onUpdate }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(target.title)
  const [source, setSource] = useState(target.source)

  const errors = useMemo(() => {
    return {
      title: !title.trim() ? 'Введите название' : undefined,
      source: !source.trim() ? 'Введите код' : undefined
    }
  }, [title, source])

  const onOpen = useCallback(() => setOpen(true))
  const onClose = useCallback(() => setOpen(false))

  const updateTarget = useCallback(async () => {
    const existsError = Object.values(errors).some(Boolean)

    if (existsError) {
      nofity({
        variant: 'warning',
        message: 'Заполните все обязательные поля'
      })

      return
    }

    const targetData = getTargetData(target, { title, source })

    if (!Object.keys(targetData).length) {
      onClose()

      return
    }

    try {
      await TargetAPI.updateTarget(target.targetId, targetData)

      onClose()
      onUpdate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось изменить цель'
      })
    }
  })

  return (
    <>
      <EditButton onClick={onOpen} />

      <Dialog
        title={'Редактирование цели'}
        open={open}
        onClose={onClose}
        onSave={updateTarget}
      >
        <TextField
          sx={{ marginBottom: 1 }}
          required={true}
          label={'Название'}
          placeholder={'Введите название...'}
          fullWidth={true}
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

UpdateTarget.propTypes = {
  target: PropTypes.object,
  onUpdate: PropTypes.func
}
