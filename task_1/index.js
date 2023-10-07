import {encoded, translations} from './data.js'

console.log("Let's rock")
// console.log(encoded, translations)

/* Я сразу определяю поля которых нужно игнорировать что бы за О(n) проверять ключи в объекте.

  На счёт вывода уникальных id, я не уверен что до конца понял. Буть у меня возможность я бы уточнил. 
*/

function decoded(encoded, translations){

  const fieldsToSkip = getSkipFields(encoded[0], ['groupId', 'service', 'formatSize', 'ca'])
  let uniqIds = new Set()

  encoded.forEach(item => {
    for (const [key, value] of Object.entries(item)) {
      if (key in fieldsToSkip) {
        continue
      }
      if(!(value in translations)){
        uniqIds.add(value)
        continue
      }
      item[key] = translations[value]
    }
  })

  uniqIds = Array.from(uniqIds)
  return {encoded, uniqIds}
}

function getSkipFields(itemOfEncoded, arr){
  let result = new Set()

  for (const key in itemOfEncoded) {
    if(key.includes('Id')){
      continue
    }
    result.add(key)
  }

  arr.forEach(key => {
    result.add(key)
  });

  return result
}

console.log(decoded(encoded, translations))