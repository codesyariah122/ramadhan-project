insert(db, 'products', addData)

  function insert(db, collection, data) {
    const tables = db.get(collection).__wrapped__.products.data
    const arrs = products.map(t => t)
    const parseData = JSON.parse(data)
    const filter = arrs.filter(d => {
      return d.name !== parseData.name
    })

    
    
    // try {
    //   fs.writeFileSync('products.json', data);
    //   console.log("JSON data is saved.");
    // } catch (error) {
    //   console.error(err);
    // }
    // arrs.push(parseData)

    // console.log(arrs)
    
    // fs.writeFile('products.json', addData, 'utf-8', function(err){
    //   if(err){
    //     console.log("An error occured while writing JSON Object to File.");
    //     return console.log(err);
    //   }
    // })
  }