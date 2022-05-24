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
  SearchAlgorithmPolicy,
  SearchNamespace
} from '../component'
import { uuid } from '../utils'

export default function CreatePolicy ({ onCreate }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [target, setTarget] = useState(null)
  const [algorithmPolicy, setAlgorithmPolicy] = useState(null)
  const [namespace, setNamespace] = useState(null)

  const targetId = useMemo(() => target?.targetId ?? null, [target])
  const algorithmPolicyId = useMemo(() => algorithmPolicy?.algorithmPolicyId ?? null, [algorithmPolicy])
  const namespaceName = useMemo(() => namespace?.name ?? null, [namespace])

  const errors = useMemo(() => {
    return {
      title: !title.trim() ? 'Введите название' : undefined,
      target: !target ? 'Укажите цель' : undefined,
      algorithmPolicy: !algorithmPolicy ? 'Укажите алгоритм' : undefined
    }
  }, [title, target, algorithmPolicy])

  const onOpen = useCallback(() => {
    setTitle('')
    setTarget(null)
    setAlgorithmPolicy(null)
    setNamespace(null)

    setOpen(true)
  })
  const onClose = useCallback(() => setOpen(false))

  const onCreatePolicySet = useCallback(async () => {
    const existsError = Object.values(errors).some(Boolean)

    if (existsError) {
      nofity({
        variant: 'warning',
        message: 'Заполните все обязательные поля'
      })

      return
    }

    try {
      await PolicySetAPI.createPolicySet(uuid(), title, targetId, algorithmPolicyId, namespaceName)

      onClose()
      onCreate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось создать группу политик'
      })
    }
  })

  return (
    <>
      <AddButton onClick={onOpen} />

      <Dialog
        title={'Создание группы политик'}
        open={open}
        onClose={onClose}
        onSave={onCreatePolicySet}
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
        <SearchAlgorithmPolicy
          sx={{ marginBottom: 1 }}
          required={true}
          value={algorithmPolicy}
          onChange={setAlgorithmPolicy}
          errorText={errors.algorithmPolicy}
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
