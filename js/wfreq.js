d3.json("samples.json").then((data) => {
  
    // Create a variable that holds the metadata array as a floating point number
      wfreq = data.metadata.map(person => parseFloat(person.wfreq));
      console.log(wfreq);
    });
