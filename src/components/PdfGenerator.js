import React from 'react'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {currentDate} from '../conversions/Index'

function createHeader(html, keys, data) {

    html += `<tr>`

    html += `<td></td>`

    for (const k of keys) {
        html += `<td>${k}</td>`
    }

    return html += '</tr>'
 
}

function createRow(html, keys, data) {

    html += `<tr>`

    for (const i = 0; i < data.length; i++) {

        html += `<td>${i++}</td>`

        for (const k of keys) {
            html += `<td>${i[data][k]}</td>`
        }
    }
    return html += '</tr>'
}

async function createTemplate(keys, response) {
   
    const html = createHeader(html = '<tb>', keys, response)
    html += `</tb>`
    return createRow(html, keys, response)
}

export function Pdfgenerator({ keys, response, name }) {

    const [state, setstate] = useState(initialState)
    


    const createFileName = () => {
        var currentdate =  new window.Date();
        var datetime = "Last Sync: " + currentdate.getDay() + "/" + currentdate.getMonth() 
        + "/" + currentdate.getFullYear() + " @ " 
        + currentdate.getHours() + ":" 
        + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        return `${fileName} ${datetime}`
    }
    

    const createPDF = async (template) => {
        let options = {
          html: template,
          fileName: createFileName(),
          directory: 'Documents',
        };
        let file = await RNHTMLtoPDF.convert(options)
      }

    const onPress = async() => {
    const template = await createTemplate(keys, response)
    await createPDF(template)
    }

    return (<></>)
    

}