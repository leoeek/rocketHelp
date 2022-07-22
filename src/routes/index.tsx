import { NavigationContainer } from '@react-navigation/native';

import { AppAuth, AppRoutes } from './app.routes';
import { useContext } from 'react';
import { Loading } from '../components/Loading';
import GlobalContext from '../context/Context';

export function Routes() {
  const { user, isLoading } = useContext(GlobalContext)

  if (isLoading) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      { user ? <AppRoutes /> : <AppAuth /> }
    </NavigationContainer>
  )
}