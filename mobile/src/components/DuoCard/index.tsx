import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { DuoInfo } from '../DuoInfo';

import { GameController } from 'phosphor-react-native'

import { THEME } from '../../theme';
import { styles } from './styles';

export interface DuoCardProps{
  id: string;
  hourEnd: string;
  hoursStart: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface Props{
  data: DuoCardProps;
  onConnect: () => void;
}

export function DuoCard({data, onConnect}: Props) {
 

  return (
    <View style={styles.container}>
      <DuoInfo label='Nome' value={data.name}/>
      <DuoInfo label='Tempo de jogo' value={`${data.yearsPlaying} anos`}/>
      <DuoInfo label='Disponibilidade' value={`${data.weekDays.length} dias \u2022  ${data.hoursStart} - ${data.hourEnd}`}/>
      <DuoInfo label='Chamada de audio?' colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT} value={`${data.useVoiceChannel ? 'Sim' : 'Não'}`}/>

      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController color={THEME.COLORS.TEXT} size={20} />

        <Text style={styles.buttonTitle} >
          Conectar
        </Text>
      </TouchableOpacity>
    </View>
  );
}