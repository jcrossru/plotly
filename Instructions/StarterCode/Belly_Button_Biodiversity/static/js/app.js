function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    var defaultURL = "/metadata/" + sample;
    //var defaultURL = "/metadata/945";
    metaData = d3.json(defaultURL).then(function(data) {
      var data = data;
      console.log(data);
//    });

    var panelDiv = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panelDiv.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
 //   data.forEach((metadata) => {
      var newdiv = panelDiv.append("div");
     var datavar = Object.entries(data);
     console.log(datavar);
     datavar.forEach(([key, value]) => {
      var newrow = newdiv.append("p");
      newrow.text(`${key}: ${value}`)
      });
   //});
  });
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var defaultURL = "/samples/" + sample;
  d3.json(defaultURL).then(function(data) {
    
    var data2 = [{
      values: data.sample_values.slice(1, 10),
      labels: data.otu_ids.slice(1, 10),
      type: 'pie'
    }];
        
    var layout2 = { margin: { t: 30, b: 100 } };
    //Plotly.plot("bubble", data, layout);
    Plotly.plot("pie", data2, layout2);

    const xaxis = data.otu_ids;
    const yaxis = data.sample_values;
    const size = data.sample_values;
    console.log(xaxis);
    var trace1 = {
      x: xaxis,
      y: yaxis,
      mode: 'markers',
      marker: {
        size: size,
        color:data.otu_ids,
        colorscale:'Earth'
      }

    };
    
    var data1 = [trace1];
    console.log(data1);
    
    var layout1 = {
      title: 'Marker Size',
      showlegend: false
    };
    
    Plotly.plot('bubble', data1, layout1);
    
    // @TODO: Build a Bubble Chart using the sample data
    // d3.json(defaultURL).then(function(data) {
    //   var data = [data];
    //   var layout = { margin: { t: 30, b: 100 } };
    //   Plotly.plot("pie", data, layout);
    });
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
