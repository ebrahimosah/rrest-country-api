
const input = document.getElementById('text');
// const regions = document.getElementById('region');
const filterOptions = document.querySelector('.filter-options')
const parentNode = document.querySelector('.countries');

//create a country div with the country's info
function createCountry(image,name, population,region,capital){
    const newCountry = document.createElement('div');
    const newImg = document.createElement('img');
    const h3 = document.createElement('h3');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    newImg.src = `${image}`;
    newImg.alt = `country-logo`;
    h3.textContent = name;
    p1.textContent = `Population: ${population}`
    p2.textContent = `Region: ${region}`
    p3.textContent = `Capital: ${capital}`;
    newCountry.appendChild(newImg);
    newCountry.appendChild(h3);
    newCountry.appendChild(p1);
    newCountry.appendChild(p2);
    newCountry.appendChild(p3); 
    newCountry.classList.add('flow');
    parentNode.appendChild(newCountry);
}
function createRegion(name){
    const region = document.createElement('li');
    region.textContent = name;
    filterOptions.appendChild(region);
}

document.addEventListener('DOMContentLoaded',async () => {
    let countriesData = [];
    let filteredCountries;
    let regions = [];
    const limit = 12;
    let postLimit = limit;
 
    //load countries data
    function loadCountries(){
        filteredCountries.slice(0,postLimit).forEach(country=>{
            createCountry(country.flags.png,country.name,country.population,country.region,country.capital);
        })
        console.log('load query:'+filteredCountries);
    }
    
  
    try{
        const res = await fetch('http://localhost:4000/countries');
        if(!res.ok){
            res.error = "server error";
        }
        const resData = await res.json();
       
        countriesData = resData;
        filteredCountries = await countriesData;
        loadCountries();
        regions = [...new Set(countriesData.map((item) => item.region))];
        regions.forEach(region=>createRegion(region));
        
        // console.log(countriesData);
        // console.log(regions);
        
    }catch(err){
        console.error("Error occured:",err);
    }

        //filter by region
        function regionFilter(query){
           filteredCountries = countriesData.filter(country =>{
             return country.region.toLowerCase() === query;
           })
           parentNode.innerHTML = '';
           loadCountries();
        }

    const allregions = document.querySelectorAll('.filter-options li');

    console.log(allregions);
    allregions.forEach(region=>{
        region.addEventListener('click',(e)=>{
            regionFilter(region.innerText.toLowerCase());
        })
    })

    //filter countries
    function filterCountries(query){
        filteredCountries = countriesData.filter(country=>{
            return country.name.toLowerCase().includes(query);
        })
        console.log(filteredCountries);
        parentNode.innerHTML = '';
        loadCountries();
    };


    input.addEventListener('input', async()=>{
        const query = input.value.trim().toLowerCase();
        if(!query){
            return;
        }
        filterCountries(query);
    
    })

   
});
