import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";


export default function LoginScreen() {
  return (
    <LinearGradient
      colors={['#17192C', '#273e79ff']}
      style={{ flex: 1,}}
    >
        
        <TouchableOpacity style={styles.backButton} >
            <Text style={{fontSize: 24, color: '#ffd700', fontWeight: 'bold'}}>←</Text>
        </TouchableOpacity>


      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logoImage} 
        />
      </View>

      <Text style={styles.mainTitle}>Welcome Back</Text>
      <Text style={styles.subTitle}>Sign into your HIVE account</Text>

      {/* login form */}
        <View style={{paddingHorizontal: 20, marginBottom: 30,}}>
        <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Email</Text>
           
            <TextInput 
            style={styles.textInput} 
            placeholder="Enter your email" 
            placeholderTextColor="#b0b0b0" 
            />
        
        </View>
        <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Password</Text>

            <TextInput 
            style={styles.textInput} 
            placeholder="Enter your password" 
            placeholderTextColor="#b0b0b0" 
            secureTextEntry={true}
            />
            <TouchableOpacity style={{ alignItems: 'flex-end', marginTop: 8, }}>
                <Text style = {styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>
            {/* sign in button */}
            <TouchableOpacity style={[styles.creatButton]} >
                <Text style={{ color: '#000', fontSize: 18, fontWeight: "bold", textAlign: 'center' }}>
                    Sign In</Text>
            </TouchableOpacity>
            

        </View>
    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainTitle:{
    fontSize: 50,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: '#FFD700',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  subTitle:{
    fontSize: 22,
    color: '#f9f6deff',
    textAlign: 'center',
    marginBottom: 20,
  },
  creatButton: {
    backgroundColor: '#FFD700',
    borderRadius: 25,
    paddingVertical: 16,
    marginTop: 20,

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
    width: 180,
    height: 180,
    borderRadius: 12,
  },
    backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: '#2D3B5C',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#4A5A7A',
    fontSize: 16,
    color: '#f9f6deff',
  },
  textLabel: {  
        fontSize: 16,
        color: '#f9f6deff',
        marginBottom: 8,
        fontWeight: '500',
    },
forgotPassword: {  
    fontSize: 14,
    color: '#FFD700',
    fontWeight: '500',
    },
});
