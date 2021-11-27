function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {

    // Create a variable that holds the samples array. 
    var samples = data.samples
    // Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata
    var resultArray1 = metadata.filter(sampleObj => sampleObj.id == sample);
    // Create a variable that holds the first sample in the array.
    var result = resultArray[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    var result1 = resultArray1[0];
    console.log(resultArray);

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    // 3. Create a variable that holds the washing frequency.
    var wfreq = result1.wfreq;

    //var wfreq = result1.
    //wfreq = result1.wfreq.map(person => parseFloat(person.wfreq));
    //console.log(wreq);

    // Create the yticks for the bar chart.
    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`);

    // 8. Create the trace for the bar chart. 

    var trace = {
      x: sample_values,
      y: yticks,
      text: otu_labels,
      type: "bar",
      orientation: "h",
      marker: {
        color: 'rgb(250,128,114)'
      }  
    };

    var barData = [trace];

    // 9. Create the layout for the barchart
    var layout = {
      title: "Top 10 Bacteria Cultures Found"
    };

    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, layout);

    // Deliverable 2 

    // 1. Create the trace for the bubble chart.

    var trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values
      }
    };

    var bubbleData = [trace1];

    // 2. Create the layout for the bubble chart.
    
    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: { title: "OTU ID" },
      hovermode:'closest',
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      } 
    };

// 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout); 
  
// Deliverable 3

    // 4. Create the trace for the gauge chart.
    var trace2 = {
      value: wfreq,
      type: "indicator",
      mode: "gauge+number",
      title: { text: "Belly Button Washing Frequency:<br>Scrubs per Week" },
      gauge: {
        axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
        bar: {color: "Salmon" },
        bgcolor: "white",
        borderwidth: 1,
        bordercolor: "gray",
        steps: [
          { range: [0, 2], color: "lightgray" },
          { range: [2, 4], color: "silver" },
          { range: [4, 6], color: "darkgrey" },
          { range: [6, 8], color: "darkgray" },
          { range: [8, 10], color: "grey" }
        ],
      }
    };

    var gaugeData = [trace2];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 350, 
      height: 450, 
      margin: { t: 0, b: 0 }     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}




