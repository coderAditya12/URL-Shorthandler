const express = require("express");
const app = express();
const path = require("path");
const URL = require("./model/url");
const staticRoute = require("./routes/staticRouter");
const urlRoute = require("./routes/url");
// const { find } = require("./model/user");
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", staticRoute);

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true } // Ensures the updated document is returned
    );

    // Check if entry is null
    if (!entry) {
      return res.status(404).send("Short URL not found.");
    }

    res.redirect(entry.redirectUrl);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Internal Server Error.");
  }
});

app.listen(5555);
