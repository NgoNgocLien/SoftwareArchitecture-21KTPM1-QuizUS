const express = require("express");
const app = express();
const port = 4000;


app.get("/:id", (req, res) => {
    console.log(req.params.id)
    fetch(`http://10.126.0.158:8000/campaign/api/voucher/used/${req.params.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Request successful", data);
            res.send(`<h1 style="text-align: center;">${data.message}</h1>`);
        })
        .catch((error) => {
            console.error("Error:", error);
            res.send(`<h1 style="text-align: center;">${error}</h1>`);
        });
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});