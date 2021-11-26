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

// 1. Create the buildCharts function.DATA STRUCTURE EXPLAINS IN 12.3.2
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values; 

// 7. Create the yticks for the bar chart.
    //another method: var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    
    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

// 8. Create the trace for the bar chart. 

    var trace = {
      x: sample_values,
      y: yticks,
      text: otu_labels,
      type: "bar",
      orientation: "h"
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

  });
};
  // Create the buildChart function.
function buildCharts(sample) {
    // Use d3.json to load the samples.json file 
    d3.json("samples.json").then((data) => {
  
    // Create a variable that holds the metadata array as a floating point number
 
      var metadata = data.metadata

    // Create a variable that filters the samples for the object with the desired sample number.
    
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
      var resultArray1 = metadata.filter(sampleObj => sampleObj.id == sample);
    // Create a variable that holds the first sample in the array.

    // 2. Create a variable that holds the first sample in the metadata array.
      var result1 = resultArray1[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
      var otu_ids = result1.otu_ids;
      var otu_labels = result1.otu_labels;
      var sample_values = result1.sample_values;

    // 3. Create a variable that holds the washing frequency as a floating point decimel
      wfreq = metadata.map(person => parseFloat(person.wfreq));
      console.log(wfreq)
    //4. Create the trace for the gauge chart.
    //var gaugeData = [
     
    //];
    
    // 5. Create the layout for the gauge chart.
    //var gaugeLayout = { 
     
    //};

    // 6. Use Plotly to plot the gauge data and layout.
    //Plotly.newPlot();
    //});
  });
};