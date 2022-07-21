import { VStack } from "native-base"
import { useState } from "react";
import { Alert } from "react-native";
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { Button } from "../components/Button"
import { Header } from "../components/Header"
import { Input } from "../components/Input"

export function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [patrimony, setPatrimony] = useState('');
    const [description, setDescription] = useState('');

    const navigation = useNavigation();

    function handleNewOrderRegister() {
        if (!patrimony || !description) {
            Alert.alert('Registrar', 'Preencha todos os campos.');
        }

        setIsLoading(true);

        firestore()
            .collection('orders')
            .add({
                patrimony,
                description,
                status: 'open',
                created_at: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                Alert.alert("Solicitação", "Solicitação registrada com sucesso.");
                navigation.goBack();
            })
            .catch((error) => {
                setIsLoading(false);
                return Alert.alert("Solicitação", "Não foi possível registrar o pedido.");
            });
    }

    return (
        <VStack flex={1} p={6} bg="gray.600">
            <Header title="Nova solicitação" />

            <Input 
                placeholder="Número do patrimönio"
                mt={4}
                onChangeText={setPatrimony}
            />
            <Input 
                placeholder="Descrição do problema"
                flex={1}
                mt={5}
                onChangeText={setDescription}
                multiline
                textAlignVertical="top"
            />
            <Button 
                title="Cadastrar"
                mt={5} 
                isLoading={isLoading}
                onPress={handleNewOrderRegister}
            />

        </VStack>
    )
} 