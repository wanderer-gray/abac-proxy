import React, {
  useState,
  useCallback,
  useEffect
} from 'react'
import PropTypes from 'prop-types'
import TextField from './TextField'
import { Autocomplete } from '@mui/material'
import { wait } from '../utils'

const getTarget = (id) =>
  TargetAPI.getTarget(id)

const getTargets = (ids) =>
  wait(ids.map(getTarget))

const searchTarget = async (title) => {
  try {
    const ids = await TargetAPI.searchTarget(title)

    return getTargets(ids)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список целей'
    })
  }

  return []
}

export default function SearchTarget ({
  value,
  onChange,
  ...props
}) {
  const [title, setTitle] = useState('')
  const [targets, setTargets] = useState([])

  const refresh = useCallback(async () => {
    const targets = await searchTarget(title)

    setTargets(targets)
  })

  useEffect(() => { refresh() }, [title])

  return (
    <Autocomplete
      id={'SearchTarget'}
      getOptionLabel={(target) => target.title}
      value={value}
      onChange={(_, value) => {
        onChange(value)
      }}
      inputValue={title}
      onInputChange={(_, title) => setTitle(title)}
      options={targets}
      renderInput={(params) => (
        <TextField
          {...props}
          {...params}
          label={'Цель'}
          placeholder={'Введите цель...'}
        />
      )}
    />
  )
}

SearchTarget.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func
}
