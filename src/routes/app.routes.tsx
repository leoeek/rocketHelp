import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { Details } from '../screens/Details';
import { Register } from '../screens/Register';
import { SignUp } from '../screens/SignUp';
import { SignIn } from '../screens/SignIn';
import { RecuverPassword } from '../screens/RecuverPassword';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="new" component={Register} />
      <Screen name="details" component={Details} />
    </Navigator>
  )
}

 export function AppAuth() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signin" component={SignIn} />
      <Screen name="signup" component={SignUp} />
      <Screen name="recuverpassword" component={RecuverPassword} />
    </Navigator>
  )
}