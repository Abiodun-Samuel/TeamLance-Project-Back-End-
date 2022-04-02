// import app from "../server.js";
import express from "express";
const app = express();
import request from "supertest";
// const request = require("supertest");
// const express = require("express");
// const app = express();

describe("Product API", () => {
  it("GET /api/product ---> array products", () => {
    return request(app)
      .get(`${process.env.API_URL}/api/product`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        response.body.toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              price: expect.any(Number),
            }),
          ])
        );
      });
  });
  //   it("GET /api/product/:slug --->specfic product by slug", () => {});
  //   it("POST /api/product/create ", () => {});
  //   it("POST /api/product/create ", () => {});
});
