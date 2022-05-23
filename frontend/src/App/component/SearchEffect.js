import React, {
  useState,
  useCallback,
  useEffect
} from 'react'
import PropTypes from 'prop-types'
import TextField from './TextField'
import { Autocomplete } from '@mui/material'
import { wait } from '../utils'

const getEffect = (id) =>
  EffectAPI.getEffect(id)

const getEffects = (ids) =>
  wait(ids.map(getEffect))

const searchEffect = async (title) => {
  try {
    const ids = await EffectAPI.searchEffect(title)

    return getEffects(ids)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список эффектов'
    })
  }

  return []
}

export default function SearchEffect ({
  value,
  onChange,
  ...props
}) {
  const [name, setName] = useState('')
  const [effects, setEffects] = useState([])

  const refresh = useCallback(async () => {
    const effects = await searchEffect(name)

    setEffects(effects)
  })

  useEffect(() => { refresh() }, [name])

  return (
    <Autocomplete
      id={'SearchEffect'}
      getOptionLabel={(effect) => effect.name}
      value={value}
      onChange={(_, value) => {
        onChange(value)
      }}
      inputValue={name}
      onInputChange={(_, name) => setName(name)}
      options={effects}
      renderInput={(params) => (
        <TextField
          {...props}
          {...params}
          label={'Эффект'}
          placeholder={'Введите эффект...'}
        />
      )}
    />
  )
}

SearchEffect.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func
}
