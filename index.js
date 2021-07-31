const express = require('express');
const app = express();

app.get("/hb/login",(req, resp) => {
    resp.json({
        "message": "Running"
    })
});


app.listen(3010, () => {
console.log('Server listening at 3010...')
});
