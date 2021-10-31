const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Server is okay!"));

app.post("/course-info", (req, res) => {
  const { course } = req.body;

  if (!course) {
    return res.status(400).send({ message: "'course' is required" });
  }

  let coursePattern =
    /^(?<department>[A-Z]+)[-|\s|:]?(?<course_number>[\d]+)\s(?<semester>Fall|F|Winter|W|Spring|S|Summer|Su)\s*(?<year>\d{2}|\d{4})$/;
  let match = course.match(coursePattern, "i");

  if (!match) {
    coursePattern =
      /^(?<department>[A-Z]+)[-|\s|:]?(?<course_number>[\d]+)\s(?<year>\d{2}|\d{4})\s*(?<semester>Fall|F|Winter|W|Spring|S|Summer|Su)$/;
    match = course.match(coursePattern, "i");

    if (!match) {
      return res.status(400).json({ message: "Course is invalid" });
    }
  }
  
  return res.json(match.groups);
});

app.listen(3000, () => console.log("Now listening on port 3000"));
