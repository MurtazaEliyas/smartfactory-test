/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import axios from 'axios';
import React, {useState} from 'react';
import {Pressable, Text, TextInput, View, Appearance, Dimensions, StyleSheet, ActivityIndicator} from 'react-native';
const wwidth = Dimensions.get('window').width;
const scheme = Appearance.getColorScheme();
const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    const login = (username, password) => {
        setLoading(true);
        axios
            .post('https://login.smarfac.com/connect/token', {username, password})
            .then(result => {
                console.log(error);
                setMsg('Login Successful!');
            })
            .catch(error => {
                console.log(error);
                setMsg('ERROR: ' + error.message);
            })
            .finally(f => {
                setLoading(false);
            });
    };
    const {container, loginBox, textInput, loginButton, ellipse} = styles;
    return (
        <View style={container}>
            <View style={loginBox}>
                <TextInput
                    style={textInput}
                    onChange={v => {
                        setUsername(v.value);
                    }}
                    value={username}
                />
                <TextInput
                    secureTextEntry={true}
                    style={textInput}
                    onChange={v => {
                        setPassword(v.value);
                    }}
                    value={password}
                />
                <Pressable
                    style={loginButton}
                    onPress={() => {
                        // call API here
                        login();
                    }}>
                    {loading ? <ActivityIndicator size="small" color={'white'} /> : null}
                    <Text>Login</Text>
                </Pressable>
                <Text>{msg}</Text>
            </View>
            <View style={ellipse} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginBox: {
        width: wwidth * 0.8,
    },
    textInput: {
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 3,
    },
    loginButton: {
        height: 50,
        width: 100,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        marginBottom: 15,
        flexDirection: 'row',
    },
    ellipse: {
        position: 'absolute',
        top: 20,
        left: wwidth - 20 - 50,
        width: 50,
        height: 50,
        backgroundColor: scheme == 'dark' ? 'blue' : 'red',
        borderRadius: 100,
    },
});

export default App;
