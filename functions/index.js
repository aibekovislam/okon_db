const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://islamxdaamduu:200x30003x@cluster0.o882hth.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const projectSchema = new mongoose.Schema({
  id: String,
  title: String,
  text: String,
  img: String,
  img1: String,
  text1: String,
  link: String
});

const newsSchema = new mongoose.Schema({
  id: String,
  title: String,
  text: String,
  img: String,
  img1: String,
  text1: String,
  link: String
});

const blogSchema = new mongoose.Schema({
  id: String,
  title: String,
  text: String,
  img: String,
  img1: String,
  text1: String,
  link: String
});

const Project = mongoose.model('Project', projectSchema);
const News = mongoose.model('News', newsSchema);
const Blog = mongoose.model('Blog', blogSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
  next();
});

app.post('/send-email', (req, res) => {
  const { fullName, subject, email } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kultaeva2021@gmail.com',
      pass: 'kargo2016'
    }
  });

  const mailOptions = {
    from: email,
    to: 'kultaeva2021@gmail.com',
    subject: subject,
    text: `Здравствуйте, ${fullName}! Ваше обращение: ${subject}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Ошибка при отправке письма');
    } else {
      console.log('Email отправлен: ' + info.response);
      res.status(200).send('Письмо успешно отправлено');
    }
  });
});

app.get('/', async (req, res) => {
  try {
    res.json({ title: "dsfsd" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/projects', async (req, res) => {
  const projectData = req.body;
  try {
    const project = new Project(projectData);
    await project.save();
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/projects/:id', async (req, res) => {
  const projectId = req.params.id;
  const projectData = req.body;
  try {
    const project = await Project.findOneAndUpdate({ id: projectId }, projectData, { new: true });
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/projects/:id', async (req, res) => {
  const projectId = req.params.id;
  try {
    await Project.findOneAndDelete({ _id: projectId });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/projects/:id', async (req, res) => {
  const projectId = req.params.id;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// CRUD Operations for News
app.get('/news', async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/news', async (req, res) => {
  const newsData = req.body;
  try {
    const news = new News(newsData);
    await news.save();
    res.json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/news/:id', async (req, res) => {
  const newsId = req.params.id;
  const newsData = req.body;
  try {
    const news = await News.findOneAndUpdate({ id: newsId }, newsData, { new: true });
    res.json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/news/:id', async (req, res) => {
  const newsId = req.params.id;
  try {
    await News.findOneAndDelete({ id: newsId });
    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/news/:id', async (req, res) => {
  const projectId = req.params.id;
  try {
    const project = await News.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// CRUD Operations for Blogs
app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/blogs', async (req, res) => {
  const blogData = req.body;
  try {
    const blog = new Blog(blogData);
    await blog.save();
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/blogs/:id', async (req, res) => {
  const blogId = req.params.id;
  const blogData = req.body;
  try {
    const blog = await Blog.findOneAndUpdate({ id: blogId }, blogData, { new: true });
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/blogs/:id', async (req, res) => {
  const projectId = req.params.id;
  try {
    const project = await Blog.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/blogs/:id', async (req, res) => {
  const blogId = req.params.id;
  try {
    await Blog.findOneAndDelete({ _id: blogId });
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});