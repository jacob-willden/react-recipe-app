import { useState, useEffect } from 'react';
import './bulma.min.css';
import './App.css';

function App() {
	const [modalVisible, setModalVisible] = useState(false);
	const [recipes, setRecipes] = useState([{id: 1, name: 'Blue Milk'}]);
	const [ingredientsNumbers, setingredientsNumbers] = useState([1]);
	const [instructionsNumbers, setInstructionsNumbers] = useState([1]);

	function handleRecipeItemClick(event) {
		const recipeID = event.target.getAttribute('data-recipe-id');
		setingredientsNumbers([1]);
		setInstructionsNumbers([1]);
		setModalVisible(true);
	}

	function handleAddIngredientClick() {
		const lastValue = ingredientsNumbers[ingredientsNumbers.length - 1];
		setingredientsNumbers([
			...ingredientsNumbers,
			lastValue + 1
		]);
	}

	function handleAddInstructionClick() {
		const lastValue = instructionsNumbers[instructionsNumbers.length - 1];
		setInstructionsNumbers([
			...instructionsNumbers,
			lastValue + 1
		]);
	}

	function handleRecipeSave(event) {
		const form = event.target.parentElement;
		//const name = form.
		//setModalVisible(false);
	}

	return (
		<div id='main'>
			<h1 className='title'>React Recipe App</h1>
			<button className='button'>Add New</button>
			<button className='button'>Delete</button>
			<div className='menu'>
				<p className='menu-label'>
					Your Recipes
				</p>
				<ul className='menu-list'>
					{recipes.map(recipe => (
						<li key={recipe.id}>
							<a onClick={handleRecipeItemClick} data-recipe-id={recipe.id}>{recipe.name}</a>
						</li>
					))}
				</ul>
			</div>
			<div className={`modal ${modalVisible ? 'is-active' : ''}`}>
			<div className='modal-background'></div>
			<div className='modal-content'>
				<div className='field'>
					<label className='label'>Name</label>
					<div className='control'>
						<input className='input' type='text' placeholder='e.g. Pepperoni Pizza' />
					</div>
				</div>

				{ingredientsNumbers.map(number => (
					<div className='field' key={number}>
						<label className='label'>Ingredient {number}</label>
						<div className='control'>
							<input className='input' type='text' placeholder='e.g. 3 cups of flour' />
						</div>
					</div>
				))}
				<button onClick={handleAddIngredientClick} className='button'>Add New Ingredient</button>

				{instructionsNumbers.map(number => (
					<div className='field' key={number}>
						<label className='label'>Instruction {number}</label>
						<div className='control'>
							<textarea className='textarea' placeholder='e.g. Add the flour to a 6 x 12 inch non-stick pan'></textarea>
						</div>
					</div>
				))}
				<button onClick={handleAddInstructionClick} className='button'>Add New Instruction</button>

				<div className='field'>
					<div className='control'>
						<label className='checkbox'>
							<input type='checkbox' /> Favorite?
						</label>
					</div>
				</div>

				<button onClick={handleRecipeSave} className='button save-recipe'>Save Recipe</button>
			</div>
			<button onClick={() => {setModalVisible(false)}} className='modal-close is-large' aria-label='close'></button>
			</div>
		</div>
	);
}

export default App;