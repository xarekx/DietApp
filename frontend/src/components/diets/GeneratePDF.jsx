import React, { useState } from "react";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/Calendar.css';


export function GeneratePdf({getCookie}) {

  const [calendarToggle, setCalendarToggle] = useState(false);
  const [calendarRange, setCalendarRange] = useState([new Date(), new Date()]);
  // const [ dietData, setDietData] = useState([]);

  // destructure calendarRange
  const [startDate, endDate] = calendarRange;

// Creating styles of pdf document
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

// const fetchProductsInCalendarRange = () => {
//   const csrftoken = getCookie('csrftoken')
//   fetch('http://127.0.0.1:8000/api/diets/recipe-by-day/?day=2024-10-06',{
//     method:"GET",
//     headers: {
//       "Content-Type": "application/json",
//       'X-CSRFToken': csrftoken
//     },
//     credentials:'include'
//   })
//   .then(res =>res.json())
//   .then(data => setDietData(data))
//   .catch(error => console.error('Error fetching products: ', error));
// }

const validDate = (date) => {
  const realMonth = date.getMonth()+1;
  return date.getFullYear() + '-' + (realMonth < 10 ? '0' + (realMonth) : realMonth) + '-' + (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
}


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
      <View style={styles.section}>
        <Text>{validDate(startDate)} - {validDate(endDate)}</Text>
      </View>
    </Page>
  </Document>
);

  return (
    <>
    <button className="bg-emerald-600 px-4 py-2 rounded text-white hover:bg-emerald-500 text-sm w-fit mt-[3vw] lg:mt-[2vw] ms-auto" onClick={()=> setCalendarToggle(!calendarToggle)}>Get Products</button>
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
                              <Calendar selectRange={true} onChange={setCalendarRange}/>
                              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                    className="text-red-500 hover:text-red-300 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setCalendarToggle(false)}>
                                    Close
                                </button>
                                <PDFDownloadLink document={<MyDocument />} 
                                fileName="mypdf.pdf" className="bg-emerald-600 px-4 py-2 rounded text-white hover:bg-emerald-500 text-sm w-fit ms-auto">
                                  {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Diet')}
                                </PDFDownloadLink>
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