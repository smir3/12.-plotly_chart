 // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
//IS THIS FOR THE SINGLE SAMPLE?
var otu_ids = result.otu_ids;
var otu_labels = result.otu_labels;
var otu_sample = result.sample_values; 

// 7. Create the yticks for the bar chart.
// Hint: Get the the top 10 otu_ids and map them in descending order  
//  so the otu_ids with the most bacteria are last. 
//EXAMPLE FOR SORTBELOW
var sortedotu_ids = otu_ids.sort((a,b) => a.otu_ids - b.otu_ids).reverse();

var topFiveCities = sortedCities.slice(0,5);

var topFiveCityNames = topFiveCities.map(city => city.City);
var topFiveCityGrowths = topFiveCities.map(city => parseInt(city.Increase_from_2016));
//EXAMPLE FOR SORT ABOVE - CODE TO DO THIS UNDER IS BELOW
var topTen = otu_ids.slice(0,10);
    var sorted = topTen.sort((a,b) => b.topTen - a.topTen);
    var yticks = sorted.map(otuID => `OTU ${otuID}`);

// 8. Create the trace for the bar chart. 

//EXAMPLE FOR BARCHART BELOW
var trace = {
  x: topFiveCityNames,
  y: topFiveCityGrowths,
  type: "bar"
};
var data = [trace];
var layout = {
  title: "Most Rapidly Growing Cities",
  xaxis: { title: "City" },
  yaxis: { title: "Population Growth, 2016-2017"}
};
Plotly.newPlot("bar", data, layout);

//EXAMPLE FOR BARCHART ABOVE, CODE TO DO THIS BELOW
var barData = [
  
];
// 9. Create the layout for the bar chart. 
var barLayout = {
 
};
// 10. Use Plotly to plot the data with the layout. 

});
}