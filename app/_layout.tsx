import { Stack } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useDatabaseMigrations } from '../db/migrations';

function Routes() {
  const { session, loading } = useAuth();
  const migration = useDatabaseMigrations();
  if (loading || !migration.success && !migration.error) return <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator size="large" color="#138a64" /></View>;
  if (migration.error) return <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}><Text>Error al preparar la base de datos: {migration.error.message}</Text></View>;
  return <Stack screenOptions={{ headerShown: false }}>
    <Stack.Protected guard={!session}><Stack.Screen name="login" /><Stack.Screen name="registro" /></Stack.Protected>
    <Stack.Protected guard={!!session}><Stack.Screen name="index" /><Stack.Screen name="producto" /></Stack.Protected>
  </Stack>;
}
export default function RootLayout() { return <AuthProvider><Routes /></AuthProvider>; }
