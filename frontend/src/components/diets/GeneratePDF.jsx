import React from "react";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


export function GeneratePdf() {

// Tworzenie stylów
const styles = StyleSheet.create({
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

// Tworzenie komponentu dokumentu
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Diet</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);


  return (
    <PDFDownloadLink document={<MyDocument />} 
    fileName="mypdf.pdf" className="bg-emerald-600 px-4 py-2 rounded text-white hover:bg-emerald-500 text-sm w-fit mt-[3vw] lg:mt-[2vw] ms-auto">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Diet')}
    </PDFDownloadLink>
  )

}