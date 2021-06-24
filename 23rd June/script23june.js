//Request to the country API
var request = new XMLHttpRequest();
request.open("GET", "https://restcountries.eu/rest/v2/all", true);
request.send();
request.onload=function() {
    try {
        var data = JSON.parse(this.response);
        console.log(Object.keys(data[0]));
        // 1. Filter function to get list of all the countries 
        // from Asia continent/region using Filter function
        /* // This function is using ES5
        var asianCountries = data.filter(function(element){
            return element.region === "Asia"; }).map(function(element){
                return element.name;
        }); */
        var asianCountries = data.filter((element)=>element.region === "Asia").map((element)=> element.name);
        console.log(asianCountries);

        // 2. Filter function to get list of all the countries with population <2Lac
        /*
        var populationCheck = data.filter(function(element){
            return element.population < 200000; }).map(function(element){
                return element.name;
        }); */
        var populationCheck = data.filter(element=>element.population < 200000).map((element) => element.name);
        console.log(populationCheck);

        // 3. Print countires which uses USD as currency
        var usdCurrency= data.filter((element)=>{
            for(var i in element.currencies){
                if (element.currencies[i].code === "USD"){
                    return true;
                }
            }
        }).map((element)=>element.name);
        console.log(usdCurrency);

        // 4. Print sum of total Popularion
        /*
        var totalPopulation = data.reduce(function(accumulator, element){
            return accumulator+parseInt(element.population);
        }, 0); */
        var totalPopulation = data.reduce((accumulator, element)=>accumulator+parseInt(element.population),0);
        console.log(totalPopulation);

        // 5. Get the country name, capital, flag  by using forEach and ES6
        var tempList = [];
        data.forEach((element) => tempList.push([element.name, element.capital, element.flag]));
        console.log(tempList);

    }
    
    catch(e){
        console.log("There was an error while processing data")
    }
   
};
