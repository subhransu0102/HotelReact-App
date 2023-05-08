import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface DataItem {
  key: string;
  value: string;
}

interface DetailScreenParams {
  fullName: string;
}

const ApiExample = () => {
  const [fullNames, setFullNames] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://hotels4.p.rapidapi.com/locations/v3/search?q=${searchQuery}&locale=en_US&langid=1033&siteid=300000001`, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'hotels4.p.rapidapi.com',
            'x-rapidapi-key': '85f161018fmshd7e425038798bcdp18f479jsn1a4ed75b73e0'
          }
        });
        const json = await response.json();
        const names = json.sr.map((item: any) => item.regionNames.fullName);
        setFullNames(names);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchQuery]);

  const data: DataItem[] = fullNames.map((name, index) => ({ key: index.toString(), value: name }));

  const renderItem = ({ item }: { item: DataItem }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Detail', { fullName: item.value } as DetailScreenParams)}>
        <View style={{ paddingVertical: 10, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
          <Text>Full Name: {item.value}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, paddingHorizontal: 10 }}
        placeholder="Search..."
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ApiExample;
