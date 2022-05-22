import React, {
  useState,
  useCallback
} from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Typography,
  TextField,
  Button
} from '@mui/material'

export default function LogIn ({ OnLogin }) {
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')

  const logIn = useCallback(async () => {
    try {
      await AuthAPI.logIn(nickname, password)
    } catch {
      nofity({
        variant: 'error',
        message: 'Не удалось войти в систему'
      })
    }

    OnLogin()
  })

  return (
    <Grid
      container={true}
      justifyContent={'center'}
      alignItems={'center'}
      sx={{
        position: 'fixed',
        width: '100%',
        height: '100%'
      }}
    >
      <Grid item={true}>
        <Typography
          sx={{ mb: 2 }}
          variant={'h5'}
        >
          Войти в систему
        </Typography>

        <TextField
          sx={{ mb: 1 }}
          label={'Логин'}
          placeholder={'Введите логин...'}
          fullWidth={true}
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
        />

        <TextField
          sx={{ mb: 2 }}
          type={'password'}
          label={'Пароль'}
          placeholder={'Введите пароль...'}
          fullWidth={true}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button
          sx={{ mb: 2 }}
          variant={'outlined'}
          fullWidth={true}
          onClick={logIn}
        >
          Войти
        </Button>
      </Grid>
    </Grid>
  )
}

LogIn.propTypes = {
  OnLogin: PropTypes.func.isRequired
}
