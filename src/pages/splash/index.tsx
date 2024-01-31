
import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Constants from '../../utils/constants';

// Import images
const SplashLogo = require('../../../assets/img/splash_logo.png');
const ButtonNext = require('../../../assets/img/button_next.png');

const StyledContainer = styled.View`
    flex: 1;
    background-color: ${props => props.theme.body};
`;

const StyledLogoImage = styled.Image`
  margin-top: 20px; /* Adjust the top margin as needed */
  margin-left: auto;
  margin-right: auto;
`;

const StyledButtonImage = styled.Image`
  margin-top: 50px; /* Adjust the top margin as needed */
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
  color:  ${props => props.theme.ligthText};
  font-family: ${props => props.theme.RobotoRegularFont};
`;

const SplashScreen = () => {

  const navigation: any = useNavigation();

  /**
   * Function used to navigate next screen
   */
  const goTonext = () => {
    navigation.navigate(Constants.NAV_KEY_LIST);
  }

  return (
    <StyledContainer>
      <StyledLogoImage source={SplashLogo} />
      <StyledTitle>{Constants.SPLASH_TITLE} </StyledTitle>
      <StyledDescription>{Constants.SPLASH_DESC}</StyledDescription>
      <TouchableOpacity onPress={goTonext}>
        <StyledButtonImage source={ButtonNext} />
      </TouchableOpacity>
    </StyledContainer>
  )

}

export default SplashScreen;