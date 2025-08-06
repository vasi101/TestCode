
const BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies`
const date = new Date().toISOString().split('T')[0]; 
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("button");
const msg = document.querySelector("#msg")
let currencyRate = 0;
for(let select of dropdowns ){
    for(currCode in countryList){
       let newOption = document.createElement("option");
       newOption.innerText = currCode;
       newOption.value = currCode;
       select.append(newOption);
       if(select.name === "from" && currCode === "NPR"){
        newOption.selected = true;
       } else {
        if(select.name === "to" && currCode === "INR"){
            newOption.selected = true;
           }
       }
       
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    });

}

const updateFlag = (element) => {
    let  currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
   
    

}

btn.addEventListener("click",async(evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
     let amtValue = amount.value;
    if(amount === "" || amtValue < 1){
        amtValue = 1;
        amount.value = 1;
    }
    
    let fromValue = fromCurr.value.toLowerCase();
    let toValue = toCurr.value.toLowerCase();
    let newUrl =`${BASE_URL}/${fromValue}.json`;
    let response = await fetch(newUrl);
    let data = await response.json();
    let rate =Object.values(data);
    let acRate =Object.entries(rate[1]);
    let newRate = 0;
    for(let arr of acRate){
        if(arr[0] === toValue) {
            newRate = arr[1];
            console.log(newRate)
        }
    }
    currencyRate = newRate;
    let total = amtValue * newRate
    console.log()
    console.log()
    msg.innerText = `${amtValue}${fromCurr.value} = ${total}${toCurr.value}`
})




