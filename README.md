# Task_Prediction
REST API for sales prediction

This REST API uses SARIMA model to predict sales (returns your data + next 2 predictions)

Please POST your data to /predict to use this API.
POST should contain “params” for SARIMA model, and data: “timestamp” and “value” – see below.

{
  "params":[
  
    {"name" : "p_Trend autoregression order" , "value" : 2},
    
    {"name" : "d_Trend difference order" , "value" : 1},
    
    {"name" : "q_Trend moving average order" , "value" : 2},
    
    {"name" : "P_Seasonal autoregressive order" , "value" : 1},
    
    {"name" : "D_Seasonal difference order" , "value" : 0},
    
    {"name" : "Q_Seasonal moving average order" , "value" : 1},
    
    {"name" : "s_The number of time steps for a single seasonal period" , "value" : 12}
        
    ],
    
"data":[

  {
    "timestamp": "2018-09-24T00:00:00.000Z",
    
    "value": 43
  },
  
  {
    "timestamp": "2018-10-01T00:00:00.000Z",
    
    "value": 134
  },

The example of data can be found in the folder data_example/data.txt
