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

function getConditionData (target, { title, source }) {
  const conditionData = {}

  if (target.title !== title) {
    conditionData.title = title
  }

  if (target.source !== source) {
    conditionData.source = source
  }

  return conditionData
}

export default function UpdateCondition ({ condition, onUpdate }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(condition.title)
  const [source, setSource] = useState(condition.source)

  const errors = useMemo(() => {
    return {
      title: !title.trim() ? 'Введите название' : undefined,
      source: !source.trim() ? 'Введите код' : undefined
    }
  }, [title, source])

  const onOpen = useCallback(() => setOpen(true))
  const onClose = useCallback(() => setOpen(false))

  const onUpdateCondition = useCallback(async () => {
    const existsError = Object.values(errors).some(Boolean)

    if (existsError) {
      nofity({
        variant: 'warning',
        message: 'Заполните все обязательные поля'
      })

      return
    }

    const conditionData = getConditionData(condition, { title, source })

    if (!Object.keys(conditionData).length) {
      onClose()

      return
    }

    try {
      await ConditionAPI.updateCondition(condition.conditionId, conditionData)

      onClose()
      onUpdate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось изменить условие'
      })
    }
  })

  return (
    <>
      <EditButton onClick={onOpen} />

      <Dialog
        title={'Редактирование условия'}
        open={open}
        onClose={onClose}
        onSave={onUpdateCondition}
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

UpdateCondition.propTypes = {
  condition: PropTypes.object,
  onUpdate: PropTypes.func
}
