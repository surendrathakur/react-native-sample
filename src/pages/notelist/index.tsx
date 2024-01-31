import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as Constants from '../../utils/constants';
import Header from '../../components/header';
import { getNoteList } from '../../utils/RealmController';


const StyledContainer = styled.View`
    flex: 1;
    background-color: ${props => props.theme.body};
`;


const StyledContent = styled.TouchableOpacity`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   margin-top: 20px;
`

const StyledList = styled.View`
   display: flex;
   margin-top: 60px;
   margin-left: 25px;
   margin-right: 25px;
`

const StyledTextDesc = styled.Text`
  max-width: 85%;
  font-size: 20px;
  color:  ${props => props.theme.text};
  font-family: ${props => props.theme.RobotoBoldFont};
`;

const SaperatorList = styled.View`
   height: 1px;
   margin-top: 10px;
   background-color: ${props => props.theme.background};
`

const EmptyListText = styled.Text`
  margin-top: 50%;
  align-self: center;
  text-align: center;
  font-size: 20px;
  color:  ${props => props.theme.text};
  font-family: ${props => props.theme.RobotoBoldFont};
`;

// Main component for displaying a list of items
const ListView = () => {
  const [noteList, setNoteList] = useState([])
  const navigation: any = useNavigation();
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      getNotesList();
    }
  }, [isFocus])

  /**
    * Function used to get note list from realm db
    */
  const getNotesList = async () => {
    console.log('getNotesList');

    let list = await getNoteList();
    if (list.length > 0) {
      
      setNoteList(JSON.parse(list));
    }

  }
  /**
   * Function used to navigate next screen
   */
  const goToEditorView = (detail: any) => {
    navigation.navigate(Constants.NAV_KEY_EDITOR, { details: detail });
  }

  // Function to render each item in the list
  const renderItem = (rowData: any) => {
    return (
      <StyledContent onPress={() => goToEditorView(rowData.item)}>
        <StyledTextDesc numberOfLines={1} ellipsizeMode="tail">
          {`Note ${rowData.index + 1}`}
        </StyledTextDesc>
        <SaperatorList />
      </StyledContent>
    )
  }

  const emptyView = () => {
    return (
      <View>
        <EmptyListText>{Constants.TEXT_NO_NOTE}</EmptyListText>
      </View>
    )

  }

  return (
    <StyledContainer>
      <Header isFrom={Constants.NAV_KEY_LIST} showRightIcon={true} />
      <StyledList>
        <FlatList
          data={noteList}
          renderItem={renderItem}
          ListEmptyComponent={emptyView}
        />
      </StyledList>
    </StyledContainer>
  )
}


export default ListView;


