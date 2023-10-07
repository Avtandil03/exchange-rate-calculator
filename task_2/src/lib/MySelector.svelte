<script lang="ts">
  import { type ICurrency } from "../types";
  export let data: ICurrency;
  export let setValue: (value: string) => void;
  export let defaultValue: string; 

  
   
  function handleSetValue(e: Event & { currentTarget: EventTarget & HTMLInputElement; }){
    let value = e.currentTarget.value

    if(value in data){
      setValue(value)
    }
  }

</script>

<div>
  <input 
    type="search" 
    placeholder="select"
    list="item-list"
    on:change={handleSetValue}
    value={defaultValue}
  >
  <datalist id="item-list">
    {#each Object.keys(data) as item }
      <option class="item" >{item}</option>
    {/each}
  </datalist>
</div>

