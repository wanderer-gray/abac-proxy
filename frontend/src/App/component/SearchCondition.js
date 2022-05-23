import React, {
  useState,
  useCallback,
  useEffect
} from 'react'
import PropTypes from 'prop-types'
import TextField from './TextField'
import { Autocomplete } from '@mui/material'
import { wait } from '../utils'

const getCondition = (id) =>
  ConditionAPI.getCondition(id)

const getConditions = (ids) =>
  wait(ids.map(getCondition))

const searchCondition = async (title) => {
  try {
    const ids = await ConditionAPI.searchCondition(title)

    return getConditions(ids)
  } catch {
    nofity({
      variant: 'error',
      message: 'Не удалось получить список условий'
    })
  }

  return []
}

export default function SearchCondition ({
  value,
  onChange,
  ...props
}) {
  const [title, setTitle] = useState('')
  const [conditions, setEffects] = useState([])

  const refresh = useCallback(async () => {
    const conditions = await searchCondition(title)

    setEffects(conditions)
  })

  useEffect(() => { refresh() }, [title])

  return (
    <Autocomplete
      id={'SearchCondition'}
      getOptionLabel={(condition) => condition.title}
      value={value}
      onChange={(_, value) => {
        onChange(value)
      }}
      inputValue={title}
      onInputChange={(_, title) => setTitle(title)}
      options={conditions}
      renderInput={(params) => (
        <TextField
          {...props}
          {...params}
          label={'Условие'}
          placeholder={'Введите условие...'}
        />
      )}
    />
  )
}

SearchCondition.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func
}
