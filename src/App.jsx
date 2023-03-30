import { useState, useEffect } from 'react';
import './bulma.min.css';
import './App.css';

function App() {
	const [modalVisible, setModalVisible] = useState(false);
	const [recipes, setRecipes] = useState([{id: 1, name: 'Blue Milk'}]);
	const [currentIngredients, setCurrentIngredients] = useState(1);
	const [currentInstructions, setCurrentInstructions] = useState(1);

	function handleRecipeItemClick(event) {
		setModalVisible(true);
		console.log(event.target.textContent);
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
							<a onClick={handleRecipeItemClick}>{recipe.name}</a>
						</li>
					))}
				</ul>
			</div>
			<div className={`modal ${modalVisible ? 'is-active' : ''}`}>
			<div className='modal-background'></div>
			<form className='modal-content'>
				<div className='field'>
					<label className='label'>Name</label>
					<div className='control'>
						<input className='input' type='text' placeholder='e.g. Pepperoni Pizza' />
					</div>
				</div>
				<div className='field'>
					<label className='label'>Ingredient 1</label>
					<div className='control'>
						<input className='input' type='text' placeholder='e.g. 3 cups of flour' />
					</div>
				</div>
				<button className='button'>Add New Ingredient</button>
				<div className='field'>
					<label className='label'>Instruction 1</label>
					<div className='control'>
						<textarea className='textarea' placeholder='e.g. Add the flour to a 6 x 12 inch non-stick pan'></textarea>
					</div>
				</div>
				<button className='button'>Add New Instruction</button>
				<div className='field'>
					<div className='control'>
						<label className='checkbox'>
							<input type='checkbox' /> Favorite?
						</label>
					</div>
				</div>
				<button type='submit' className='button'>Save Recipe</button>
			</form>
			<button onClick={() => {setModalVisible(false)}} className='modal-close is-large' aria-label='close'></button>
			</div>
		</div>
	);
}

export default App;