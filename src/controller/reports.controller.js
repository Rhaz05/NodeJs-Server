import asyncHandler from 'express-async-handler'
import { logger } from '../util/logger.util.js'
import {
  GeneratePDF,
  tableHeader,
  tableContent,
  Header,
  defaultStyles,
  defaultSubtitle,
} from '../util/helper.util.js'

export const salesReport = asyncHandler(async (req, res) => {
  try {
    // const { content, template, employee, date } = req.body
    const pdfHeader = Header('base64')
    const styles = defaultStyles()
    const titlePage = {
      text: 'Sales Report', //replace with your title
      style: 'header',
    }
    const subTitlePage = defaultSubtitle('employeeName', 'date')
    const columnWidth = ['*', '*'] //add your column width
    const $tableHeader = tableHeader(['name', 'age'], 'header')
    const $tableContent = tableContent([{ name: 'sampleName', age: 23 }], 'tableContent')

    const content = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [20, 110, 20, 20],
      header: pdfHeader,
      content: [
        titlePage,
        subTitlePage,
        {
          margin: [0, 15, 0, 0],
          table: { widths: columnWidth, body: [$tableHeader, ...$tableContent] },
        },
      ],
      styles: styles,
    }

    GeneratePDF(content)
      .then((pdf) => {
        // res.setHeader('Content-Type', 'application/pdf')
        // res.setHeader('Content-Disposition', `attachment; filename=${template}_${date}.pdf`)
        logger.info('PDF generated')
        res.status(200).json({ message: 'PDF generated' })
      })
      .catch((err) => {
        logger.fatal(`${err.message} in /report/sales`)
        res.status(400).json({ message: 'Error generating PDF' })
        return
      })
  } catch (err) {
    logger.fatal(`${err.message} in /report/sales`)
    res.status(400).json({ message: 'Error generating PDF' })
    return
  }
})
