
import express from 'express'
import jsonServer from 'json-server'
import dotenv from 'dotenv'
import db from './products.json'
import path, {dirname} from 'path'
import {fileURLToPath} from 'url'
import bodyParser from 'body-parser'
import fs from 'fs'

dotenv.config()


const server = jsonServer.create()
const router = jsonServer.router('products.json')
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 6666
const baseUrl = process.env.BASEURL
const __dirname = dirname(fileURLToPath(import.meta.url))
let productToWrite = fs.readFileSync('./products.json')


server.use(middlewares)
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({
  extended: true
}))

server.use('/public', express.static(path.join(__dirname, 'public')))

server.get('/', (req, res) => {
  res.json({
    message: 'Welcome To JSON SERVER',
    api: {
      allProducts: `${baseUrl}:${port}/products`,
      productPermalink: `${baseUrl}:${port}/products/:permalink`
    }
  })
})

server.get('/products/:permalink', (req, res) => {
  let permalink = req.params.permalink

  let product = db.products.data.map(d => d)

  res.json({
    message: 'Detail Product Page',
    data: product.find(d => d.permalink == permalink)
  })
})

server.post('/products/add', (req, res) => {
  const db = router.db
  const postData = req.body
  const addData = JSON.stringify(postData)
  const products = JSON.parse(productToWrite).products.data

  fs.readFile('./products.json', 'utf-8', (err, data) => {
    const databases = JSON.parse(data)
    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {
      
      const newData = JSON.parse(addData)

      // console.log(newData)

      databases.products.data.push({
        id: parseInt(newData.id),
        name: newData.name,
        permalink: newData.permalink,
        photo: newData.photo,
        description: newData.description,
        price: parseInt(newData.price)
      })
      
      console.log(databases.products.data)      

      fs.writeFile('./products.json', JSON.stringify(databases, null, 4), (err) => {
        if (err) {
          console.log(`Error writing file: ${err}`);
        }
      })
    }
  })

  res.json({
    message: 'Adding New Data',
    data: postData
  })
})

server.use(router)

server.listen(port, () => {
  console.log(`Server berjalan di port ${port}`)
})