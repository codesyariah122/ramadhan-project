
import express from 'express'
import jsonServer from 'json-server'
import dotenv from 'dotenv'
import db from './products.json'
import path, {dirname} from 'path'
import {fileURLToPath} from 'url'

dotenv.config()

const server = jsonServer.create()
const router = jsonServer.router('products.json')
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 6666
const baseUrl = process.env.BASEURL
const __dirname = dirname(fileURLToPath(import.meta.url))


server.use(middlewares)


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

server.use(router)

server.listen(port, () => {
  console.log(`Server berjalan di port ${port}`)
})