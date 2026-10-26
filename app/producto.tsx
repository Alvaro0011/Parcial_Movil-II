import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { getProduct, saveProduct } from '../db/repositories/products';

export default function ProductForm(){const params=useLocalSearchParams<{id?:string}>();const id=params.id?Number(params.id):undefined;const [name,setName]=useState('');const [quantity,setQuantity]=useState('');const [price,setPrice]=useState('');const [error,setError]=useState('');
  useEffect(()=>{if(id)getProduct(id).then(p=>{if(p){setName(p.name);setQuantity(String(p.quantity));setPrice(String(p.price));}});},[id]);
  async function submit(){if(!name.trim()){setError('El nombre es obligatorio.');return;}if(!/^\d+$/.test(quantity)||!Number.isSafeInteger(Number(quantity))){setError('La cantidad debe ser un entero mayor o igual a 0.');return;}if(!/^\d+$/.test(price)||!Number.isSafeInteger(Number(price))){setError('El precio debe ser un entero mayor o igual a 0.');return;}try{await saveProduct({id,name,quantity:Number(quantity),price:Number(price)});router.back();}catch(e){setError(e instanceof Error?e.message:'No se pudo guardar el producto.');}}
  return <KeyboardAvoidingView style={s.page} behavior={Platform.OS==='ios'?'padding':undefined}><View style={s.top}><Pressable onPress={()=>router.back()}><Text style={s.back}>‹ Volver</Text></Pressable><Text style={s.title}>{id?'Editar producto':'Nuevo producto'}</Text></View>
    <Text style={s.label}>Nombre del producto</Text><TextInput style={s.input} value={name} onChangeText={setName} placeholder="Ej. Arroz" autoFocus />
    <Text style={s.label}>Cantidad (unidades)</Text><TextInput style={s.input} value={quantity} onChangeText={setQuantity} placeholder="0" keyboardType="number-pad" />
    <Text style={s.label}>Precio por unidad (pesos)</Text><TextInput style={s.input} value={price} onChangeText={setPrice} placeholder="0" keyboardType="number-pad" />
    {!!error&&<Text style={s.error}>{error}</Text>}
    <Pressable style={s.button} onPress={submit}><Text style={s.buttonText}>Guardar producto</Text></Pressable>
    {id&&<Text style={s.hint}>Mantén presionado el producto en la lista para eliminarlo.</Text>}
  </KeyboardAvoidingView>;
}
const s=StyleSheet.create({page:{flex:1,backgroundColor:'#f4f7f5',padding:22,paddingTop:58},top:{marginBottom:32},back:{color:'#138a64',fontWeight:'700',fontSize:16},title:{fontSize:28,fontWeight:'800',color:'#123c30',marginTop:18},label:{fontWeight:'700',color:'#30473b',marginBottom:8,marginTop:16},input:{backgroundColor:'white',borderWidth:1,borderColor:'#dce6df',padding:15,borderRadius:12,fontSize:17},button:{backgroundColor:'#138a64',padding:16,borderRadius:13,alignItems:'center',marginTop:26},buttonText:{color:'white',fontWeight:'800',fontSize:16},error:{color:'#b42318',marginTop:12},hint:{color:'#718078',marginTop:20,textAlign:'center'}});
