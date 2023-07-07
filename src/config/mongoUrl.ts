const {
  MONGO_USERNAME: user = 'root',
  MONGO_PASSWORD: pass = 'rootpass',
  MONGO_HOST: host = 'localhost',
  MONGO_PORT: port = '27017',
} = process.env;

export const mongoUrl = `mongodb://${user}:${pass}@${host}:${port}/?authMechanism=DEFAULT`;
