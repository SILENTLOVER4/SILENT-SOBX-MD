const { DataTypes, Sequelize } = require("sequelize");

const DATABASE_URL = process.env.DATABASE_URL;

// Database configuration
const sequelizeOptions = {
  require: true,
  rejectUnauthorized: false
};

const sslOptions = {
  ssl: sequelizeOptions
};

const dialectOptions = {
  dialectOptions: sslOptions,
  logging: false
};

const sqliteOptions = {
  dialect: "sqlite",
  storage: "./database/id.db",
  logging: false
};

// Initialize Sequelize
const DATABASE = DATABASE_URL ? new Sequelize(DATABASE_URL, dialectOptions) : new Sequelize(sqliteOptions);

// Define check function
async function check(tableName) {
  const schema = {
    num: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      primaryKey: true
    },
    cmd: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  };

  const tableOptions = {
    timestamps: false
  };

  const table = DATABASE.define(tableName, schema, tableOptions);
  await DATABASE.sync();

  const records = await table.findAll();
  return records.length > 0;
}

// Define input_data function
async function input_data(data, num, tableName) {
  const schema = {
    num: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      primaryKey: true
    },
    cmd: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  };

  const tableOptions = {
    timestamps: false
  };

  const table = DATABASE.define(tableName, schema, tableOptions);
  await DATABASE.sync();

  const existingRecord = await table.findOne({ where: { num } });

  if (existingRecord) {
    return await existingRecord.update({ cmd: data });
  } else {
    return await table.create({ num, cmd: data });
  }
}

// Define get_data function
async function get_data(tableName, num) {
  const schema = {
    num: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      primaryKey: true
    },
    cmd: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  };

  const tableOptions = {
    timestamps: false
  };

  const table = DATABASE.define(tableName, schema, tableOptions);
  await DATABASE.sync();

  const record = await table.findOne({ where: { num } });
  return record ? record.dataValues : false;
}

// Export functions
module.exports = {
    id_db : {
  check,
  input_data,
  get_data
    }
};
