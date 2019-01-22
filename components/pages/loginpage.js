import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Left, Right, Body } from 'native-base'

import Registrationform from '../elements/RegistrationForm'

export default class Loginpage extends Component {

  render() {

    return (
      <Container>
        <Header>
          <Left>
            <Button
              onPress={() => {Actions.Homepage()}}>
              <Text>Homepage</Text>
            </Button>
          </Left>
          <Body>
            <Text>Loginpage</Text>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          <Registrationform />
        </Content>
        <Footer>
        </Footer>
      </Container>
    ) // End of return
  } // End of render

} // End of componenet

// Variables to changes the height and width dynamically for all screens
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

// Put styles in here to format the page
const styles = StyleSheet.create({

});
