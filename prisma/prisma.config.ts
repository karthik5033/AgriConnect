/** @type {import('@prisma/internals').PrismaConfig} */
const config = {
  datasources: {
    db: {
      url: process.env.DATABASE_URL || "file:./prisma/dev.db",
    },
  },
};

module.exports = config;

