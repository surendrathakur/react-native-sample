
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import * as Constants from '../utils/constants';
import { useNavigation } from '@react-navigation/native';
import DeleteNotePopUp from '../pages/deleteView';

const ButtonBack = require('../../assets/img/button_back.png');
const DetailLogo = require('../../assets/img/detail_logo.png');
const DeleteIcon = require('../../assets/img/delete_icon.png');
const AddIcon = require('../../assets/img/add.png');

const StyledContainer = styled.View`
    height: 60px;
    background-color: ${props => props.theme.body};
`;

const StyledRow = styled.View`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
`
const StyledButtonImage = styled.Image`
  margin-top: 50px; /* Adjust the top margin as needed */
  margin-left: 25px;
  margin-right: 25px;
`;

interface propsInterface {
    isFrom: String;
    showRightIcon: boolean;
    onPress?: any
}

const Header = (props: propsInterface) => {
    const navigation: any = useNavigation();

    /**
      * Function used to navigate next screen
      */
    const goToNext = () => {
        console.log('goToNext-------', props.isFrom);

        if (props.isFrom === Constants.NAV_KEY_LIST) {
            navigation.navigate(Constants.NAV_KEY_EDITOR, {details: {}});
        } else if (props.isFrom === Constants.NAV_KEY_EDITOR) {
            if (props.onPress) {
                props.onPress();
            }
        }
    }

    /**
      * Handle back button click
      */
    const goBack = () => {
        navigation.goBack();
    }

    return (
        <StyledContainer>
            <StyledRow>
                <TouchableOpacity onPress={goBack} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <StyledButtonImage source={ButtonBack} />
                </TouchableOpacity>
                {props.showRightIcon && (
                    <TouchableOpacity onPress={goToNext} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <StyledButtonImage source={ props.isFrom === Constants.NAV_KEY_LIST ? AddIcon : DeleteIcon} />
                    </TouchableOpacity>
                )}

            </StyledRow>
        </StyledContainer>
    )

}

export default Header;