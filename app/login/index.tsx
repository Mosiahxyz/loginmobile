import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, Pressable, TextInput, StyleSheet, Alert } from "react-native";
import axios from 'axios'

const api = axios.create({
    baseURL : "http://192.168.1.47:3000/login"
})

export default function Login(){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const router = useRouter()

    async function postLogin(email: string, senha: string)
    {
        //console.log(email, senha)

        if(email == null || email == "")
        {
            return Alert.alert(
                "Ops...",
                "O email não pode ser vazio ... :(",
                [{
                    text: 'Ok'
                }]
            )
        }
        else if( senha == null || senha == "")
        {
            return Alert.alert(
                "Ops...",
                "Senha invalida",
                [{
                    text: 'Ok'
                }]
            )
        }
        else
        {
            try{
                const response = await api.post("http://192.168.1.47:3000/login",{ email, senha })
                if(response.status == 200)
                {
                    //console.log(response.data[0].id)
                    router.push({
                        pathname : "/user/[...user]",
                        params : {
                            id: response.data[0].id,
                            nome: response.data[0].nome
                        }
                    })
                }
                else{
                    return Alert.alert(
                        "Ops...",
                        "Usuario ou senha incorretas",
                        [{
                            text: 'Ok'
                        }]
                    )
                }
            }
            catch(error)
            {
                if(axios.isAxiosError(error)){
                    console.log(error.response?.data)
                }
            }
            /*
            await fetch("http://192.168.1.47:3000/login", 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    senha: senha
                })
            }).then((response)=>{
                if(response.status == 200)
                {
                    return response.json
                }
                else{
                    return Alert.alert(
                        "Ops...",
                        "Usuario ou senha incorretas",
                        [{
                            text: 'Ok'
                        }]
                    )
                }
            }).then((result) => {
                console.log(result)
            })
            .catch(e => {
                console.error(e)
                return e;
            })
            */
        }
    }

    return(
        <View style={estilo.tela}>
            <View style={estilo.container}>
                <TextInput 
                    style={estilo.text_input} 
                    placeholder="Email..."
                    onChangeText={text => setEmail(text)}
                />
                <TextInput 
                    secureTextEntry={true} 
                    style={estilo.text_input} 
                    placeholder="Senha..."
                    onChangeText={text => setSenha(text)}
                />
                <Pressable 
                    style={estilo.botao_entrar}
                    onPress={()=> postLogin(email, senha)}
                >
                    <Text>Entrar</Text>
                </Pressable>
            </View>
        </View>
    )
}

const estilo = StyleSheet.create({
    tela: {
        flex: 1, 
        padding: 10, 
        alignItems: "center", 
        justifyContent: "center"
    },
    container: {
        gap: 15,
        borderRadius: 20,
        padding: 15,
        backgroundColor: '#DE3C4B',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.60,
        shadowRadius: 6.68,
        elevation: 11,
    },
    text_input: {
        height: 70,
        width: 280,
        backgroundColor: '#FFF',
        fontSize: 18,
        //fontWeight: 'bold',
        padding: 10,
        borderRadius: 20,
    },
    botao_entrar: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#fff'
    }

})