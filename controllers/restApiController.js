const fs = require('fs');
const path = require('path');

const getCountries = async (req,res) =>{
    let countries = [];
    const queryval = req.body.countryInput? req.body.countryInput.toLowerCase(): null;
    try{
        // const response = await fetch(' http://172.20.10.4:8080/data.json');
    //    function getCountries(query){
    //         const filePath = path.join(__dirname, './data.json')
    //         const response = fs.readFileSync(filePath, 'utf8');
    //         const data =  JSON.parse(response);
    //         if(query){
    //             const searchResults = data.filter(country=>{
                   
    //                 country.name.toLowerCase().includes(queryval)
    //             })
    //             return searchResults;
    //         }
    //          return data;
    // getCountries(queryval)
    //    }
       
        const filePath = path.join(__dirname, './data.json')
        const response = fs.readFileSync(filePath, 'utf8');
        const data =  JSON.parse(response);
        res.status(200).json(data);
        // res.status(200).render('index', {countries:data});
        
    }catch(error){
        console.error("Error: ibrahim", error);
        res.status(500).json({error: "server error ibrahim"});
    }
}


module.exports = {getCountries};