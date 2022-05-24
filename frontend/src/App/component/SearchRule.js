import React, {
  useState,
  useCallback,
  useEffect
} from 'react'
import PropTypes from 'prop-types'
import TextField from './TextField'
import { Autocomplete } from '@mui/material'
import { wait } from '../utils'

const getRule = (id) =>
  RuleAPI.getRule(id)

const getRules = (ids) =>
  wait(ids.map(getRule))

const searchRule = async (title) => {
  try {
    const ids = await RuleAPI.searchRule(title)

    return getRules(ids)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список правил'
    })
  }

  return []
}

export default function SearchRule ({
  value,
  onChange,
  ...props
}) {
  const [title, setTitle] = useState('')
  const [rules, setRules] = useState([])

  const refresh = useCallback(async () => {
    const rules = await searchRule(title)

    setRules(rules)
  })

  useEffect(() => { refresh() }, [title])

  return (
    <Autocomplete
      id={'SearchRule'}
      getOptionLabel={(rule) => rule.title}
      value={value}
      onChange={(_, value) => {
        onChange(value)
      }}
      inputValue={title}
      onInputChange={(_, title) => setTitle(title)}
      options={rules}
      renderInput={(params) => (
        <TextField
          {...props}
          {...params}
          label={'Правило'}
          placeholder={'Введите правило...'}
        />
      )}
    />
  )
}

SearchRule.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func
}
