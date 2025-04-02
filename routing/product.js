const fs = require("fs");
const path = require("path");
const { STATUS_CODE } = require("../constants/statusCode");
const renderNewProductPage = require("../views/renderNewProductPage");

const express = require("express");
const router = express.Router();

router.get("/add", (req, res) => {
  fs.readFile(path.join(__dirname, "../views/add-product.html"), "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading the add-product.html file");
      return;
    }
    res.send(data);
  });
});

router.post("/add", (req, res) => {
  const body = [];
  
  req.on("data", (chunk) => {
    body.push(chunk);
  });
  
  req.on("end", () => {
    const parsedBody = Buffer.concat(body).toString();
    const formData = parsedBody.split("&").map((entry) => {
      const [key, value] = entry.split("=");
      return `${key}: ${decodeURIComponent(value)}`;
    });

    fs.appendFile(path.join(__dirname, "../product.txt"), `${formData[0]}, ${formData[1]}\n`, (err) => {
      if (err) {
        res.status(500).send("Error writing to product.txt");
        return;
      }
      // Przekierowanie na stronę z nowym produktem
      res.status(STATUS_CODE.FOUND);
      res.setHeader("Location", "/product/new");
      res.end();
    });
  });
});

router.get("/new", (req, res) => {
  fs.readFile(path.join(__dirname, "../product.txt"), "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading product.txt");
      return;
    }
    renderNewProductPage(res, data);
  });
});

module.exports = router;
