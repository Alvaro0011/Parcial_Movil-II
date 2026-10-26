import { Link, router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

export default function Registro() {
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [confirm,setConfirm]=useState(''); const [message,setMessage]=useState(''); const [error,setError]=useState(false); const [busy,setBusy]=useState(false);
  async function submit(){setMessage('');setError(false);if(!email.trim()){setMessage('Escribe tu correo electrónico.');setError(true);return;}if(password.length<6){setMessage('La contraseña debe tener al menos 6 caracteres.');setError(true);return;}if(password!==confirm){setMessage('Las contraseñas no coinciden.');setError(true);return;}if(!isSupabaseConfigured){setMessage('Configura las credenciales de Supabase en .env');setError(true);return;}setBusy(true);const {error:e}=await supabase.auth.signUp({email:email.trim(),password});setBusy(false);if(e){setMessage(e.message);setError(true);}else{setMessage('Cuenta creada. Ya puedes ingresar.');setTimeout(()=>router.replace('/login'),900);}}
  return <View style={s.page}><View style={s.card}><Text style={s.title}>Crear cuenta</Text><Text style={s.subtitle}>Registra tu tienda</Text>
    <TextInput style={s.input} placeholder="Correo electrónico" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
    <TextInput style={s.input} placeholder="Contraseña (mínimo 6 caracteres)" value={password} onChangeText={setPassword} secureTextEntry />
    <TextInput style={s.input} placeholder="Confirmar contraseña" value={confirm} onChangeText={setConfirm} secureTextEntry />
    {!!message&&<Text style={error?s.error:s.success}>{message}</Text>}
    <Pressable style={s.button} onPress={submit} disabled={busy}>{busy?<ActivityIndicator color="white"/>:<Text style={s.buttonText}>Registrarme</Text>}</Pressable>
    <Text style={s.footer}>¿Ya tienes cuenta? <Link href="/login" style={s.link}>Volver al inicio</Link></Text>
  </View></View>;
}
const s=StyleSheet.create({page:{flex:1,justifyContent:'center',padding:24,backgroundColor:'#edf5f0'},card:{backgroundColor:'white',padding:24,borderRadius:22},title:{fontSize:28,fontWeight:'800',textAlign:'center',color:'#123c30'},subtitle:{textAlign:'center',color:'#66766e',marginBottom:24,marginTop:6},input:{borderWidth:1,borderColor:'#dce6df',padding:14,borderRadius:12,marginBottom:12,fontSize:16},button:{backgroundColor:'#138a64',padding:15,borderRadius:12,alignItems:'center'},buttonText:{color:'white',fontWeight:'700',fontSize:16},error:{color:'#b42318',marginVertical:8},success:{color:'#138a64',marginVertical:8},footer:{textAlign:'center',marginTop:20,color:'#59665e'},link:{color:'#138a64',fontWeight:'700'}});
