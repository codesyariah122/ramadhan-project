server.delete('/product/delete/:id', (req, res) => {
  let id = parseInt(req.params.id)
  fs.readFile('./products.json', 'utf-8', (err, data) => {
    const databases = JSON.parse(data)
    const products = databases.products.data.map(d => d)
    const find = products.indexOf(d =>  d.id === id)
    if(err){
      console.log(`Error add data : ${err}`)
      res.json({
        message: `Error add data : ${err}`
      }).status(404)
    }else{
        const findIndex = databases.products.data.findIndex(d => d.id === id)
        databases.products.data.splice(findIndex, 1)
        console.log(databases.products.data)
        fs.writeFile('./products.json', JSON.stringify(databases, null, 4), (err) => {
          if(err){
            console.log(`Error writing data : ${err}`)
          }
        })
        res.json({
          message: `Product with ID : ${id} has been deleted to database products`
        }).status(200)
    }
  })
})