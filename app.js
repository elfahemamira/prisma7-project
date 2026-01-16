// app.js
import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

// Import des routes (attention au .js obligatoire en ESM local)
import categoriesRouter from './routes/categories.route.js';
import scategoriesRouter from './routes/scategories.route.js';
import articlesRouter from './routes/articles.route.js';

app.get('/', (req, res) => {
  res.send('bonjour');
});

app.use('/api/categories', categoriesRouter);
app.use('/api/scategories', scategoriesRouter);
app.use('/api/articles', articlesRouter);

// Pour Vercel serverless (export l'app)
export default app;

// Pour exécution locale (optionnel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}