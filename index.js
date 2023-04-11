const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");



const app = express();

app.use("/", express.static("public"));
app.use(fileUpload());

app.post("/extract-text", (req, res) => {
    if (!req.files && !req.files.pdfFile) {
        res.status(400);
        res.end();
    }

    pdfParse(req.files.pdfFile).then(result => {
        res.send(result.text);
    });
});


app.listen(3000);



// const pdfjs = require("pdfjs-dist/es5/buid/pdf")

// async function getContent(src){
//     const doc = await pdfjs.getDocument(src).promise
//     const page = await doc.getPage(1)
//     return await page.getTextComtent()
// } 

// async function getItems(src){
//     const content = await getContent(src)
//     const items = content.items.map((item) =>{
//         console.log(item.str)
//     })
//     return items
// }

// getItems("./public/data/Resume2023b.pdf")
