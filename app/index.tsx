import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import Icon from 'react-native-vector-icons/Feather'; 

export default function Home() {
    const [visibilidadeSenha, setvisibilidadeSenha] = useState(false);
    const [email, setEmail] = useState('');
    const [textoErro, settextoErro] = useState('');

    const verificaEmail = (text) => {
        setEmail(text);
        if (text.includes('@')) //se to texto tem @
            settextoErro('');//não retorna nada, o texto ta certo
         else 
            settextoErro('Email Inválido');
        
    };

    return (
        <View style={style.principal}>
            <View style={style.container}>
              <Image  style={style.logo} source={require('../assets/images/logo.png')} />

                <TextInput placeholder="Email" onChangeText={verificaEmail} keyboardType="email-address"
                    style={[style.inpEmail, textoErro ? style.inpErro : null]}
                    value={email}
                />

                {textoErro ? <Text style={style.errorText}>{textoErro}</Text> : null}
                
                <View>
                    <TextInput style={style.inpSenha} placeholder="Senha"  maxLength={10} secureTextEntry={!visibilidadeSenha}/>

                    <TouchableOpacity onPress={() => setvisibilidadeSenha(!visibilidadeSenha)} style={style.icone}>
                        <Icon name={visibilidadeSenha ? "eye" : "eye-off"} size={24} />
                    </TouchableOpacity>
                </View>

                <Link href={"#"} style={style.cadastro}>Cadastre-se</Link>
                <Link href={"#"} style={style.entrar}>Entrar</Link>
            </View>
        </View>
    );
}

const style = StyleSheet.create({

    principal: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#A3CEF1'
    },

    logo :{
      height: '20%',
      width: '70%',
      marginBottom: 25
    },

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        backgroundColor: '#E7ECEF',
        borderRadius: 20,
        height: '60%',
        width: '80%'
    },

    inpSenha: {
        marginBottom: 15,
        padding: 1,
        fontSize: 20,
        width: 280,
        borderBottomWidth: 1
    },

    inpErro: {
        borderBottomColor: 'red',
    },


    inpEmail: {
        marginTop: 20,
        borderBottomWidth: 1,    
        padding: 1,
        fontSize: 20,
        width: 280,
    },

    
    cadastro: {
      fontSize: 15,
      fontWeight: 'bold',
    },

    icone: {
        right: 10,
        position: 'absolute'
    },

    entrar: {
        width: '90%',
        height: '10%',
        textAlign: 'center',
        backgroundColor: '#274C77',
        borderRadius: 15,
        fontSize: 23,
        color: 'white',
    },

    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 15,
    }
});
