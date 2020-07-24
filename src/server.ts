import app from './app';

const PORT: string | number = app.get(`PORT`);

// Start the server.
app.listen(PORT, () =>
  console.log(
    `Server listening on port ${PORT}. 
    \nYou can access it on 'http://localhost:${PORT}'`
  )
);
