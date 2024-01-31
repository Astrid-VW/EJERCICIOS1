const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config()

const { connect } = require("./src/utils/db");

//! conectamos con la base de datos
connect();