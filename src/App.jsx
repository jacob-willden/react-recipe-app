import {useState} from 'react';
import './bulma.min.css';
import './App.css';

function App() {
	const [modalVisible, setModalVisible] = useState(false);
	const [recipes, setRecipes] = useState([{id: 1, name: 'Blue Milk', favorite: true}]);

	const [currentName, setCurrentName] = useState('');
	const [currentIngredients, setCurrentIngredients] = useState(['']);
	const [currentInstructions, setCurrentInstructions] = useState(['']);
	const [isCurrentFavorite, setIsCurrentFavorite] = useState(false);

	function updateCurrentIngredient(event) {
		const value = event.target.value;
		const index = event.target.getAttribute('data-index');
		setCurrentIngredients(currentIngredients.map((ingredient, i) => i.toString() === index ? value : ingredient));
	}

	function updateCurrentInstruction(event) {
		const value = event.target.value;
		const index = event.target.getAttribute('data-index');
		setCurrentInstructions(currentInstructions.map((instruction, i) => i.toString() === index ? value : instruction));
	}

	function handleRecipeItemClick(event) {
		const recipeID = event.target.getAttribute('data-recipe-id');
		const recipe = recipes.find(item => item.id.toString() === recipeID);
		setCurrentName(recipe.name);
		// setCurrentIngredients();
		// currentInstructions();
		setIsCurrentFavorite(recipe.favorite);
		setModalVisible(true);
	}

	function handleAddIngredientClick() {
		setCurrentIngredients([...currentIngredients, '']);
	}

	function handleAddInstructionClick() {
		setCurrentInstructions([...currentInstructions, '']);
	}

	function handleRecipeSave() {
		//setModalVisible(false);
		console.log(currentName);
		// handle submit logic using currentName
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
				<div className='box'>
				<div className='field'>
					<label className='label'>Name</label>
					<div className='control'>
						<input value={currentName} onChange={setCurrentName} className='input' type='text' placeholder='e.g. Pepperoni Pizza' />
					</div>
				</div>

				{currentIngredients.map((ingredient, index) => (
					<div className='field' key={index}>
						<label className='label'>Ingredient {index + 1}</label>
						<div className='control'>
							<input defaultValue={ingredient} onChange={updateCurrentIngredient} data-index={index} className='input' type='text' placeholder='e.g. 3 cups of flour' />
						</div>
					</div>
				))}
				<button onClick={handleAddIngredientClick} className='button'>Add New Ingredient</button>

				{currentInstructions.map((instruction, index) => (
					<div className='field' key={index}>
						<label className='label'>Instruction {index + 1}</label>
						<div className='control'>
							<textarea defaultValue={instruction} onChange={updateCurrentInstruction} data-index={index} className='textarea' placeholder='e.g. Add the flour to a 6 x 12 inch non-stick pan'></textarea>
						</div>
					</div>
				))}
				<button onClick={handleAddInstructionClick} className='button'>Add New Instruction</button>

				<div className='field'>
					<div className='control'>
						<label className='checkbox'>
							<input checked={isCurrentFavorite} onChange={setIsCurrentFavorite} type='checkbox' /> Favorite?
						</label>
					</div>
				</div>

				<button onClick={handleRecipeSave} className='button save-recipe'>Save Recipe</button>
				<button onClick={() => console.log(currentIngredients)}>Boop</button>
			</div>
			<button onClick={() => {setModalVisible(false)}} className='modal-close is-large' aria-label='close'></button>
			</div>
			</div>
		</div>
	);
}

export default App;