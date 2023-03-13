//Import Arima model
import ARIMA from 'arima';
import { getPredicateTimeStamp } from './utils.js'

//Set default values if undefined => please set all seasonal params = 0 in the POST to use ARIMA model instead of SARIMA
const predict = (rawData) => {
    const defaultParamValueList = [2, 1, 2, 1, 0, 1, 12]
    const params = rawData.params.map((parameter, index) => {
        if (parameter.value === undefined || parameter.value === null) {
            parameter.value = defaultParamValueList[index]
        }
        return parameter.value;
    });

    const rowDataValues = rawData.data.map(sale => sale.value);

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
    const firstValue = Math.round(result[0]);
    const secondValue = Math.round(result[1]);
    rowDataValues.push(firstValue, secondValue);
    //Add two subsequent timestamp points to the array
    const rowTimeStamp = rawData.data.map(time => {
        return time.timestamp;
    });

    const lastDate = rowTimeStamp[rowTimeStamp.length - 1];
    const firstDatePrediction = getPredicateTimeStamp(lastDate);
    const secondDatePrediction = getPredicateTimeStamp(firstDatePrediction);

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

export { predict }

