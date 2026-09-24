import React from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { useDietPlan } from "../../api/hooks";


export function DietPlanPDF() {

  const { data: dietPlan = [], refetch: refetchDietPlan } = useDietPlan();

  Font.register({
      family: 'Roboto',
      fonts: [
        {
          src: '/fonts/Roboto-Regular.ttf',
          fontWeight: 400,
        },
      ]
    })

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
        marginRight: 'auto',
        flexDirection: 'row',
        paddingRight: 4,
        pageBreakInside: 'avoid'
      },
      tableCol: {
        width: '20%',
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
      dietPlanDay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom:4,
        fontSize:12,
      },
      dietDaySection: {
        breakInside: 'avoid', // ensure the category section isn't split across pages
        pageBreakInside: 'avoid', // ensure the category section isn't split across pages
      },
    });

    const DietPlanDocument = () => (
        <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text>Diet Plan</Text>
          </View>
          {dietPlan.map((dietDay, index) => (
          <View key={index} style={styles.dietDaySection} wrap={false}>
            <View style={styles.dietPlanDay}>
              <Text>{dietDay.day}</Text>
              <Text>Calories: {dietDay.total_calories}</Text>
            </View>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                {(dietDay.meals).map((meal,index)=>(
                  <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Meal {index+1}</Text>
                    <View style={styles.tableRow} key={index}>
                        <Text style={styles.tableCell}>{meal.title}</Text>
                    </View>
                  </View>
              ))}
              </View>
            </View>
          </View>
        ))}
        </Page>
      </Document>
    );

    return(<>
        <PDFDownloadLink document={<DietPlanDocument/>} fileName="diet-plan.pdf" className="bg-emerald-600 px-4 py-2 rounded text-white hover:bg-emerald-500 text-sm w-fit mt-[3vw] lg:mt-[2vw] ms-auto" onClick={() => refetchDietPlan()}>
            {({ blob, url, loading, error }) => ('Download Diet')}
        </PDFDownloadLink>  
    </>)
}