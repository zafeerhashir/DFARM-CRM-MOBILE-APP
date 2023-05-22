import React from 'react'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import { currentDateTime } from '../conversions/Index'
import {
    FlatList,
    Text,
    TouchableOpacity,
    View,
    RefreshControl,
    Image
} from 'react-native';
import color from '../assets/color/Index';


function createHeader(html, keys, data) {

    html += `<tr>`

    html += `<td></td>`

    for (const k of keys) {

        html += `<td>${k.toUpperCase()}</td>`

    }
    return html += '</tr>'

}

function createRow(html, keys, data) {


    for (var i = 0; i < data.length; i++) {
        html += `<tr>`

        let index = i
        html += `<td>${index + 1}</td>`

        for (const k of keys) {
            html += `<td>${data[i][k]}</td>`
        }

        html += `/<tr>`

    }
    return html += '</table>'
}

async function createTemplate(keys, data) {


    const defaultHtml = `<style>
    table, th, td {
      border: 1px solid black;
      border-collapse: collapse;
    }
    th, td {
      padding: 5px;
      text-align: left;    
    }
    </style><table style="width:100%">`
    var html = createHeader(html = defaultHtml, keys, data)
    return createRow(html, keys, data)
}

function PDFGenerator({ keys, data, name }) {






    const createPDF = async (template) => {

        let options = {
            html: template,
            fileName: name,
            directory: 'Documents',
        };
        let file = await RNHTMLtoPDF.convert(options)
        await RNPrint.print({ filePath: file.filePath })
    }

    const onPress = async () => {
        const template = await createTemplate(keys, data)

        await createPDF(template)
    }

    return (
        <TouchableOpacity
            style={pdfStyles.container}
            onPress={() => onPress()} >
            <Image source={require('../assets/img/printer.png')} style={pdfStyles.Image} />
        </TouchableOpacity>
    )


}

export { PDFGenerator }

const pdfStyles = {
    container: {
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 60,
        right: 30,
        borderRadius: 50,
    },
    Image: {
        height: 40,
        width: 40,
    }
}