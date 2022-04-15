
import express from 'express'
import jsonServer from 'json-server'
import dotenv from 'dotenv'
import db from './products.json'
import path, {dirname} from 'path'
import {fileURLToPath} from 'url'
import fs from 'fs'
import bodyParser from 'body-parser'

dotenv.config()

const server = jsonServer.create()
const router = jsonServer.router('products.json')
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 6666
const baseUrl = process.env.BASEURL
const __dirname = dirname(fileURLToPath(import.meta.url))


server.use(middlewares)
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({
  extended: true
}))

server.use('/public', express.static(path.join(__dirname, 'public')))

server.post('/product/add', (req, res)=>{
  const postData = req.body
  const addData = JSON.stringify(postData)

  fs.readFile('./products.json', 'utf-8', (err, data) => {
    const databases = JSON.parse(data)
    const products = databases.products.data.map(d => d)
    const find = products.find(d =>  d.name === postData.name)

    if(err){
      console.log(`Error add data : ${err}`)
      res.json({
        message: `Error add data : ${err}`
      }).status(404)
    }else{
      if(find){
        console.log(`${postData.name}, is already in databases`)
        res.status(401).json({
          message: `${postData.name}, is already in databases`
        })
      }else{
        console.log('Return push data')
        const newData = JSON.parse(addData)

        databases.products.data.push({
          id: parseInt(newData.id),
          name: newData.name,
          permalink: newData.permalink,
          photo: newData.photo,
          description: newData.description,
          price: parseInt(newData.price)
        })

        fs.writeFile('./products.json', JSON.stringify(databases, null, 4), (err) => {
          if(err){
            console.log(`Error writing data : ${err}`)
          }
        })
        res.json({
          message: `${postData.name} has been added to database products`,
          data: postData
        }).status(200)
      }
    }

  })

})

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

server.use(router)

server.listen(port, () => {
  console.log(`Server berjalan di port ${port}`)
})