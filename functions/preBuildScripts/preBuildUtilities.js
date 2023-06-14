

    const fs = require('fs');
    const axios = require('axios').default;

module.exports.preBuildDevelopment = async() => {
    console.log("Loading the development content!")
    const API = `https://apiblog.softestingca.com/api/portfolio`;

    const response = await axios.get(API);
    console.log('response',response.data.data);
    const data = response.data.data.attributes;

    fs.writeFileSync("functions/preBuild/protfolio.json", JSON.stringify(data))

    console.log("Done.")
}


module.exports.preBuildProduction = async() => {
    console.log("Loading the production content!")
}