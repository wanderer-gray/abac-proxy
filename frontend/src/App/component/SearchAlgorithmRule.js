import React, {
  useState,
  useCallback,
  useEffect
} from 'react'
import PropTypes from 'prop-types'
import TextField from './TextField'
import { Autocomplete } from '@mui/material'
import { wait } from '../utils'

const getAlgorithmRule = (id) =>
  AlgorithmRuleAPI.getAlgorithmRule(id)

const getAlgorithmRules = (ids) =>
  wait(ids.map(getAlgorithmRule))

const searchAlgorithmRule = async (title) => {
  try {
    const ids = await AlgorithmRuleAPI.searchAlgorithmRule(title)

    return getAlgorithmRules(ids)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список алгоритмов'
    })
  }

  return []
}

export default function SearchAlgorithmRule ({
  value,
  onChange,
  ...props
}) {
  const [name, setName] = useState('')
  const [algorithmRules, setAlgorithmRules] = useState([])

  const refresh = useCallback(async () => {
    const algorithmRules = await searchAlgorithmRule(name)

    setAlgorithmRules(algorithmRules)
  })

  useEffect(() => { refresh() }, [name])

  return (
    <Autocomplete
      id={'SearchCondition'}
      getOptionLabel={(algorithmRule) => algorithmRule.name}
      value={value}
      onChange={(_, value) => {
        onChange(value)
      }}
      inputValue={name}
      onInputChange={(_, name) => setName(name)}
      options={algorithmRules}
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

SearchAlgorithmRule.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func
}
