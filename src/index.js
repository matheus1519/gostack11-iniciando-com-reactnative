import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  }, []);

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Matheus Almeida'
    });

    setProjects([...projects, response.data]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.project}>{project.title}</Text>
          )}
        />
        <TouchableOpacity
          onPress={handleAddProject}
          activeOpacity={0.6}
          style={styles.button}
        >
          <Text style={styles.buttonText}>ADICIONAR PROJETO</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  project: {
    color: '#fff',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  }
});