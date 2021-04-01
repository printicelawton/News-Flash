function getISS() {
    fetch(
      "https://api.wheretheiss.at/v1/satellites/25544" +
        categoryValue +
        "&lang=en&media=True",
      {
        method: "GET",
        headers: {
  
          //   three api keys are available incase call limit is exceeded
          // "x-rapidapi-key": "3a9751746bmsh9d6faa02ca1deccp1c1053jsnbe743b8f565e",
          // "x-rapidapi-key": "3d1d938386mshb2c35f5f3d5524ep18467ejsn3601f760f204",
          "x-rapidapi-key": "4e65fa5d1fmshf86108e25761865p159b69jsn4aa46650c5be",
          "x-rapidapi-host": "newscatcher.p.rapidapi.com",
        },
      }
    )