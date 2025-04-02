const fs = require("fs");
const path = require("path");

const renderNewProductPage = (response) => {
  fs.readFile(path.join(__dirname, "../product.txt"), "utf-8", (err, data) => {
    response.setHeader("Content-Type", "text/html");

    response.write("<html>");
    response.write("<head><title>Shop - Newest product</title></head>");
    response.write("<body>");
    response.write("<h1>Newest product</h1>");
    response.write(
      "<nav><a href='/'>Home</a><br /><a href='/product/add'>Add product</a><br /><a href='/logout'>Logout</a></nav>"
    );

    if (err || !data || data.trim() === "") {
      response.write("<br /><div>No new products available.</div>");
    } else {
      const splittedData = data.split("\n").join("<br />");
      response.write(`<br /><div>New product data - ${splittedData}</div>`);
    }

    response.write("</body>");
    response.write("</html>");

    return response.end();
  });
};

module.exports = renderNewProductPage;
