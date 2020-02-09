const express = require('express');
const fs = require('fs');

const DATA_PATH = `${__dirname}/data`;
const FILE_NAME = `${DATA_PATH}/username.json`;
const DATE_SPLITTER = '/';

const PORT = 9000;

let timeRecords = {};

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

if (!checkPathExist(FILE_NAME)) {
    fs.writeFileSync(FILE_NAME, JSON.stringify({}));
}

let fileStreamData = fs.readFileSync(FILE_NAME);
timeRecords = JSON.parse(fileStreamData);


let createTimeRecordStructure = (key, data) => {
    let [date, month, year] = key;
    if (timeRecords[year]) {
        if (timeRecords[year][month]) {
            let monthData = timeRecords[year][month];
            if (timeRecords[year][month][date]) {
                timeRecords[year][month] = { ...monthData, ...{ [date]: data } }
            } else {
                timeRecords[year][month][date] = data;
            }
        } else {
            timeRecords[year][month] = {
                [date]: data
            }
        }
    } else {
        timeRecords[year] = {
            [month]: {
                [date]: data
            }
        }
    }
}

let getTimeRecord = ({ year, month, date }) => {
    let yearData = timeRecords[year];
    if (month) {
        if (date) {
            return yearData[month] ? yearData[month][date] ? yearData[month][date] : {} : {};
        }
        return timeRecords[year][month] || {};
    }
    return timeRecords[year];
}

app.get('/', (req, res) => {
    res.send('Hello World!!!');
})


app.get('/timerecords', (req, res) => {
    console.log('reqest recieved');
    res.send('Success')
})

app.get('/timerecords/:year/:month?/:date?', (req, res) => {
    let timerecord = getTimeRecord(req.params)
    res.send(timerecord);
})

app.post('/timerecords', (req, res) => {
    console.log(req.body);
    let bodyData = JSON.parse(req.body.data);
    for (let key in bodyData) {
        let normalisedDate = key.split(DATE_SPLITTER);
        createTimeRecordStructure(normalisedDate, bodyData[key]);
        fs.writeFile(FILE_NAME, JSON.stringify(timeRecords), (err) => {
            res.send("Write Sucess")
        })
    }
    console.log(req.params)
})

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})