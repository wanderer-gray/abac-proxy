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
  SearchTarget,
  SearchAlgorithmRule,
  SearchNamespace
} from '../component'
import { uuid } from '../utils'

export default function CreatePolicy ({ onCreate }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [target, setTarget] = useState(null)
  const [algorithmRule, setAlgorithmRule] = useState(null)
  const [namespace, setNamespace] = useState(null)

  const targetId = useMemo(() => target?.targetId ?? null, [target])
  const algorithmRuleId = useMemo(() => algorithmRule?.algorithmRuleId ?? null, [algorithmRule])
  const namespaceName = useMemo(() => namespace?.name ?? null, [namespace])

  const errors = useMemo(() => {
    return {
      title: !title.trim() ? 'Введите название' : undefined,
      target: !target ? 'Укажите цель' : undefined,
      algorithmRule: !algorithmRule ? 'Укажите алгоритм' : undefined
    }
  }, [title, target, algorithmRule])

  const onOpen = useCallback(() => {
    setTitle('')
    setTarget(null)
    setAlgorithmRule(null)
    setNamespace(null)

    setOpen(true)
  })
  const onClose = useCallback(() => setOpen(false))

  const onCreatePolicy = useCallback(async () => {
    const existsError = Object.values(errors).some(Boolean)

    if (existsError) {
      nofity({
        variant: 'warning',
        message: 'Заполните все обязательные поля'
      })

      return
    }

    try {
      await PolicyAPI.createPolicy(uuid(), title, targetId, algorithmRuleId, namespaceName)

      onClose()
      onCreate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось создать политику'
      })
    }
  })

  return (
    <>
      <AddButton onClick={onOpen} />

      <Dialog
        title={'Создание политики'}
        open={open}
        onClose={onClose}
        onSave={onCreatePolicy}
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
        <SearchTarget
          sx={{ marginBottom: 1 }}
          required={true}
          value={target}
          onChange={setTarget}
          errorText={errors.target}
        />
        <SearchAlgorithmRule
          sx={{ marginBottom: 1 }}
          required={true}
          value={algorithmRule}
          onChange={setAlgorithmRule}
          errorText={errors.algorithmRule}
        />
        <SearchNamespace
          value={namespace}
          onChange={setNamespace}
        />
      </Dialog>
    </>
  )
}

CreatePolicy.propTypes = {
  onCreate: PropTypes.func
}
