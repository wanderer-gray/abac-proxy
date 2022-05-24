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
  SearchTarget,
  SearchAlgorithmPolicy,
  SearchNamespace
} from '../component'

function getPolicySetData (policySet, { title, targetId, algorithmPolicyId, namespaceName }) {
  const policySetData = {}

  if (policySet.title !== title) {
    policySetData.title = title
  }

  if (policySet.targetId !== targetId) {
    policySetData.targetId = targetId
  }

  if (policySet.algorithmPolicyId !== algorithmPolicyId) {
    policySetData.algorithmPolicyId = algorithmPolicyId
  }

  if (policySet.namespaceName !== namespaceName) {
    policySetData.namespaceName = namespaceName
  }

  return policySetData
}

export default function UpdatePolicySet ({ policySet, onUpdate }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(policySet.title)
  const [target, setTarget] = useState(policySet.target)
  const [algorithmPolicy, setAlgorithmPolicy] = useState(policySet.algorithmPolicy)
  const [namespace, setNamespace] = useState(policySet.namespace)

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

  const onOpen = useCallback(() => setOpen(true))
  const onClose = useCallback(() => setOpen(false))

  const onUpdatePolicySet = useCallback(async () => {
    const existsError = Object.values(errors).some(Boolean)

    if (existsError) {
      nofity({
        variant: 'warning',
        message: 'Заполните все обязательные поля'
      })

      return
    }

    const policySetData = getPolicySetData(policySet, { title, targetId, algorithmPolicyId, namespaceName })

    if (!Object.keys(policySetData).length) {
      onClose()

      return
    }

    try {
      await PolicySetAPI.updatePolicySet(policySet.policySetId, policySetData)

      onClose()
      onUpdate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось изменить группу политик'
      })
    }
  })

  return (
    <>
      <EditButton onClick={onOpen} />

      <Dialog
        title={'Редактирование группы политик'}
        open={open}
        onClose={onClose}
        onSave={onUpdatePolicySet}
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

UpdatePolicySet.propTypes = {
  policySet: PropTypes.object,
  onUpdate: PropTypes.func
}
