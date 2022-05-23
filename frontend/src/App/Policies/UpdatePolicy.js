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
  SearchAlgorithmRule,
  SearchNamespace
} from '../component'

function getPolicyData (rule, { title, targetId, algorithmRuleId, namespaceName }) {
  const policyData = {}

  if (rule.title !== title) {
    policyData.title = title
  }

  if (rule.targetId !== targetId) {
    policyData.targetId = targetId
  }

  if (rule.algorithmRuleId !== algorithmRuleId) {
    policyData.algorithmRuleId = algorithmRuleId
  }

  if (rule.namespaceName !== namespaceName) {
    policyData.namespaceName = namespaceName
  }

  return policyData
}

export default function UpdatePolicy ({ policy, onUpdate }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(policy.title)
  const [target, setTarget] = useState(policy.target)
  const [algorithmRule, setAlgorithmRule] = useState(policy.algorithmRule)
  const [namespace, setNamespace] = useState(policy.namespace)

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

  const onOpen = useCallback(() => setOpen(true))
  const onClose = useCallback(() => setOpen(false))

  const onUpdatePolicy = useCallback(async () => {
    const existsError = Object.values(errors).some(Boolean)

    if (existsError) {
      nofity({
        variant: 'warning',
        message: 'Заполните все обязательные поля'
      })

      return
    }

    const policyData = getPolicyData(policy, { title, targetId, algorithmRuleId, namespaceName })

    if (!Object.keys(policyData).length) {
      onClose()

      return
    }

    try {
      await PolicyAPI.updatePolicy(policy.policyId, policyData)

      onClose()
      onUpdate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось изменить политику'
      })
    }
  })

  return (
    <>
      <EditButton onClick={onOpen} />

      <Dialog
        title={'Редактирование политики'}
        open={open}
        onClose={onClose}
        onSave={onUpdatePolicy}
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

UpdatePolicy.propTypes = {
  policy: PropTypes.object,
  onUpdate: PropTypes.func
}
