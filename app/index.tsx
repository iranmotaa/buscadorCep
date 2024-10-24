import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function App() {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [uf, setUf] = useState("");

  async function buscarCep() {
    if (cep == "") {
      Alert.alert("CEP INVÁLIDO!");
      setCep("");
    }
    try {
      const api = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const response = await api.json();
      setLogradouro(response.logradouro);
      setBairro(response.bairro);
      setLocalidade(response.localidade);
      setUf(response.uf);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.containerPrincipal}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Buscador de CEP</Text>
      </View>

      <View style={styles.containerCep}>
        <TextInput
          style={{
            borderColor: "#000",
            borderWidth: 2,
            width: 200,
            fontSize: 18,
            marginTop: 30,
            marginEnd: 20,
            borderRadius: 10,
            padding: 10,
          }}
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          placeholder="CEP"
        ></TextInput>
        <TouchableOpacity style={styles.botaoBuscar} onPress={buscarCep}>
          <Text style={styles.textoBotaoBuscar}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.caixaTexto}
        value={logradouro}
        onChangeText={(texto) => setLogradouro(texto)}
        placeholder="Logradouro"
      ></TextInput>

      <TextInput
        style={styles.caixaTexto}
        value={bairro}
        onChangeText={(texto) => setBairro(texto)}
        placeholder="Bairro"
      ></TextInput>

      <TextInput
        style={styles.caixaTexto}
        value={localidade}
        onChangeText={(texto) => setLocalidade(texto)}
        placeholder="Cidade"
      ></TextInput>

      <TextInput
        style={{
          borderColor: "#000",
          borderWidth: 2,
          width: 80,
          fontSize: 18,
          marginTop: 10,
          marginEnd: 20,
          borderRadius: 10,
          padding: 10,
          marginHorizontal: 20,
        }}
        value={uf}
        onChangeText={(texto) => setUf(texto)}
        placeholder="Estado"
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    flexDirection: "column",
  },
  topBar: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#018786",
  },
  title: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    margin: 20,
  },
  containerCep: {
    flexDirection: "row",
    height: 100,
    marginHorizontal: 20,
  },
  botaoBuscar: {
    backgroundColor: "#018786",
    width: 120,
    height: 70,
    marginTop: 30,
    marginEnd: 20,
    borderRadius: 10,
    padding: 20,
  },
  textoBotaoBuscar: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  caixaTexto: {
    borderColor: "#000",
    borderWidth: 2,
    padding: 15,
    fontSize: 18,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 20,
  },
});
