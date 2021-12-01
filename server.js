const express = require('express')
const app = express()

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

const port = 3600;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.use('/', express.static('www'))

const hp = require('./service/hotspot');
app.use(hp);


