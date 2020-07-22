import app from './app';

const PORT: string | number = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}. \nYou can access it on 'http://localhost:${PORT}'`)
);
