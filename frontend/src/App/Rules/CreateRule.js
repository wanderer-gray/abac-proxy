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
  SearchEffect,
  SearchTarget,
  SearchCondition,
  SearchNamespace
} from '../component'
import { uuid } from '../utils'

export default function CreateCondition ({ onCreate }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [effect, setEffect] = useState(null)
  const [target, setTarget] = useState(null)
  const [condition, setCondition] = useState(null)
  const [namespace, setNamespace] = useState(null)

  const effectId = useMemo(() => effect?.effectId ?? null, [effect])
  const targetId = useMemo(() => target?.targetId ?? null, [target])
  const conditionId = useMemo(() => condition?.conditionId ?? null, [condition])
  const namespaceName = useMemo(() => namespace?.name ?? null, [namespace])

  const errors = useMemo(() => {
    return {
      title: !title.trim() ? 'Введите название' : undefined,
      effect: !effect ? 'Укажите эффект' : undefined,
      condition: !effect ? 'Укажите условие' : undefined
    }
  }, [title, effect, condition])

  const onOpen = useCallback(() => {
    setTitle('')
    setEffect(null)
    setTarget(null)
    setCondition(null)
    setNamespace(null)

    setOpen(true)
  })
  const onClose = useCallback(() => setOpen(false))

  const onCreateRule = useCallback(async () => {
    const existsError = Object.values(errors).some(Boolean)

    if (existsError) {
      nofity({
        variant: 'warning',
        message: 'Заполните все обязательные поля'
      })

      return
    }

    try {
      await RuleAPI.createRule(uuid(), title, effectId, targetId, conditionId, namespaceName)

      onClose()
      onCreate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось создать правило'
      })
    }
  })

  return (
    <>
      <AddButton onClick={onOpen} />

      <Dialog
        title={'Создание правила'}
        open={open}
        onClose={onClose}
        onSave={onCreateRule}
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
        <SearchEffect
          sx={{ marginBottom: 1 }}
          required={true}
          value={effect}
          onChange={setEffect}
          errorText={errors.effect}
        />
        <SearchTarget
          sx={{ marginBottom: 1 }}
          value={target}
          onChange={setTarget}
        />
        <SearchCondition
          sx={{ marginBottom: 1 }}
          required={true}
          value={condition}
          onChange={setCondition}
          errorText={errors.condition}
        />
        <SearchNamespace
          value={namespace}
          onChange={setNamespace}
        />
      </Dialog>
    </>
  )
}

CreateCondition.propTypes = {
  onCreate: PropTypes.func
}
