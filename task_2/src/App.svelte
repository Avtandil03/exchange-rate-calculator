<script lang="ts">
  import { type ICurrency } from "./types";
  import MySelector from "./lib/MySelector.svelte";
  const API_KEY: string = '49a2e7ef04eeaebe5ba4f8fd'
  let data:ICurrency = {'Loading...':0 }
  let fromCurrency: string = 'USD';
  let toCurrency: string = 'EUR';
  let fromVal: number = 1
  let toVal: number = 0

  async function getData() {
    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`)
    .then(res => res.json())
    .then(res => res.conversion_rates)
    .then(res => {
      data = res
      toVal = fromVal * data[toCurrency]
    })
  }
  getData()
  

  // Честно пытался найти тип для таргет 
  function handleChange(e: KeyboardEvent & {target: any}){
    
    requestAnimationFrame(() => {
      let value = parseFloat(e.target.value)
      if(isNaN(value)) return
      if(e.target.name === 'from'){
        fromVal = value
        toVal = fromVal / data[fromCurrency] * data[toCurrency]
      }else{
        toVal = value
        fromVal = toVal * data[fromCurrency] / data[toCurrency]
      }
    })
  }

  function handleSetFromCurrency(value: string){
    fromCurrency = value
  }

  function handleSetToCurrency(value: string){
    toCurrency = value
  }
  
</script>

<main>  

  <div class="container">
    <div class="">
      From
      <MySelector
        defaultValue = {fromCurrency}
        setValue = {handleSetFromCurrency}
        data = {data}
      />
      <input 
        type="number" 
        name="from" 
        on:keydown={handleChange} 
        bind:value={fromVal}
      >
    </div>
    <div>
      To
      <MySelector
        defaultValue = {toCurrency}
        setValue = {handleSetToCurrency}
        data = {data}
      />
      <input 
        type="number" 
        name="to" 
        on:keydown={handleChange} 
        bind:value={toVal}
      >
    </div>
  </div>  
  
  
</main>

<style>

  .container{
    display: flex;
    gap: 30px
  }

  input{
    width: 300px;
    height: 30px;
    margin-top: 20px;
    font-size: medium;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0; 
  }
  
</style>
