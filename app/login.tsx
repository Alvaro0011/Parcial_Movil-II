import { Link, router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  async function submit() {
    setError(''); if (!isSupabaseConfigured) { setError('Configura las credenciales de Supabase en .env'); return; }
    setBusy(true); const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password }); setBusy(false);
    if (authError) setError(authError.message); else router.replace('/');
  }
  return <View style={s.page}><View style={s.card}><Text style={s.emoji}>🛒</Text><Text style={s.title}>Mi Tienda</Text><Text style={s.subtitle}>Inicia sesión para ver tu inventario</Text>
    <TextInput style={s.input} placeholder="Correo electrónico" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
    <TextInput style={s.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
    {!!error && <Text style={s.error}>{error}</Text>}
    <Pressable style={s.button} onPress={submit} disabled={busy}>{busy ? <ActivityIndicator color="white" /> : <Text style={s.buttonText}>Ingresar</Text>}</Pressable>
    <Text style={s.footer}>¿No tienes cuenta? <Link href="/registro" style={s.link}>Regístrate</Link></Text>
  </View></View>;
}
const s = StyleSheet.create({ page:{flex:1,justifyContent:'center',padding:24,backgroundColor:'#edf5f0'},card:{backgroundColor:'white',padding:24,borderRadius:22},emoji:{fontSize:38,textAlign:'center'},title:{fontSize:30,fontWeight:'800',textAlign:'center',color:'#123c30',marginTop:8},subtitle:{textAlign:'center',color:'#66766e',marginBottom:24,marginTop:6},input:{borderWidth:1,borderColor:'#dce6df',padding:14,borderRadius:12,marginBottom:12,fontSize:16},button:{backgroundColor:'#138a64',padding:15,borderRadius:12,alignItems:'center',marginTop:4},buttonText:{color:'white',fontWeight:'700',fontSize:16},error:{color:'#b42318',marginBottom:10},footer:{textAlign:'center',marginTop:20,color:'#59665e'},link:{color:'#138a64',fontWeight:'700'} });
