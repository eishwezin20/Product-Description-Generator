import $ from "jquery";
const cohere = require('cohere-ai'); // node needed, you cant run directly via browser
cohere.init('{API_KEY}');   // input cohere api key here


var weight, height, measure, error,result ;

function showSpinner() {
	document.querySelector(".spinner").classList.add("show");
  }
  
  function removeSpinner() {
	document.querySelector(".spinner").classList.remove("show");
  }


function overwrite() {
	weight = document.getElementById("weight").value;
	height = document.getElementById("height").value;
	
	error = "Please enter required texts";

	if(weight=="")
	{
		document.getElementById("results").innerHTML = error;
	} 
	else if(height=="")
	{
		document.getElementById("results").innerHTML = error;
	} 
	
	else
	{	
        (async () => {
            const response = await cohere.generate({
              model: 'xlarge',
              prompt: 'Product:'+weight+'\nKeywords:'+height+'\n with the given data, Write an Exciting Description for product related to keywords provided, which can be used for advertisements:',
              max_tokens: 150,
              temperature: 0.8,
              k: 0,
              p: 1,
              frequency_penalty: 0.4,
              presence_penalty: 0.5,
              stop_sequences: ["--"],
              return_likelihoods: 'NONE'
            });
            result = (`Prediction: ${response.body.generations[0].text}`);
          })();
          showSpinner();
		    setTimeout( function removeSpinner() 
            {
			    document.querySelector(".spinner").classList.remove("show");
		    },2000);
	    document.getElementById("results").innerHTML = result;
	}
	
}
