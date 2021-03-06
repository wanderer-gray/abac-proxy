import React, {
  useState,
  useMemo,
  useCallback
} from 'react'
import PropTypes from 'prop-types'
import {
  AddButton,
  Dialog,
  SearchRule
} from '../../component'
import { uuid } from '../../utils'

export default function CreatePolicyRule ({ policyId, onCreate }) {
  const [open, setOpen] = useState(false)
  const [rule, setRule] = useState(null)

  const ruleId = useMemo(() => rule?.ruleId ?? null, [rule])

  const errors = useMemo(() => {
    return {
      rule: !rule ? 'Укажите правило' : undefined
    }
  }, [rule])

  const onOpen = useCallback(() => {
    setRule(null)

    setOpen(true)
  })
  const onClose = useCallback(() => setOpen(false))

  const onAddPolicyRule = useCallback(async () => {
    const existsError = Object.values(errors).some(Boolean)

    if (existsError) {
      nofity({
        variant: 'warning',
        message: 'Заполните все обязательные поля'
      })

      return
    }

    try {
      await PolicyAPI.addPolicyRule(uuid(), policyId, ruleId)

      onClose()
      onCreate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось создать правило политики'
      })
    }
  })

  return (
    <>
      <AddButton onClick={onOpen} />

      <Dialog
        title={'Создание правила политики'}
        open={open}
        onClose={onClose}
        onSave={onAddPolicyRule}
      >
        <SearchRule
          required={true}
          value={rule}
          onChange={setRule}
          errorText={errors.rule}
        />
      </Dialog>
    </>
  )
}

CreatePolicyRule.propTypes = {
  policyId: PropTypes.string,
  onCreate: PropTypes.func
}
