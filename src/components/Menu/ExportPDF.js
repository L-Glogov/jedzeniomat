import React, { Component } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import Axios from 'axios';
import logo from '../../assets/logo.png';
import { render } from '@testing-library/react';

const stylesPDF = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

class MyDoc extends Component {
  
  state = {
    recipes: 'failed to laod data',
    fridge: 'failed to load data',
    menu: 'failed to load data'
  }

  componentDidMount() {
    Axios.get('http://localhost:3000/db-state')
      .then(res => {
          this.setState({
            recipes: res.data.recipes,
            fridge: res.data.fridge
          })         
      })
      .catch(error => {
        console.error(error); 
        alert("Network error: The pdf document failed to load.");
      }) 

    Axios.get('http://localhost:3000/menu')
    .then(res => {
        this.setState({
          menu: res.data.menu
        })
    })
    .catch(error => {
      console.error(error); 
      alert("Network error: The pdf document failed to load.");
    }) 
  }

  render() {

    return (
    <Document>
      <Page size="A4" style={stylesPDF.page}>
        <View style={stylesPDF.section}>
          <Text>{'test'}</Text>
        </View>
        <Image
        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Peck_Moby_Dick.jpg"
      />
        <View style={stylesPDF.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
  } 
}

export default MyDoc;