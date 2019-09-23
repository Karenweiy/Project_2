/* data route */

var calldataroute = "/calls";
var putdataroute = "/puts";

/*
  4 Plots

  - All Calls
  - All Puts
  - Single-ticker calls
  - Single-ticker puts
*/

// FUNCTION FOR ALL CALLS PLOT
function buildAllCallPlot() {
  var calldataroute = "/calls";

  d3.json(calldataroute).then(function(response) {
    // Create empty arrays to extract relevant data from reponse
    var strike = []
    var volatility = [];
    var ticker = [];
    var size = [];

    console.log(response);

    // Convert numerical data points (from string to integer/float)
    response.forEach(function(record, key){
      // console.log('key:', key);
      // console.log('record:', record);

      strike.push(+record['Strike']);
      volatility.push(+record['Implied_Volatility']);
      ticker.push(record['Ticker']);
      size.push(+record['Implied_Volatility'] * 10);
    })

    console.log('volatility:', volatility);

    var trace = {
      x: strike,
      y: volatility,
      // type: "scatter",
      mode: "markers",
      hovertext:ticker,
      marker:{
        size:size,
        color:strike
      }
    };

    var callbubble = [trace];

    var layout = {
      title: "Strike Price vs. Implied Volatility",
      showlegend:false
    }

    Plotly.newPlot("callbubble", callbubble, layout);
    });

  };

  function buildAllPutPlot() {
    var putdataroute = "/puts";
  
    d3.json(putdataroute).then(function(response) {
      // Create empty arrays to extract relevant data from reponse
      var strike = []
      var volatility = [];
      var ticker = [];
      var size = [];
  
      console.log(response);
  
      // Convert numerical data points (from string to integer/float)
      response.forEach(function(record, key){
        // console.log('key:', key);
        // console.log('record:', record);
  
        strike.push(+record['Strike']);
        volatility.push(+record['Implied_Volatility']);
        ticker.push(record['Ticker']);
        size.push(+record['Implied_Volatility'] * 10);
      })
  
      console.log('volatility:', volatility);
  
      var trace = {
        x: strike,
        y: volatility,
        // type: "scatter",
        mode: "markers",
        hovertext:ticker,
        marker:{
          size:size,
          color:strike
        }
      };
  
      var putbubble = [trace];
  
      var layout = {
        title: "Strike Price vs. Implied Volatility",
        showlegend:false
      }
  
      Plotly.newPlot("putbubble", putbubble, layout);
      });
  
    };
  

function init() {
  console.log('init() called!');

  // Grab a reference to the dropdown select element
  var selector = d3.select("#selTicker");

  // Use the list of ticker names to populate the select options
  d3.json("/tickers").then((tickerNames) => {
    tickerNames.forEach((ticker) => {
      selector
        .append("option")
        .text(ticker)
        .property("value", ticker);
    });

    // Use the first ticker from the list to build the initial plots
    // const firstticker = tickers[0];
    // buildCharts(firstticker);
    // buildMetadata(firstticker);
  });
}


function optionChanged(newticker) {
  // Fetch new data each time a new ticker is selected
  buildSingleCallPlot(newticker); // single-ticker plot function
  buildSinglePutPlot(newticker); // single-ticker plot function
}

// Execute Init()!
init()
buildAllCallPlot();
buildAllPutPlot();