//Import Arima model
const ARIMA = require('arima');

//Set default values if undefined => please set all seasonal params = 0 in the POST to use ARIMA model instead of SARIMA
predict = (rawData) => {
    const params = rawData.params.map((parameter, index) => {
        if (parameter.value === undefined || parameter.value === null) {
            if (index === 0) {
                parameter.value = 2;
            };
            if (index === 1) {
                parameter.value = 1;
            };
            if (index === 2) {
                parameter.value = 2;
            };
            if (index === 3) {
                parameter.value = 1;
            };
            if (index === 4) {
                parameter.value = 0;
            };
            if (index === 5) {
                parameter.value = 1;
            };
            if (index === 6) {
                parameter.value = 12;
            }
        } return parameter.value;
    });

    const rowDataValues = rawData.data.map(sale => {
        return sale.value;
    });

    //Sarima model
    const sarima = new ARIMA({
        p: params[0],
        d: params[1],
        q: params[2],
        P: params[3],
        D: params[4],
        Q: params[5],
        s: params[6],
        verbose: false
    }).train(rowDataValues);
    const NumberOfValues = 2;

    //Add results of prediction to the array
    const [result] = sarima.predict(NumberOfValues);
    const firstN = Math.round(result[0]);
    const secondN = Math.round(result[1]);
    rowDataValues.push(firstN, secondN);

    //Add two subsequent timestamp points to the array
    const rowTimeStamp = rawData.data.map(time => {
        return time.timestamp;
    });

    const lastDate = rowTimeStamp[rowTimeStamp.length - 1];
    const firstDatePrediction = new Date((Date.parse(lastDate) + 7 * 24 * 60 * 60 * 1000)).toISOString();
    const secondDatePrediction = new Date((Date.parse(lastDate) + 14 * 24 * 60 * 60 * 1000)).toISOString();

    rowTimeStamp.push(firstDatePrediction, secondDatePrediction);

    //Construct the data object
    const data = [];

    for (let i = 0; i < rowTimeStamp.length; i++) {
        data.push({ "timestamp": rowTimeStamp[i], "value": rowDataValues[i] });
    }

    return { data };

}


/*
//Another model could be used -> Exponential smoothing - Holt-Winters model

const holtWinters = require('holtwinters-md')
predict = (rawData) => {
    const data = rawData.map(sale => {
        return sale.value;
    });
    const predictionLength = 2;
    const result = holtWinters(data, predictionLength)
    return result;
}
*/

module.exports = predict;

