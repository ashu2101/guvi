//Request to the country API
var request = new XMLHttpRequest();
request.open("GET", "https://restcountries.eu/rest/v2/all", true);
request.send();
request.onload=function() {
    try {
        var data = JSON.parse(this.response);

        //Filter function to get list of all the countries 
        //from Asia continent/region using Filter function
        var asianCountries = data.filter(function(element){
            return element.region === "Asia"; }).map(function(element){
                return element.name;
        });
        console.log(asianCountries);

        // Filter function to get list of all the countries with population <2Lac
        var popularionCheck = data.filter(function(element){
            return element.population < 200000; }).map(function(element){
                return element.name;
        });
        console.log(popularionCheck);

        // Print countires which uses USD as currency
        var usdCurrency= data.filter(function(element){
            if ((element.currencies.length ===1) && (element.currencies[0].code == "USD")){
                return element;
            }
            else if (element.currencies.length >1){
                for (let i=0; i<element.currencies.length;i++){
                    if (element.currencies[i].code === "USD"){
                        return element;
                    }
                }
            }
        }).map(function(element){
                return element.name;
        });
        console.log(usdCurrency);

    }
    catch(e){
        console.log("There was an error while processing data")
    }
   
};
