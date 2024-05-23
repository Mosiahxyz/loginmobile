import { Stack } from "expo-router";

export default function StackNavigation()
{
    return(
        <Stack initialRouteName="login/index">
            <Stack.Screen name="index" options={{headerShown: false}}/>
            <Stack.Screen name="info" options={{title: 'Informações'}}/>
            <Stack.Screen name="login/index" options={{title: 'Entrar'}}/>
            <Stack.Screen name="user/[...user]" options={{title: 'Perfil'}}/>
        </Stack>
    )
}