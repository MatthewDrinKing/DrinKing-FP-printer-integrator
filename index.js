const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const printJobs = [];

app.get("/api/printJobsAfter/:lastJobId/:venueId", (req, res) => {
  const lastJobId = parseInt(req.params.lastJobId);
  const venueId = req.params.venueId;
  let printJobs;
  
  if (lastJobId === 0) {
    // If last job ID is 0, then return the first print job if it exists
    if (printJobs.length > 0) {
      printJobs = [printJobs[0]];
    } else {
      printJobs = [];
    }    
  } else {
    // Otherwise, return all print jobs after the given last job ID
    printJobs = printQueue.filter((job) => job.id > lastJobId && job.venueId === venueId);
  }

  res.send(printJobs);
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
