import React, { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Text, ScrollView, Platform } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import styled from 'styled-components/native';
import Header from '../../components/header';
import * as Constants from '../../utils/constants';
import DeleteNotePopUp from '../deleteView';
import { editNote, saveNote } from '../../utils/RealmController'
import HTML from 'react-native-render-html';
import { useNavigation, useRoute } from "@react-navigation/native";

const StyledContainer = styled.View`
    flex: 1;
    background-color: ${props => props.theme.body};
`;

const StyledButton = styled.TouchableOpacity`
    position: absolute;
    bottom: 25px;
    background-color: #FFE3E3;
    height: 65px;
    width: 325px;
    border-radius: 30px;
    border-width: 1px;
    border-color: #FFCACA;
    margin-left: 25px;
    margin-right: 25px;
    justify-content: center;
`;

const StyledButtonText = styled.Text`
  align-self: center;
  text-align: center;
  font-size: 16px;
  color:  #D35E5E;
  font-family: ${props => props.theme.RobotoRegularFont};
`;

const handleHead = ({ tintColor }: any) => <Text style={{ color: tintColor }}>H1</Text>

const NoteEditor = () => {
    const navigation: any = useNavigation();

    const [showDeleteView, setShowDeleteView] = useState(false);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [textValue, setTextValue] = useState('');
    const route = useRoute();
    const { details }: any = route.params;
    const richText: any = useRef();

    useEffect(() => {
        if (details && details._id) {
            setTextValue(details.noteText);
            setShowDeleteButton(true);
        } else {
            setShowDeleteButton(false);
        }
    }, [details])
    /**
       * Function used to show hide edit view
       */
    const showHideDeleteView = async () => {
        setShowDeleteView(true);
        setShowDeleteButton(false);
    }

    /**
     * Function used to save notes to realm DB
     */
    const saveNotes = async () => {
        if (details && details._id) {
            editNote(details._id, textValue);
        } else {
            saveNote("", textValue);
        }
        navigation.navigate(Constants.NAV_KEY_LIST);
    }

    return (
        <StyledContainer>
            <Header isFrom={Constants.NAV_KEY_EDITOR} onPress={showHideDeleteView} showRightIcon={showDeleteButton} />
            {!showDeleteView ?
                <ScrollView style={{ flex: 1, marginTop: 62 }}>
                    <RichToolbar
                        editor={richText}
                        style={{
                            flexDirection: 'column',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            backgroundColor: '#f1f1f1',
                            height: 50,
                        }}
                        actions={[
                            actions.fontName,
                            actions.alignLeft,
                            actions.alignRight,
                            actions.alignCenter,
                            actions.setStrikethrough,
                            actions.fontSize,
                            actions.setBold,
                            actions.setItalic,
                            actions.setUnderline,
                            actions.insertImage,
                            actions.insertLink,
                            actions.insertBulletsList,
                            actions.blockquote
                        ]}
                        iconMap={{ [actions.fontName]: handleHead }}
                    // fontSize={handleFontSize}
                    />
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, padding: 20 }}>
                        {/* <Text>Description:</Text> */}
                        <RichEditor
                            initialContentHTML={textValue}
                            ref={richText}
                            placeholder="Please Enter your text here"
                            onChange={descriptionText => {
                                console.log("descriptionText:", descriptionText);
                                setTextValue(descriptionText);
                            }}
                        />
                    </KeyboardAvoidingView>
                </ScrollView>
                :
                <DeleteNotePopUp title={Constants.TEXT_DELETE_TITLE} message={Constants.TEXT_DELETE_MSG} noteDetail={details} />
            }
            {!showDeleteView && (
                <StyledButton onPress={saveNotes}>
                    <StyledButtonText>{Constants.TEXT_SAVE}</StyledButtonText>
                </StyledButton>
            )}

        </StyledContainer>
    );

}

export default NoteEditor;