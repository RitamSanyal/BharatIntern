const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const articleRouter = require('./routes/articles')
const app = express()

dotenv.config();

const port = process.env.PORT || 5000;

const username = process.env.MONGODB_USERNAME
const password = process.env.MONGODB_PASSWORD
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.n00jk0m.mongodb.net/BlogDB`)

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    const articles = [{
        title: 'Test Article',
        createdAt: new Date(),
        description: 'Test description'
    },
    {
        title: 'Test Article2',
        createdAt: new Date(),
        description: 'Test description 2'
    }
]
    res.render('articles/index', { articles: articles })
})

// app.listen(5000)
app.use('/articles', articleRouter)

app.listen(port, () => {
    console.log(`server is runnin on port ${port}`)
})