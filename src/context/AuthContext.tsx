import React, {useState, useEffect, ReactNode} from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import Context from './Context'

export default function AuthContext(props: any) {
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState<FirebaseAuthTypes.User>()

    useEffect(() => {
        setIsLoading(true)

        const subscriber = auth()
          .onAuthStateChanged(response => {
            setUser(response)            
            setIsLoading(false)
          })
    
        return subscriber
    }, [])

    return (
        <Context.Provider
            value={{
                isLoading,
                user
            }}
        >
            { props.children }
        </Context.Provider>
    )
}