require('dotenv').config();
const path =  require('path')
const express = require('express');
const { render } = require('ejs');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const {checkForAuthenticationCookie} = require('./middlewares/authentication')

const Blog = require('./models/blog')

const userRotes = require('./routes/user')
const blogRotes = require('./routes/blog')

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL).then((e) => console.log('mongoDB Connected'))

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))

app.use(express.urlencoded({ extended: false}))
app.use(cookieParser())
app.use( checkForAuthenticationCookie('token'))
app.use(express.static(path.resolve('./public')))

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({})
    res.render('home', {
        user: req.user,
        blogs: allBlogs,
    })
   
})

app.use('/user', userRotes);
app.use('/blog', blogRotes);


app.listen(PORT, () => {
    console.log(`server started at PORT:${PORT}`)
})