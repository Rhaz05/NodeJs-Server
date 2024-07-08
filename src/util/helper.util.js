import { headerImage } from './base64.util.js'
import { logger } from './logger.util.js'
import path from 'path'
import PdfMake from 'pdfmake'

//#region SQL Helper
//@use for constructing sql insert statement
export const InsertStatement = (table, prefix, columns) => {
  let column = ''

  columns.forEach((columnName) => {
    column += `${prefix}_${columnName},`
  })
  column = column.slice(0, -1)

  return `INSERT INTO ${table} (${column}) VALUES ?`
}
//#endregion

//#region PDF Helper
//@prerequisite: npm i pdfmake

//@example call: tableHeader(['name', 'age'], 'header')
export const tableHeader = (item, style) => {
  let header = []

  item.forEach((name) => {
    const column = {
      text: name,
      style: style,
    }
    header.push(column)
  })

  return header
}

//@use for objects without keys example: [{name: sampleName, age: 23}]
//@example call: tableContent([{name: 'sampleName', age: 23}], 'content')
export const tableContent = (data, style, border = [false, false, false, false]) => {
  let content = []

  data.forEach((rows) => {
    const item = []

    Object.keys(rows).forEach((key) => {
      item.push({
        text: rows[key],
        style: style,
        border: border,
      })
    })
    content.push(item)
  })

  return content
}

//@use for image type pdf header
export const Header = (
  image,
  width = 800,
  height = 110,
  alignment = 'center',
  margin = [0, 0, 0, 0]
) => {
  const Header = {
    image: image ? image : headerImage,
    width: width,
    height: height,
    alignment: alignment,
    margin: margin,
  }

  return Header
}

//@use for default pdf styles
export const defaultStyles = () => {
  const styles = {
    header: { fontSize: 16, bold: true, alignment: 'center', margin: [0, 0, 0, 0] },
    subheader: { fontSize: 11, alignment: 'center' },
    tableheader: { fontSize: 10, bold: true, alignment: 'center', margin: [0, 5, 0, 5] },
    tablecontent: { fontSize: 9, alignment: 'center', margin: [0, 5, 0, 5] },
    tableContentLeft: { fontSize: 9, alignment: 'left', margin: [0, 5, 0, 5] },
  }

  return styles
}

export const defaultSubtitle = (employeeName, date) => {
  try {
    const subTitle = {
      layout: 'noBorders',
      alignment: 'left',
      table: {
        body: [
          [
            {
              text: 'Employee: ' + employeeName, //add your employee name
              margin: [0, 20, 0, 0],
            },
          ],
          [
            {
              text: 'Date: ' + date, //add your date
              margin: [0, 0, 0, 0],
            },
          ],
        ],
      },
    }
    return subTitle
  } catch (err) {
    logger.warn(`${err.message} in helpet.util.js/defaultSubtitle`)
    return
  }
}

//@use for generating pdf file
export const GeneratePDF = (data) => {
  const regularfont = path.join(process.cwd(), 'public', 'fonts', 'roboto-regular-webfont.ttf')
  const boldfont = path.join(process.cwd(), 'public', 'fonts', 'roboto-bold-webfont.ttf')

  return new Promise((resolve, reject) => {
    const fonts = {
      Roboto: {
        normal: regularfont,
        bold: boldfont,
        italics: regularfont,
        bolditalics: regularfont,
      },
    }

    const print = new PdfMake(fonts)
    const pdfDoc = print.createPdfKitDocument(data)
    // pdfDoc.pipe(fs.createWriteStream(pdfPath));

    const chunks = []
    pdfDoc.on('data', (chunk) => chunks.push(chunk))
    pdfDoc.on('end', () => resolve(Buffer.concat(chunks)))
    pdfDoc.on('error', (error) => reject(error))
    pdfDoc.end()
  })
}
//#endregion
