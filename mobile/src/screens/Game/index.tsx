import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';

import logoImg from '../../assets/logo-nlw-esports.png'

import {Entypo} from '@expo/vector-icons'

import {useRoute} from '@react-navigation/native'

import { useNavigation } from '@react-navigation/native'

import { styles } from './styles';
import { GameParams } from '../../@types/navigation';

import {Image, TouchableOpacity , View, FlatList, Text} from "react-native"
import { THEME } from '../../theme';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';

import {useState, useEffect} from 'react'
import { DuoMatch } from '../../components/DuoMatch';


export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const [discordDuoSelected, setDiscordDuoSelected] = useState('')

  const route = useRoute();
  const game = route.params as GameParams;
  const navigation = useNavigation()


  function handleGoBack(){
    navigation.goBack()
  }

  async function getDiscordUser(adsId: string){
    fetch(`http://192.168.15.44:3333/ads/${adsId}/discord`)
    .then(request => request.json())
    .then(response => {
      setDiscordDuoSelected(response.discord)
    })
  }

  useEffect(() => {
    fetch(`http://192.168.15.44:3333/games/${game.id}/ads`)
    .then(request => request.json())
    .then(response => {
      setDuos(response)
    })
  },[])

  if(duos)
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>

          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right}/>

        </View>

        <Image style={styles.cover} resizeMode="cover" source={{uri: game.bannerUrl}} />

        <Heading title={game.title} subtitle='Conecte-se e comece a jogar!' />

        <FlatList 
          horizontal 
          contentContainerStyle={[duos.length > 0 ?styles.contentList : {flex: 1,alignItems: 'center', justifyContent: 'center'}]} 
          style={[styles.containerList]} 
          showsVerticalScrollIndicator={false} 
          data={duos} keyExtractor={item => item.id} 
          renderItem={({item}) => ( <DuoCard data={item} onConnect={() => getDiscordUser(item.id)}/>)}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />
        
        <DuoMatch 
          visible={discordDuoSelected.length > 0} 
          onClose={() => setDiscordDuoSelected('')} 
          discord={discordDuoSelected} 
        />
      </SafeAreaView>
    </Background>
  );
}