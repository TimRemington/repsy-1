import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions, InputText, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Button, Left, Right, Body, Form, Icon, Picker, Item, Input } from 'native-base'

import store, { URI } from '../../store'
import { getSpecialties } from '../../utils/api'

const doctor = {
  fname: '',
  lname: '',
  specialties_id: '',
  npi_num: '',
  clinic_name: '',
  clinic_address: '',
  city: '',
  state: '',
  zip: 0,
  email: '',
  password: "",
}



export default class ConditionsPage extends Component {
  constructor(props) {
  super(props);
  this.state = {
      // local state
      // ---------------
    selected: undefined,
    specialties: [],
    errorMessage: '',
    // Field keys match db table fields
      fname: '', // holds the form value
      lname: '',
      specialties_id: '',
      npi_num: '',
      clinic_name: '',
      clinic_address: '',
      city: '',
      state: '',
      zip: 0,
      email: '',
      password: "",
      isLoggedIn: store.getState().isLoggedIn,
      user: store.getState().user,

  }
}


/************************************/
//ON CHANGE EVENT FOR SELECT SPECIALTY
/* 1. gets value (specialty.name) from the dropdown
   2. finds the individual specialty object where value and specialty.name match
   3. sets selected in state to the value (specialty name)
   4. sets specialties_id in state to specialty.id
*/
onValueChange(value: string) {
  let specialty = this.state.specialties.find(specialty => specialty.name === value)
  store.setState({
    selected: value,
    specialties_id: specialty.id,
    specialties: this.state.specialties,
  });
  console.log('selected', this.state.selected)
  console.log('specialties_id:', specialty.id)
}

/***********************************/
//LOADS SPECIALTIES FROM DATABASE
// [{id, name, create_at, updated_at},{...}...]
async componentDidMount(){
  console.log('******************component mounted')
  //get data from the API
  const response = await fetch(`${URI}/specialties`)
  const json = await getSpecialties()
  this.setState({specialties: json})
}


// /************************************/
//ADD DOCTOR FUNCTION
async asyncTryAddDoctor() {
  console.log("---------- asyncTryAddDoct(): ")

  this.setState({
    errorMessage: '',
  })

  const body = {
    fname: this.state.fname,
    lname: this.state.lname,
    specialties_id: this.state.specialties_id,
    npi_num: this.state.npi_num,
    clinic_name: this.state.clinic_name,
    clinic_address: this.state.clinic_address,
    city: this.state.city,
    state: this.state.state,
    zip: this.state.zip,
    email: this.state.email,
    password: this.state.password,
  }
  const url = `${URI}/doctors`

  try {
    // call login route
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    const responseJson = await response.json();
    // console.log(responseJson.doctor)
    //{id: 8, fname: sherman, lname: potter...}

    // if the new account fails, display error message
    if (!response.ok) {
      console.log('==== ', response.status, responseJson);
      this.setState({
        errorMessage: responseJson.error,
      })
      return
    }

    // new account succeeded!
    if(response.ok) {
      console.log('++++++++++++ new account added!', responseJson)
      //responsJson = {doctor: {doctor: { city: "city", fname: 'fname'...}}}
      store.setState({
        isLoggedIn: true,
        user: responseJson.doctor
      })
      console.log('*****store isLoggedIn', store.getState().isLoggedIn)
      console.log('******store user', store.getState().user)
      Actions.Homepage()
    }

    // console.log("('==== new acct added!: ", responseJson);
    // store.setState({
    //   user: responseJson.user,
    //   isLoggedIn: true,
    // });

  }
  catch(err) {
    console.log("ERROR asyncTryAddUser fetch failed: ", err)
  }
}
//
// /* ***Î****************************************** */
onpressSubmit = async () => {
  console.log('************onpressSubmit()')
  console.log('^^^^^^^^^^^^^^STATE', this.state)
  console.log('TRYING TO ADD DOCTOR')
  await this.asyncTryAddDoctor()
}



  render() {

    return (
        <Content>
          <Form >
            <Item>
              <Input
                autoCorrect={false}
                onChangeText={(text) => this.setState({fname: text})}
                placeholder="First Name"
                />
            </Item>
            <Item>
              <Input
                autoCorrect={false}
                onChangeText={(text) => this.setState({lname: text})}
                placeholder="Last Name" />
            </Item>
           <Picker
             mode="dropdown"
             iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
             style={{ width: undefined }}
             placeholder="Select a Specialty"
             placeholderStyle={{ color: "rgb(79, 79, 78)" }}
             note={false}
             selectedValue={this.state.selected}
             onValueChange={this.onValueChange.bind(this)}
             headerStyle={{ backgroundColor: "#2874F0" }}
             headerBackButtonTextStyle={{ color: "#fff" }}
             headerTitleStyle={{ color: "#fff" }}>
             {this.state.specialties.map((specialty, idx) => (
               <Picker.Item key={idx} label={specialty.name} value={specialty.name} id={specialty.id}/>
             ))}
           </Picker>
           <Item>
             <Input
               autoCorrect={false}
               onChangeText={(text) => this.setState({npi_num: text})}
               placeholder="NPI #" />
           </Item>
           <Item>
             <Input
               autoCorrect={false}
               onChangeText={(text) => this.setState({clinic_name: text})}
               placeholder="Clinic Name" />
           </Item>
           <Item>
             <Input
               autoCorrect={false}
               onChangeText={(text) => this.setState({clinic_address: text})}
               placeholder="Clinic Address" />
           </Item>
           <Item>
             <Input
               autoCorrect={false}
               onChangeText={(text) => this.setState({city: text})}
               placeholder="City" />
           </Item>
           <Item>
             <Input
               autoCorrect={false}
               onChangeText={(text) => this.setState({state: text})}
               placeholder="State" />
           </Item>
           <Item>
             <Input
               onChangeText={(text) => this.setState({zip: text})}
               placeholder="Zip" />
           </Item>
           <Item>
             <Input
               autoCapitalize="none"
               autoCorrect={false}
               onChangeText={(text) => this.setState({email: text})}
               placeholder="Email" />
           </Item>
           <Item>
             <Input
               autoCapitalize="none"
               autoCorrect={false}
               secureTextEntry={true}
               onChangeText={(text) => this.setState({password: text})}
               placeholder="Password" />
           </Item>
           <Button  onPress={this.onpressSubmit} type="submit" block>
             <Text>Submit</Text>
          </Button>
        </Form>
        </Content>
    ) // End of return
  } // End of render

} // End of componenet

// Variables to changes the height and width dynamically for all screens
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

// Put styles in here to format the page
const styles = StyleSheet.create({

});
