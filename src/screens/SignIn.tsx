import { useState } from "react";
import { VStack, Heading, Icon, useTheme, Text } from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";

import Logo from '../assets/logo_primary.svg';

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Alert } from "react-native";
import Auth from "@react-native-firebase/auth";
    

export function SignIn() {
    const { colors } = useTheme()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigation = useNavigation()

    function handleSignIn() {
        if (!email || !password) {
            return Alert.alert('Atenção!', 'Inform e-mail e senha!')
        }

        setIsLoading(true)

        Auth()
            .signInWithEmailAndPassword(email, password)
            .catch((error) => {
                if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
                    return Alert.alert('Ops!', 'E-mail ou senha inválida.')
                }
                if (error.code === 'auth/user-not-found') {
                    return Alert.alert('Ops!', 'Usuário não cadastrado.')
                }

                return Alert.alert('Ops!', 'Não foi possível acessar.')
            })        
    }

    function handleSingUp() {
        navigation.navigate('signup')
    }

    return (
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
            <Logo />
            <Heading 
                color="gray.100" 
                fontSize="xl" 
                mt={20} 
                mb={6}
            >Acesse sua conta</Heading>

            <Input 
                placeholder="E-mail" 
                keyboardType="email-address"
                marginBottom={4} 
                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4}  />} 
                onChangeText={setEmail}
            />

            <Input 
                placeholder="Senha"                 
                marginBottom={4} 
                InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4}  />} 
                secureTextEntry
                mb={8}
                onChangeText={setPassword}
            />

            <Button 
                title="Entrar" 
                w="full"
                onPress={handleSignIn}
            />

            <Text alignItems="center" color={colors.white} fontWeight="500" mt={5} onPress={handleSingUp}>
                Clique aqui para criar sua conta
            </Text>
        </VStack>
    )
}