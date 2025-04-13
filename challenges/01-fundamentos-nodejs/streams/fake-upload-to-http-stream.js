import { parse } from 'csv-parse'
import fs from 'node:fs'

const csvFile = new URL('../csv/tasks.csv', import.meta.url)

const records = []
const parser = fs.createReadStream(csvFile).pipe(parse())

let titleRead = false

async function sendData() {
  for await (const record of parser) {
    if (!titleRead) {
      titleRead = true
      continue
    }

    records.push(record)

    fetch('http://localhost:3333/tasks', {
      method: 'POST',
      body: JSON.stringify({ title: record[0], description: record[1] }),
    })
      .then((res) => {
        return res.text()
      })
      .then((data) => {
        console.log(data)
      })
  }
  return records
}

sendData()
