<script lang="ts">
  import {onMount} from 'svelte'

   let amountFrom:number=0
   let amountTo:number=0
   let currencyFrom:string='USD'
   let currencyTo:string='RUB'
   let currentRate:number=0
   let currencies:string[]=[]

   async function fetchRate(){
    try{
      const res=await fetch(`https://open.er-api.com/v6/latest/${currencyFrom}`)
      const data=await res.json()
      currentRate=data.rates[currencyTo]
      currencies=Object.keys(data.rates)
    }
    catch(error){
      console.log(error)
    }
   }
   
   onMount(fetchRate);
   
   function convertCurrencyTo(){
    fetchRate()
    amountTo=+(amountFrom*currentRate).toFixed(2)
   }


   function convertCurrencyFrom(){
    fetchRate()
    amountFrom=+(amountTo/currentRate).toFixed(2)
   }

   const selectCurrency=(event: Event, params: string) =>{
    if(params==='from'){
      currencyFrom=(event.target as HTMLSelectElement).value
    }
    else if(params==='to') {
      currencyTo=(event.target as HTMLSelectElement).value
    }
   }

   function validateNum(event: KeyboardEvent) {
    const charCode = event.charCode
    if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault()
    }
  }
</script>

<main>
  <h1>Конвертер валют</h1>
  <div class='checkboxs'>
    <div>
      <label>Из валюты:</label>
      <select bind:value={currencyFrom} on:change={(event) => selectCurrency(event, 'from')}>
        { #each currencies as currency, index }
          <option value={currency} >{currency}</option>
        {/each}
      </select>
    </div>
    <div>
      <label>В валюту:</label>
      <select bind:value={currencyTo} on:change={(event) => selectCurrency(event, 'to')}>
        { #each currencies as currency, index }
          <option value={currency} >{currency}</option>
        {/each}
      </select>
    </div>
  </div>
  
  <div>
    <label>Введите требуемую сумму</label>
    <input type="text" bind:value={amountFrom} on:input={convertCurrencyTo} on:keypress={validateNum} placeholder="Введите требуемый">
  </div>
  <div>
    <label>Результат:</label>
    <input type="text" bind:value={amountTo} on:input={convertCurrencyFrom} on:keypress={validateNum} placeholder="Введите требуемый">
  </div>
</main>


<style>

main{
  display: flex;
  justify-content: center;
  align-items: center;
  gap:10px;
  flex-direction: column;
}

.checkboxs{
  display: flex;
  gap:10px;
}

 label {
  display: block;
  margin-bottom: 0.25rem;
}

 input{
  display: block;
  width: 100%;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #000000;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #000000;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

input:focus {
      color: #000000;
      background-color: #fffcfc;
      border-color: #4116dd;
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(158, 158, 158, 0.25);
}

select {
    padding: 8px; 
    font-size: 16px; 
    border: 1px solid #ccc; 
    border-radius: 5px; 
    outline: none; 
}

select:hover {
    border-color: #007bff; 
}

select:focus {
    border-color: #007bff; 
  }
</style>