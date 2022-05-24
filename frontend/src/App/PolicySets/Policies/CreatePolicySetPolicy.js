import React, {
  useState,
  useMemo,
  useCallback
} from 'react'
import PropTypes from 'prop-types'
import {
  AddButton,
  Dialog,
  SearchPolicy
} from '../../component'
import { uuid } from '../../utils'

export default function CreatePolicySetPolicy ({ policySetId, onCreate }) {
  const [open, setOpen] = useState(false)
  const [policy, setPolicy] = useState(null)

  const policyId = useMemo(() => policy?.policyId ?? null, [policy])

  const errors = useMemo(() => {
    return {
      policy: !policy ? 'Укажите политику' : undefined
    }
  }, [policy])

  const onOpen = useCallback(() => {
    setPolicy(null)

    setOpen(true)
  })
  const onClose = useCallback(() => setOpen(false))

  const onAddPolicySetPolicy = useCallback(async () => {
    const existsError = Object.values(errors).some(Boolean)

    if (existsError) {
      nofity({
        variant: 'warning',
        message: 'Заполните все обязательные поля'
      })

      return
    }

    try {
      await PolicySetAPI.addPolicySetPolicy(uuid(), policySetId, policyId)

      onClose()
      onCreate()
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось создать политику группы'
      })
    }
  })

  return (
    <>
      <AddButton onClick={onOpen} />

      <Dialog
        title={'Создание политики группы'}
        open={open}
        onClose={onClose}
        onSave={onAddPolicySetPolicy}
      >
        <SearchPolicy
          required={true}
          value={policy}
          onChange={setPolicy}
          errorText={errors.policy}
        />
      </Dialog>
    </>
  )
}

CreatePolicySetPolicy.propTypes = {
  policySetId: PropTypes.string,
  onCreate: PropTypes.func
}
