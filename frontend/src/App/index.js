import React, {
  Fragment,
  useMemo,
  useCallback
} from 'react'
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate
} from 'react-router-dom'
import { useAuth } from '../Auth'
import {
  Container,
  Grid,
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
  Divider
} from '@mui/material'

const pages = [
  {
    path: '/namespace',
    title: 'Пространства имен',
    element: null
  },
  {
    path: '/target',
    title: 'Цели',
    element: null
  },
  {
    path: '/condition',
    title: 'Условия',
    element: null
  },
  {
    path: '/rules',
    title: 'Правила',
    element: null
  },
  {
    path: '/policies',
    title: 'Политики',
    element: null
  },
  {
    path: '/policySets',
    title: 'Группы политик',
    element: null
  },
  {
    divider: true,
    path: '/sandbox',
    title: 'Песочница',
    element: null
  }
]

export default function App () {
  const location = useLocation()
  const navigate = useNavigate()

  const auth = useAuth()

  const currentPath = useMemo(() => location.pathname, [location.pathname])

  const onNavigate = useCallback((path) => () => navigate(path))

  return (
    <Container
      maxWidth={'lg'}
      disableGutters={true}
    >
      <Grid
        container={true}
        spacing={4}
      >
        <Grid
          item={true}
          xs={3}
        >
          <List
            component={'nav'}
            subheader={
              <ListSubheader>
                Abac Proxy
              </ListSubheader>
            }
          >
            {pages.map(({ path, divider, title }) => {
              return (
                <Fragment key={path}>
                  {divider ? <Divider /> : null}

                  <ListItemButton
                    selected={path === currentPath}
                    onClick={onNavigate(path)}
                  >
                    <ListItemText primary={title} />
                  </ListItemButton>
                </Fragment>
              )
            })}

            <Divider />

            <ListItemButton onClick={auth.logOut}>
              <ListItemText secondary={'Выйти'} />
            </ListItemButton>
          </List>
        </Grid>

        <Grid
          item={true}
          xs={9}
        >
          <Routes>
            {pages.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={element}
              />
            ))}
            <Route path={'*'} element={<Navigate to={'/namespace'} />} />
          </Routes>
        </Grid>
      </Grid>
    </Container>
  )
}
