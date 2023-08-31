import React, { useState } from 'react'
import dino from "./dino.json"

const App = () => {

  //user's input state
  const [human,setHuman] = useState(
    {
      species: '',
      feet: '',
      inches: '',
      cm: '',
      weight: '' ,
      diet: '' ,
      image: `images/human.png`
  });

  //track if the form is sumbited to display the tiles on screen
  const [isSubmited,setIsSubmited] = useState(false);

  // change the units to metrics
  const [unitRadioBtn,setUnitRadioBtn] = useState('imperial')

  const isRadioSelected = (value) => unitRadioBtn === value

  const handleChange = (e) => {
    setHuman({...human, [e.target.name]:e.target.value})
  };

  //handles the form's sumbission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmited(prev => !prev);
  };

  // Create Dino Objects

  class Dinosaurs {
    constructor(species, weight, height, diet, where, when, fact) {
      this.species = species;
      this.weight = weight;
      this.height = height;
      this.diet = diet;
      this.where = where;
      this.when = when;
      this.fact = fact;
      this.image = `images/${species.toLowerCase()}.png`
    }
  };

  const dinos=dino.Dinos.map((dinosaur) => {
    return dinosaur = new Dinosaurs(dinosaur.species,dinosaur.weight,dinosaur.height,dinosaur.diet,dinosaur.where,dinosaur.when,dinosaur.fact);
  } );

    // Create Human Object

    dinos.splice(4,0,human);

    // Create Dino Compare Method 1

    function firstMethod(species,weight) {
      const humanWeight = Number(human.weight)
      return unitRadioBtn === 'imperial'?
      `${species} weighted almost ${Math.floor(weight - humanWeight)} lbs more than you.`
      :
      `${species} weighted almost ${Math.floor((weight/2.205) - humanWeight)} kg more than you.`;
    }

    // Create Dino Compare Method 2

    function secondMethod(species,height) {
      const humanHeight = (Number(human.feet*12)) + Number(human.inches)
      return unitRadioBtn === 'imperial'?
      `${species} was almost ${Math.floor(height - humanHeight)} inches higher than you.`
      :
      `${species} was almost ${Math.floor((height*2.54) - human.cm)} cm higher than you.`;
    }

    // Create Dino Compare Method 3

    function thirdMethod(diet,species) {
      const humansDiet = human.diet.toLowerCase()
      console.log(humansDiet)
      if (humansDiet === diet) {
        return `${species} and you have the same diet ! How cool is that ! `
      } else {
        return `You are a ${humansDiet} but ${species} is a ${diet} !`
      }
    }

    // Generate Tiles for each Dino in Array
    const tiles = dinos.map((dino) => {
      const fact1= `${dino.species} lived at ${dino.where}.`;
      const fact2= `${dino.species} lived in the ${dino.when}.`;
      const facts= [
        fact1,
        fact2,
        dino.fact,
        firstMethod(dino.species,dino.weight),
        secondMethod(dino.species,dino.height),
        thirdMethod(dino.diet,dino.species),
      ];
      function randomFact() {
        return Math.floor(Math.random()*facts.length);
     }
     function displayFact(){
      let fact;
      if (dino.species === human.species) {
        fact = "";
      } else if (dino.species === "Pigeon") {
        fact = dino.fact;
      } else {
        fact = facts[randomFact()]
      };
       return fact;
     }

      return(
        <div className='grid-item' key={dino.species}>
          <h3> {dino.species} </h3>
          <img src={dino.image} alt = "dinosaur"/>
          <p> {displayFact()} </p>
        </div>
      )
    })

  return (
    <div>
      <header>
        <h2>Natural History Museum</h2>
        <h1>Dinosaurs</h1>
        <h3>How do you compare?</h3>
      </header>
      {!isSubmited?
        <form id="dino-compare" onSubmit={handleSubmit}>
            <div className="form-container">
                <p>Name:</p>
                <input
                id="name"
                className="form-field__full"
                type="text"
                name="species"
                value={human.species}
                onChange={handleChange}
                required
                />
                <p>Height</p>
                <section className="unit">
                    <label>
                      Imperial
                      <input
                      type="radio"
                      name="unit"
                      id="imperial"
                      value='imperial'
                      checked={isRadioSelected('imperial')}
                      onChange={(e)=>{setUnitRadioBtn(e.target.value)}}/>
                    </label>
                    <label>
                      Metrics
                      <input
                      type="radio"
                      name="unit"
                      id="metrics"
                      value='metrics'
                      checked={isRadioSelected('metrics')}
                      onChange={(e)=>{setUnitRadioBtn(e.target.value)}}
                      />
                    </label>
                </section>
                {unitRadioBtn === 'imperial'?
                <>
                <label>
                  Feet:
                  <input
                  id="feet"
                  className="form-field__short"
                  type="number"
                  name="feet"
                  value={human.feet}
                  onChange={handleChange}
                  required
                  />
                </label>
                <label>inches:
                  <input id="inches"
                  className="form-field__short"
                  type="number"
                  name="inches"
                  value={human.inches}
                  onChange={handleChange}
                  required
                  />
                </label>
                <p>Weight:</p>
                <label>
                  <input id="weight"
                  className="form-field__full"
                  type="number"
                  name="weight"
                  value={human.weight}
                  onChange={handleChange}
                  required
                  />
                  lbs
                </label>
                </>
                  :
                  <>
                <label>
                  cm:
                  <input
                  id="cm"
                  className="form-field__short"
                  type="number"
                  name="cm"
                  value={human.cm}
                  onChange={handleChange}
                  required
                  />
                </label>
                <p>Weight:</p>
                <label>
                  <input id="weight"
                  className="form-field__full"
                  type="number"
                  name="weight"
                  value={human.weight}
                  onChange={handleChange}
                  required
                  />
                  kg
                </label>
                </>
                }
                <p>Diet:</p>
                <select
                id="diet"
                className="form-field__full"
                name="diet"
                value={human.diet}
                onChange={handleChange}
                required
                >
                  <option selected>--Select--</option>
                  <option>Herbavor</option>
                  <option>Omnivor</option>
                  <option>Carnivor</option>
                </select>
                <button type="submit" id="btn">Compare Me!</button>
            </div>
        </form>
      :
        <main id="grid">
          {tiles}
        </main>
      }
      <footer>
        <p className="fine-print">Data Sourced from <a href="https://www.wikipedia.org/">Wikipedia.org</a>, all numbers are approximations.</p>
      </footer>
  </div>
  )
}

export default App;



// Suggestions to Make Your Project Stand Out
// Validate the form data to ensure the data is acceptable and complete.
// Allow the user to generate a new infographic.
// Move the tile colors from CSS to JS for more control.
// Randomize the order of the tiles while keeping the human in the middle.
// Create a hover state on the tiles that displays the rest of the species statistics.
// Create additional methods for comparing data.
// Rewrite the project to use constructor functions, factory functions, the module pattern, and revealing module pattern
// Allow the user to select different units for the numbers and update the methods to account for this.