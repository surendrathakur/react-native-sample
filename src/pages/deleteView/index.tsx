
import React from 'react';
import styled from 'styled-components/native';
import Header from '../../components/header';
import * as Constants from '../../utils/constants';
import { Alert, ScrollView, Text, TouchableOpacity } from 'react-native';
import { deleteNote, saveTrashNote } from '../../utils/RealmController';
import { useNavigation } from '@react-navigation/native';

const DetailLogo = require('../../../assets/img/detail_logo.png');

const StyledContainer = styled.View`
    flex: 1;
    margin-top: 65px;
    background-color: ${props => props.theme.body};
`;

const StyledButton = styled.TouchableOpacity`
    background-color: #FFE3E3;
    height: 62px;
    border-radius: 30px;
    border-width: 1px;
    border-color: #FFCACA;
    margin-left: 25px;
    margin-right: 25px;
    margin-top: 50px;
    justify-content: center;
`;

const StyledLogoImage = styled.Image`
  margin-top: 0px; /* Adjust the top margin as needed */
  margin-left: auto;
  margin-right: auto;
`;

const StyledTitle = styled.Text`
  align-self: center;
  text-align: center;
  margin: 20px;
  margin-top: 50px;
  font-size: 48px;
  color:  ${props => props.theme.text};
  font-family: ${props => props.theme.OtamaFont};
`;

const StyledDescription = styled.Text`
  align-self: center;
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  margin-left: 25px;
  margin-right: 25px;
  color:  ${props => props.theme.ligthText};
  font-family: ${props => props.theme.RobotoRegularFont};
`;

const StyledButtonText = styled.Text`
  align-self: center;
  text-align: center;
  font-size: 16px;
  color:  #D35E5E;
  font-family: ${props => props.theme.RobotoRegularFont};
`;

interface propsInterface {
  title: String;
  message: String;
  noteDetail: any;
}



const DeleteNotePopUp = (props: propsInterface) => {
  const navigation: any = useNavigation();

  /**
 * Delete note from realm db
 * @param id id of note to be delete
 */
  const deleteNoteFromDb = (noteDetail: any) => {
    Alert.alert(Constants.ALERT, "Are you sure you want to delete?", [
      {
        text: "Cancel",
        onPress: () => { },
        style: 'cancel',
      },
      {
        text: "OK",
        onPress: async () => {
          deleteNote(noteDetail._id).then(() => {
            saveTrashNote(noteDetail.title, noteDetail.noteText);
            navigation.navigate(Constants.NAV_KEY_LIST);
          })
            .catch((error: any) => {
              console.error('Error deleting note:', error);
            });

        },
      },
    ])

  }
  return (
    <StyledContainer>
      <ScrollView>
        <StyledLogoImage source={DetailLogo} />
        <StyledTitle>{props.title}</StyledTitle>
        <StyledDescription>{props.message}</StyledDescription>
        <StyledButton onPress={() => deleteNoteFromDb(props.noteDetail)}>
          <StyledButtonText>{Constants.TEXT_DELETE_NOTE}</StyledButtonText>
        </StyledButton>
      </ScrollView>
    </StyledContainer>
  )

}

export default DeleteNotePopUp;