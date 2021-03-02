const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
  /////// Defining Varables \\\\\\
  let main = document.querySelector('main')

  /////// Fetch Functions \\\\\\\
  const getTrainers = () => {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => {
      trainers.forEach(trainer => {
        displayTrainer(trainer)
      });
    })
  }
  //here he fetched all the trainers from the TRAINERS URL. 
  //turned the response into json.
  //then iterated over the trainers and pass it to a function that displays the trainers.(1)

  function displayTrainer(trainer) {
    ////// Defining Variable \\\\\\
    let div = document.createElement('div')
    let p = document.createElement('p')
    let addBtn = document.createElement('button')
    let ul = document.createElement('ul')
    //here is the function that displays them.
    //so here he is created that was needed based off the html example from the readme
    //the example has a div, p, ul, and a button.

    div.appendChild(p)
    //here he attached the p element to the div. like it is in the html example.

    /////// Class / Id Additon \\\\\\
    div.className = 'card'
    div.data = trainer.id
    addBtn.data = trainer.id
    ul.id = trainer.id
    //here he set the div class name to 'card' like the html example said so.
    //we then set the div data to the trainer id that way it pertains to a certain trainer
    //we also set the button data to the trainer id as well.
    // we also set the un ordered list id to the trainer id

    p.innerText = trainer.name 
    addBtn.innerText = 'Add Pokemon'
    //we then set the text of the p tag to the name of the trainer that it belong to
    //we then set the text of the button to 'add pokemon'

    trainer.pokemons.forEach(pokemon => {
      let lis = displayPokemon(pokemon)
      ul.append(lis)
    })
  //display pokemon function 
  //we added those lis to the ul list 

    ///////Append to Div \\\\\\\
    div.append(addBtn, ul)
    main.append(div)
    //we then added the add button and ul to the dic itself
    //we then added the div to the main which we got in the beggining


    ///////EventListener \\\\\\\
    addBtn.addEventListener('click', (e) => {
      if(ul.childElementCount < 6) {
         createPokemon(addBtn.data)
      }
    })
  }
  //here we added a event listner to that add button that reacts to a click
  //we passed in the createPokemon function with the button data


  function displayPokemon(pokemon) {
    //////// Defining Varibales \\\\\\\
    let li = document.createElement('li')
    let releaseBtn = document.createElement('button')
    //this is the display function so we created a li 
    //we created a 'delete button' 


    /////// Class / Id Addition \\\\\\\\
    releaseBtn.className = 'release'
    releaseBtn.data = pokemon.id
    //we set the class name of the delete button
    //we then set the data of that release button to the pokemon id 


    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    releaseBtn.innerText = 'Release'
    //we then set each li text to the name and species
    //we also set our delete button text to release

    /////// Append \\\\\\
    li.append(releaseBtn)
    //we then added our delete button to our li



    ////// EventListener \\\\\\\
    releaseBtn.addEventListener('click', (e) => {
      deletePokemon(releaseBtn.data)
      releaseBtn.parentElement.remove()
    })

    return li
  }
  //here for our delete button we added a event listener
  //it calls the function and passes in the data of that delete button
  //we then call the remove method on that button

  // Standalone Functions
  function createPokemon(trainer_id) {
    fetch(POKEMONS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'trainer_id': trainer_id
      })
    })
    .then(resp => resp.json())
    .then(pokemon => {
      let ul = document.getElementById(pokemon.trainer_id)
      let lis = displayPokemon(pokemon)

      ul.appendChild(lis)
    })
  }
  



  function deletePokemon(pokemon_id) {
    fetch(POKEMONS_URL + `/${pokemon_id}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
  }
  
  // Call Functions
  getTrainers()
})

{/* <div class="card" data-id="1"><p>Prince</p>
  <button data-trainer-id="1">Add Pokemon</button>
  <ul>
    <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
  </ul>
</div> */}

