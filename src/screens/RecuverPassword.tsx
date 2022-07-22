import { useState } from "react"
import { Heading, Text, useTheme, Button as ButtonNativeBase } from "native-base";
import auth from "@react-native-firebase/auth"
import { Alert } from "react-native"
import { Icon, VStack } from "native-base"

import Logo from '../assets/logo_primary.svg';

import { Input } from "../components/Input"
import { Envelope } from "phosphor-react-native"
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";

export function RecuverPassword() {
    const { colors } = useTheme()
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    
    const navigation = useNavigation()

    async function handleRecuverPassword() {
        setIsLoading(true)

        try {
            await auth().sendPasswordResetEmail(email)
            Alert.alert('Atenção', 'Foi enviado um email de recuperação.')
            navigation.navigate('signin')

        }
        catch (error) {
            setIsLoading(false)
            Alert.alert('Ops!', 'Não foi recuperar a sua senha.')
        }
    }

    return (
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
            <Logo />

            <Heading 
                color="gray.100" 
                fontSize="xl" 
                mt={20} 
                mb={6}
            >Recuperação de senha</Heading>

            <Input 
                placeholder="E-mail" 
                keyboardType="email-address"
                marginBottom={4} 
                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />} 
                onChangeText={setEmail}
            />

            <Button 
                title="Recuperar"
                w="full"
                onPress={handleRecuverPassword}
                isLoading={isLoading}
                mb={4}
            />
        </VStack>
    )
}