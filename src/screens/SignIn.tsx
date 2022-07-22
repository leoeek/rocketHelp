import { useState } from "react";
import { VStack, Heading, Icon, useTheme, Text, Button as ButtonNativeBase, Box } from "native-base";
import { Envelope, Eye, EyeClosed, Key } from "phosphor-react-native";
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
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

    async function handleShowPassword() {
        setIsPasswordVisible(oldValue => !oldValue)
    }

    function handleRecuverPassword() {
        navigation.navigate('recuverpassword')
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
                secureTextEntry={!isPasswordVisible}
                mb={8}
                onChangeText={setPassword}
                InputRightElement={
                    <ButtonNativeBase 
                        w={10}
                        backgroundColor="transparent"
                        onPress={handleShowPassword}
                    >
                        { !isPasswordVisible 
                            ? <Icon as={<Eye color={colors.gray[300]} />} ml={4} mr={6} />
                            : <Icon as={<EyeClosed color={colors.gray[300]} />} ml={4} mr={6} />
                        }
                    </ButtonNativeBase>
                } 
            />

            <Button 
                title="Entrar" 
                w="full"
                onPress={handleSignIn}
            />

            <Text color={colors.white} mt={5} mb={4} fontWeight="bold" onPress={handleRecuverPassword}>Recuperar senha</Text>

            <Text color={colors.white} fontStyle="italic">Ou</Text>
            
            <Text alignItems="center" color={colors.white} fontWeight="500" mt={4} onPress={handleSingUp}>
                Ainda não tem conta? <Text color={colors.primary['700']}>Clique aqui para criar</Text>
            </Text>
        </VStack>
    )
}