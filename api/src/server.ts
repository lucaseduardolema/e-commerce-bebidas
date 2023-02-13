import 'dotenv/config';
import app from './App';
import sequelize from './database/models';

const PORT = process.env.API_PORT || 3001;

app.listen(PORT, () => console.log(`App running on ${PORT}`));

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
