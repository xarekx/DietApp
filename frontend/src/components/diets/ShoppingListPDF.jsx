import React, { useState } from "react";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { Calendar } from 'react-calendar'
import { useFetch } from "../../hooks/useFetch";

import 'react-calendar/dist/Calendar.css';

export function ShoppingListPDF() {

  const [calendarToggle, setCalendarToggle] = useState(false);
  const [calendarRange, setCalendarRange] = useState([new Date(), new Date()]);
  const [ingredientsData, setIngredientsData] = useState([]);

  // destructure calendarRange
  const [startDate, endDate] = calendarRange;

  Font.register({
    family: 'Roboto',
    fonts: [
      {
        src: '/fonts/Roboto-Regular.ttf',
        fontWeight: 400,
      },
    ]
  })

// Creating styles of pdf document
const styles = StyleSheet.create({
  page:{
      padding: 30,
      fontFamily: 'Roboto',
      color:'black'
  },
  table: {
    flexDirection:'col',
    display: 'table',
    width: 'auto',
    borderRightWidth: 0,
    borderBottomWidth: 0,
    pageBreakInside: 'avoid'
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
    pageBreakInside: 'avoid'
  },
  tableCol: {
    width: '50%',
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    marginRight: 'auto',
    marginTop: 5,
    fontSize: 8,
  },
  tableHeader: {
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  categoryProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    fontSize:12,
  },
  categorySection: {
    breakInside: 'avoid', // ensure the category section isn't split across pages
    pageBreakInside: 'avoid', // ensure the category section isn't split across pages
  },
});


const validDate = (date) => {
  const realMonth = date.getMonth()+1;
  return date.getFullYear() + '-' + (realMonth < 10 ? '0' + (realMonth) : realMonth) + '-' + (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
}

const fetchProductsInCalendarRange = useFetch(`http://127.0.0.1:8000/api/diets/products-by-day/?start_date=${validDate(startDate)}&end_date=${validDate(endDate)}`,'GET');

const handleFetchProducts = () => {
  fetchProductsInCalendarRange()
    .then(res =>res.json())
    .then(data => setIngredientsData(data))
    .catch(error => console.error('Error fetching ingredients: ', error));

}

// Creating pdf Document
const MyDocument = () => (
  <Document>
  <Page size="A4" style={styles.page}>
    <View style={styles.header}>
      <Text>Shopping List</Text>
      <Text>{validDate(startDate)} - {validDate(endDate)}</Text>
    </View>
    {ingredientsData.map((ingredient, index) => (
      <View key={index} style={styles.categorySection} wrap={false}>
        <View style={styles.categoryProduct}>
          <Text>{ingredient.category}</Text>
        </View>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Product</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Quantity (g)</Text>
            </View>
          </View>
          {ingredient.products.map((product, prodIndex) => (
            <View style={styles.tableRow} key={prodIndex}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{product.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{product.total_quantity}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    ))}
  </Page>
</Document>
);

  return (
    <>
    <button className="bg-emerald-600 px-4 py-2 rounded text-white hover:bg-emerald-500 text-sm w-fit mt-[3vw] lg:mt-[2vw] ms-auto" onClick={()=> setCalendarToggle(!calendarToggle)}>Shopping List</button>
    {calendarToggle ? 
      ( 
        <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-sm">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex p-5 border-b border-solid border-blueGray-200 rounded-t w-full justify-center">
                                <h3 className="text-3xl font-semibold">
                                  Which days
                                </h3>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                              <Calendar selectRange={true} onChange={(value)=>{setCalendarRange(value)}}/>
                              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                              <button
                                className="text-red-500 hover:text-red-300 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setCalendarToggle(false)}>
                                Close
                              </button>
                              { ingredientsData.length > 0 ? (
                                <PDFDownloadLink document={<MyDocument/>} fileName="mypdf.pdf" className="bg-emerald-600 px-4 py-2 rounded text-white hover:bg-emerald-500 text-sm w-fit ms-auto">
                                  {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Diet')}
                                </PDFDownloadLink>  
                                ) :(<button className="bg-emerald-600 px-4 py-2 rounded text-white hover:bg-emerald-500 text-sm w-fit ms-auto" onClick={()=>handleFetchProducts()}>fetch data</button>) } 
                                </div>
                            </div>
                            {/*footer*/}
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
      ):null
    }
    
    
    </>
  )

}