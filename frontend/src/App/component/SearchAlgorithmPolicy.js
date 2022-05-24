import React, {
  useState,
  useCallback,
  useEffect
} from 'react'
import PropTypes from 'prop-types'
import TextField from './TextField'
import { Autocomplete } from '@mui/material'
import { wait } from '../utils'

const getAlgorithmPolicy = (id) =>
  AlgorithmPolicyAPI.getAlgorithmPolicy(id)

const getAlgorithmPolicies = (ids) =>
  wait(ids.map(getAlgorithmPolicy))

const searchAlgorithmPolicy = async (title) => {
  try {
    const ids = await AlgorithmPolicyAPI.searchAlgorithmPolicy(title)

    return getAlgorithmPolicies(ids)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список алгоритмов'
    })
  }

  return []
}

export default function SearchAlgorithmPolicy ({
  value,
  onChange,
  ...props
}) {
  const [name, setName] = useState('')
  const [algorithmPolicies, setAlgorithmPolicies] = useState([])

  const refresh = useCallback(async () => {
    const algorithmPolicies = await searchAlgorithmPolicy(name)

    setAlgorithmPolicies(algorithmPolicies)
  })

  useEffect(() => { refresh() }, [name])

  return (
    <Autocomplete
      id={'SearchAlgorithmPolicy'}
      getOptionLabel={(algorithmPolicy) => algorithmPolicy.name}
      value={value}
      onChange={(_, value) => {
        onChange(value)
      }}
      inputValue={name}
      onInputChange={(_, name) => setName(name)}
      options={algorithmPolicies}
      renderInput={(params) => (
        <TextField
          {...props}
          {...params}
          label={'Алгоритм'}
          placeholder={'Введите алгоритм...'}
        />
      )}
    />
  )
}

SearchAlgorithmPolicy.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func
}
