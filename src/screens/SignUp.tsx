import { useState } from "react"
import { Heading, Text, useTheme, Button as ButtonNativeBase } from "native-base";
import auth from "@react-native-firebase/auth"
import { Alert } from "react-native"
import { Icon, VStack } from "native-base"

import Logo from '../assets/logo_primary.svg';

import { Input } from "../components/Input"
import { Envelope, Eye, EyeClosed, Key } from "phosphor-react-native"
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";

export function SignUp() {
    const { colors } = useTheme()
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    
    const navigation = useNavigation()

    async function handleSignUp() {
        setIsLoading(true)

        try {
            await auth().createUserWithEmailAndPassword(email, password)
        }
        catch (error) {
            setIsLoading(false)
            Alert.alert('Entrar', 'Não foi possível criar sua conta.')
        }
    }

    async function handleSignIn() {
        navigation.goBack()
    }

    async function handleShowPassword() {
        setIsPasswordVisible(oldValue => !oldValue)
    }

    return (
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
            <Logo />

            <Heading 
                color="gray.100" 
                fontSize="xl" 
                mt={20} 
                mb={6}
            >Crie sua conta</Heading>

            <Input 
                placeholder="E-mail" 
                keyboardType="email-address"
                marginBottom={4} 
                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />} 
                onChangeText={setEmail}
            />

            <Input 
                placeholder="Senha" 
                marginBottom={4} 
                InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}                 
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
                title="Criar conta"
                w="full"
                onPress={handleSignUp}
                isLoading={isLoading}
                mb={4}
            />

            <Text alignItems="center" color={colors.white} fontWeight="500" mt={5} onPress={handleSignIn}>
                Já tem conta? Clique aqui para acessar
            </Text>
        </VStack>
    )
}