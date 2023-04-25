const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const printJobs = [];

app.get("/api/printJobsAfter/:lastJobId/:venueId", function (req, res) {
  const lastJobId = req.params.lastJobId === "undefined" ? -1 : req.params.lastJobId;
  var newPrintJobs = printJobs.filter((job) => job.id > lastJobId);
  res.send(newPrintJobs);
});



app.post("/api/receivePrintJob", function (req, res) {
  let price = 0;

  console.log("/api/receivePrintJob", req.body);
  console.log(req);

  const venueId = req.body.venueId;
  const tableNumber = req.body.tableNumber;
  const items = req.body.items;
  const total = items.reduce((acc, item) => acc + Number(item.price), 0);
	
  const receiptText = `
      Table: ${tableNumber}\n\n
      Items: ${items.map((item) => item.name).join("\n")}
      Total: ${total} EUR
   `;

  const newJob = {
    id: printJobs.length + 1,
    venueId: req.body.venueId,
    name: "print",
    unitPrice: total, 
    quantity: String(items.length),
    description: "print",
    items,
    // content: receiptText,
  };

  printJobs.push(newJob);
  console.log(req);
  console.log("DK Print job received", newJob);

  res.send("DK Print job received");
});

app.use(express.static("static"));

const server = app.listen(8080, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log("DK Print app listening at port", port);
});
