import { useState } from 'react';
import { View, Text, ColorValue, Modal, ModalProps, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons'
import { CheckCircle } from 'phosphor-react-native'

import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../Heading';

import * as Clipboard from 'expo-clipboard'


interface DuoMatchProps extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest}: DuoMatchProps) {
  const [isCopping, setIsCopping] = useState(false)

  async function handleCopyDiscordUserToClipboard(){
    setIsCopping(true)
    await Clipboard.setStringAsync(discord);

    Alert.alert('Discord Copiado!', 'Usuário copiado pra você colar no Discord.');
    setIsCopping(false)
  }

  return (
    <Modal  
      transparent
      statusBarTranslucent
      animationType='fade'
      
      {...rest}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
            <MaterialIcons
              name='close'
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <CheckCircle
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight='bold'
          />
          <Heading 
            title="Let's Play" 
            subtitle="Agora é só começar a jogar!"
            style={{alignItems: 'center', marginTop: 24}}
          />
          <Text style={styles.label}>
            Adicione seu Discord
          </Text>

          <TouchableOpacity 
            onPress={handleCopyDiscordUserToClipboard} 
            style={styles.discordButton}
            disabled={isCopping}
          >
            <Text style={styles.discord}>
              {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}