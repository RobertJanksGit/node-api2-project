// implement your server here
// require your posts router and connect it here
const express = require("express");

const server = express();

const postsRoutes = require("./posts/posts-router");

server.use("/api/posts", postsRoutes);

module.exports = server;
