import React, {
  useState,
  useCallback,
  useEffect
} from 'react'
import PropTypes from 'prop-types'
import TextField from './TextField'
import { Autocomplete } from '@mui/material'
import { wait } from '../utils'

const getPolicy = (id) =>
  PolicyAPI.getPolicy(id)

const getPolicies = (ids) =>
  wait(ids.map(getPolicy))

const searchPolicy = async (title) => {
  try {
    const ids = await PolicyAPI.searchPolicy(title)

    return getPolicies(ids)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список политик'
    })
  }

  return []
}

export default function SearchPolicy ({
  value,
  onChange,
  ...props
}) {
  const [title, setTitle] = useState('')
  const [policies, setPolicies] = useState([])

  const refresh = useCallback(async () => {
    const policies = await searchPolicy(title)

    setPolicies(policies)
  })

  useEffect(() => { refresh() }, [title])

  return (
    <Autocomplete
      id={'SearchRule'}
      getOptionLabel={(policy) => policy.title}
      value={value}
      onChange={(_, value) => {
        onChange(value)
      }}
      inputValue={title}
      onInputChange={(_, title) => setTitle(title)}
      options={policies}
      renderInput={(params) => (
        <TextField
          {...props}
          {...params}
          label={'Политика'}
          placeholder={'Введите политику...'}
        />
      )}
    />
  )
}

SearchPolicy.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func
}
