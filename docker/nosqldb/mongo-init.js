db = db.getSiblingDB(process.env.MONGO_DATABASE);
db.createCollection('user')
