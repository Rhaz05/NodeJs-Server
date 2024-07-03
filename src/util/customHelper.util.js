//@use for constructing sql insert statement
export const InsertStatement = (table, prefix, columns) => {
  let column = ''

  columns.forEach((columnName) => {
    column += `${prefix}_${columnName},`
  })
  column = column.slice(0, -1)

  return `INSERT INTO ${table} (${column}) VALUES ?`
}
