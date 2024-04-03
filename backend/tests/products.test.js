const request = require("supertest");
const app = require("../index");
const BASE = "/api/v1/products/";
const db = require("../config/dbConfig");