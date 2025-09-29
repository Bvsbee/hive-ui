import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function SignUpPage() {
    return (
        <LinearGradient
            colors={['#17192C', '#273e79ff']}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.logoImage}
                />
            </View>

            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                <form
                    style={{ width: '80%', alignItems: 'center' }}
                    onSubmit={(e) => {
                        e.preventDefault();
                        // Handle form submission
                    }}
                >
                    <input
                        type="text"
                        placeholder="Username"
                        style={styles.createAccText}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        style={styles.createAccText}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        style={styles.createAccText}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        style={styles.createAccText}
                        required
                    />
                </form>
            </View>

            <TouchableOpacity style={[styles.creatButton]} onPress={() => { /* go to signup page */ }}>
                <Text style={{ color: '#000', fontSize: 18, fontWeight: "bold", textAlign: 'center' }}>Create Account</Text>
            </TouchableOpacity>

        </LinearGradient>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainTitle: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#FFD700',
        textAlign: 'center',
        marginBottom: 30,
        textShadowColor: '#FFD700',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    subTitle: {
        fontSize: 22,
        color: '#f9f6deff',
        textAlign: 'center',
        marginBottom: 20,
    },
    description: {
        fontSize: 18,
        color: '#f9f6deff',
        textAlign: 'center',
        paddingHorizontal: 40,
    },
    creatButton: {
        backgroundColor: '#FFD700',
        borderRadius: 25,
        paddingVertical: 16,
        paddingHorizontal: 32,
    },
    createAccText: {
        color: '#000',
        fontSize: 20,
        marginHorizontal: 20,
        padding: 10,
        borderWidth: 2,
    },
    signinButton: {
        backgroundColor: "transparent",
        borderColor: '#FFD700',
        borderRadius: 25,
        borderWidth: 2,
        paddingVertical: 16,
        paddingHorizontal: 32,
        marginTop: 20,
        marginBottom: 40,
    },
    logoContainer: {
        flex: 0.75,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
    },
    logoImage: {
        width: 200,
        height: 200,
    },
});