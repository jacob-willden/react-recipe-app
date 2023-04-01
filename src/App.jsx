import {useState} from 'react';
import './bulma.min.css';
import './App.css';

function App() {
	const [modalVisible, setModalVisible] = useState(false);
	const [recipes, setRecipes] = useState([{id: 1, name: 'Blue Milk', favorite: true, ingredients: [''], instructions: ['']}]);

	const [currentID, setCurrentID] = useState(-1);
	const [currentName, setCurrentName] = useState('');
	const [currentIngredients, setCurrentIngredients] = useState(['']);
	const [currentInstructions, setCurrentInstructions] = useState(['']);
	const [isCurrentFavorite, setIsCurrentFavorite] = useState(false);

	function updateCurrentIngredient(event) {
		const value = event.target.value;
		const index = event.target.getAttribute('data-index') * 1;
		setCurrentIngredients(currentIngredients.map((ingredient, i) => i === index ? value : ingredient));
	}

	function updateCurrentInstruction(event) {
		const value = event.target.value;
		const index = event.target.getAttribute('data-index') * 1;
		setCurrentInstructions(currentInstructions.map((instruction, i) => i === index ? value : instruction));
	}

	function handleNewRecipeClick() {
		setCurrentID(recipes.length);
		setCurrentName('');
		setCurrentIngredients(['']);
		setCurrentInstructions(['']);
		setIsCurrentFavorite(false);
		setModalVisible(true);
	}

	function handleRecipeItemClick(event) {
		const recipeID = event.target.getAttribute('data-recipe-id') * 1;
		const recipe = recipes.find(item => item.id === recipeID);
		setCurrentID(recipeID);
		setCurrentName(recipe.name);
		setCurrentIngredients(recipe.ingredients);
		setCurrentInstructions(recipe.instructions);
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
		console.log('isCurrentFavorite:', isCurrentFavorite);
		const newRecipe = {
			id: currentID,
			name: currentName,
			ingredients: currentIngredients,
			instructions: currentInstructions,
			favorite: isCurrentFavorite
		};
		setRecipes(recipes.map(recipe => recipe.id === currentID ? newRecipe : recipe));
		setModalVisible(false);
	}

	return (
		<div id='main'>
			<h1 className='title'>React Recipe App</h1>
			<button onClick={handleNewRecipeClick} className='button'>Add New</button>
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
			<button onClick={() => console.log(recipes)}>Boop</button>
			<div className={`modal ${modalVisible ? 'is-active' : ''}`}>
			<div className='modal-background'></div>
			<div className='modal-content'>
				<div className='box'>
				<div className='field'>
					<label className='label'>Name</label>
					<div className='control'>
						<input defaultValue={currentName} onChange={(event) => setCurrentName(event.target.value)} className='input' type='text' placeholder='e.g. Pepperoni Pizza' />
					</div>
				</div>

				<button onClick={() => console.log(isCurrentFavorite)}>isCurrentFavorite</button>

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
							<input checked={isCurrentFavorite} onChange={(event) => setIsCurrentFavorite(event.target.checked)} type='checkbox' /> Favorite?
						</label>
					</div>
				</div>

				<button onClick={handleRecipeSave} className='button is-success save-recipe'>Save Recipe</button>
				<button className='button is-danger'>Delete Recipe</button>
			</div>
			<button onClick={() => {setModalVisible(false)}} className='modal-close is-large' aria-label='close'></button>
			</div>
			</div>
		</div>
	);
}

export default App;