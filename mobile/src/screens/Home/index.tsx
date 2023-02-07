import { Image, View, FlatList, SafeAreaView } from 'react-native';

import logoImg from '../../assets/logo-nlw-esports.png'
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';

import { useNavigation } from '@react-navigation/native'

import { styles } from './styles';

import { useEffect, useState } from 'react';
import { Background } from '../../components/Background';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation()

  function handleOpenGame({id, title, bannerUrl}: GameCardProps){
    navigation.navigate('game', {id, title, bannerUrl});
  }

  useEffect(() => {
    fetch('http://192.168.15.44:3333/games')
    .then(request => request.json())
    .then(response => {
      setGames(response)
    })
  },[])

  return (
    <Background >
    <SafeAreaView style={styles.container}>
      <Image
        source={logoImg}
        style={styles.logo}
      />

      <Heading 
       title='Encontre seu duo!' 
       subtitle='Selecione o game que deseja jogar...' 
      />

      <FlatList 
        data={games}
        keyExtractor={item => item.id} 
        renderItem={({item}) => <GameCard onPress={() => handleOpenGame(item)} data={item} />} 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
      />
      
    </SafeAreaView>
    </Background>
  );
}