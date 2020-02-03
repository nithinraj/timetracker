const express = require('express');
const fs = require('fs');

const DATA_PATH = `${__dirname}/data`;

const PORT = 9000;


const app = express();
app.use(express.urlencoded());


let isValidDate = (date) => {
    let intDate = parseInt(date);
    return intDate > 0 && intDate < 32;
}

let isValidMonth = (month) => {
    let intMonth = parseInt(month);
    return intMonth > 0 && intMonth < 11;
}

let isValidYear = (year) => {
    return year.length == 4;
}

let checkPathExist = (path) => {
    try {
        if (fs.existsSync(path)) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}

let createDir = (path) => {
    path.split('/').reduce((acc, dirName) => {
        let curDir = `${acc}/${dirName}`;
        if (!checkPathExist(curDir)) {
            console.log(curDir);
            fs.mkdirSync(curDir);
        }
        return curDir;
    }, DATA_PATH);
}

let createFile = (filepath, data) => {
    let completePath = `${DATA_PATH}/${filepath}`;
    fs.appendFile(completePath, data, (err) => {
        if (err)
            return
        console.log('Write success -- append file');
    });
}

let writeData = (filePath, data) => {
    let completePath = `${DATA_PATH}/${filePath}`;
    fs.writeFile(completePath, data, (err) => {
        if (err)
            return
        console.log('write success -- writeFile')
    })
}

if (!checkPathExist(DATA_PATH)) {
    fs.mkdirSync(DATA_PATH);
}

app.get('/', (req, res) => {
    res.send('Hello World!!!');
})


app.get('/timerecords', (req, res) => {
    console.log('reqest recieved');
    res.send('Success')
})

app.get('/timerecords/:year/:month/:date', (req, res) => {
    let { year, month, date } = req.params;
    if (!isValidYear(year) || !isValidMonth(month) || !isValidDate(date)) {
        res.send('Failed');
        return;
    }

    let filePath = `${DATA_PATH}/${year}/${month}/${date}.json`;
    if (!checkPathExist(filePath)) {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log('Read failed');
                res.send('Read/Write Failed');
                return
            }
            let parsedData = JSON.parse(data);
            console.log(parsedData);
            res.send(parsedData);
        });
        return;
    }
    res.send('Read/Write failed --path doesnt exist');
})

app.post('/timerecords/:year/:month/:date', (req, res) => {
    let { year, month, date } = req.params;
    if (!isValidYear(year) || !isValidMonth(month) || !isValidDate(date)) {
        res.send('Failed');
        return;
    }

    let yearDir = `${DATA_PATH}/${year}`;
    let monthDir = `${year}/${month}`;
    let filePath = `${year}/${month}/${date}.json`;
    let bodyData = req.body.data;
    if (!checkPathExist(yearDir)) {
        createDir(monthDir);
        createFile(filePath, bodyData);
    } else {
        writeData(filePath, bodyData);
    }
    console.log(req.params)
    res.send(bodyData)
})

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})