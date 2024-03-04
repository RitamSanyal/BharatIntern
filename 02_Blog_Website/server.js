const express = require('express')
const mongoose = require('mongoose')
// const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

dotenv.config();

const port = process.env.PORT || 5000;

const username = process.env.MONGODB_USERNAME
const password = process.env.MONGODB_PASSWORD
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.n00jk0m.mongodb.net/BlogDB`)

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
})
// app.listen(5000)
app.use('/articles', articleRouter)
app.listen(port, () => {
    console.log(`server is runnin on port ${port}`)
})