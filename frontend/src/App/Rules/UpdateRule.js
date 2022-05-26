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
  SearchEffect,
  SearchTarget,
  SearchCondition,
  SearchNamespace
} from '../component'

function getRuleData (rule, { title, effectId, targetId, conditionId, namespaceName }) {
  const ruleData = {}

  if (rule.title !== title) {
    ruleData.title = title
  }

  if (rule.effectId !== effectId) {
    ruleData.effectId = effectId
  }

  if (rule.targetId !== targetId) {
    ruleData.targetId = targetId
  }

  if (rule.conditionId !== conditionId) {
    ruleData.conditionId = conditionId
  }

  if (rule.namespaceName !== namespaceName) {
    ruleData.namespaceName = namespaceName
  }

  return ruleData
}

export default function UpdateRule ({ rule, onUpdate }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(rule.title)
  const [effect, setEffect] = useState(rule.effect)
  const [target, setTarget] = useState(rule.target)
  const [condition, setCondition] = useState(rule.condition)
  const [namespace, setNamespace] = useState(rule.namespace)

  const effectId = useMemo(() => effect?.effectId ?? null, [effect])
  const targetId = useMemo(() => target?.targetId ?? null, [target])
  const conditionId = useMemo(() => condition?.conditionId ?? null, [condition])
  const namespaceName = useMemo(() => namespace?.name ?? null, [namespace])

  const errors = useMemo(() => {
    return {
      title: !title.trim() ? 'Введите название' : undefined,
      effect: !effect ? 'Укажите эффект' : undefined,
      condition: !condition ? 'Укажите условие' : undefined
    }
  }, [title, effect, condition])

  const onOpen = useCallback(() => setOpen(true))
  const onClose = useCallback(() => setOpen(false))

  const onUpdateRule = useCallback(async () => {
    const existsError = Object.values(errors).some(Boolean)

    if (existsError) {
      nofity({
        variant: 'warning',
        message: 'Заполните все обязательные поля'
      })

      return
    }

    const ruleData = getRuleData(rule, { title, effectId, targetId, conditionId, namespaceName })

    if (!Object.keys(ruleData).length) {
      onClose()

      return
    }

    try {
      await RuleAPI.updateRule(rule.ruleId, ruleData)

      onClose()
      onUpdate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось изменить правило'
      })
    }
  })

  return (
    <>
      <EditButton onClick={onOpen} />

      <Dialog
        title={'Редактирование правила'}
        open={open}
        onClose={onClose}
        onSave={onUpdateRule}
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

UpdateRule.propTypes = {
  rule: PropTypes.object,
  onUpdate: PropTypes.func
}
