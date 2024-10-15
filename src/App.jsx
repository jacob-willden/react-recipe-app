import {useState, useRef} from 'react';
import './skeleton.min.css';
import './main.css';

function App() {
	const modalElement = useRef(null);
	const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
	const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);

	const [recipes, setRecipes] = useState([]);

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
		setDeleteConfirmVisible(false);
		setDeleteButtonVisible(false);

		setCurrentID(recipes.length);
		setCurrentName('');
		setCurrentIngredients(['']);
		setCurrentInstructions(['']);
		setIsCurrentFavorite(false);
		modalElement?.current.showModal();
	}

	function handleRecipeItemClick(event) {
		setDeleteConfirmVisible(false);
		setDeleteButtonVisible(true);

		const recipeID = event.target.getAttribute('data-recipe-id') * 1;
		const recipe = recipes.find(item => item.id === recipeID);
		setCurrentID(recipeID);
		setCurrentName(recipe.name);
		setCurrentIngredients(recipe.ingredients);
		setCurrentInstructions(recipe.instructions);
		setIsCurrentFavorite(recipe.favorite);
		modalElement?.current.showModal();
	}

	function handleAddIngredientClick() {
		setCurrentIngredients([...currentIngredients, '']);
	}

	function handleAddInstructionClick() {
		setCurrentInstructions([...currentInstructions, '']);
	}

	function handleRecipeSave() {
		const newRecipe = {
			id: currentID,
			name: currentName,
			ingredients: currentIngredients,
			instructions: currentInstructions,
			favorite: isCurrentFavorite
		};
		const oldRecipe = recipes.find(recipe => recipe.id === currentID);
		if(oldRecipe) {
			setRecipes(recipes.map(recipe => recipe.id === currentID ? newRecipe : recipe));
		}
		else {
			setRecipes([
				...recipes,
				newRecipe
			]);
		}
		modalElement?.current.close();
	}

	function handleRecipeDelete() {
		// Confirmation first?
		setRecipes(recipes.filter(recipe => recipe.id === !currentID));
		modalElement?.current.close();
	}

	return (
		<main>
			<h1 className='title'>React Recipe App</h1>
			<button onClick={handleNewRecipeClick} className='button'>Add New</button>
			<div className='menu'>
				<h2>Your Recipes</h2>
				<ul className='menu-list'>
					{recipes.map(recipe => (
						<li key={recipe.id}>
							<button onClick={handleRecipeItemClick} data-recipe-id={recipe.id} className="button">{recipe.name}</button>
						</li>
					))}
				</ul>
			</div>

			<dialog ref={modalElement}>
				<button onClick={() => { modalElement?.current.close() }} className="close-button">
					<img src="/close.svg" alt="Close"/>
				</button>
				<div className='field'>
					<label className='label'>Name</label>
					<div className='control'>
						<input defaultValue={currentName} onChange={(event) => setCurrentName(event.target.value)} className='input' type='text' placeholder='e.g. Pepperoni Pizza' />
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
							<input checked={isCurrentFavorite} onChange={(event) => setIsCurrentFavorite(event.target.checked)} type='checkbox' /> Favorite?
						</label>
					</div>
				</div>

				<button onClick={handleRecipeSave} className='button is-success save-recipe'>Save Recipe</button>
				<button onClick={() => {setDeleteConfirmVisible(true)}} className={`button is-danger delete-recipe ${deleteButtonVisible ? 'visible' : ''}`}>Delete Recipe</button>

				<div className={`notification is-danger is-light ${deleteConfirmVisible ? 'visible' : ''}`}>
					<button onClick={() => {setDeleteConfirmVisible(false)}} className='close-button'>
						<img src="/close.svg" alt="Cancel recipe deletion"/>
					</button>
					Confirm deletion of this recipe? <strong>This action cannot be undone.</strong>
					<button onClick={handleRecipeDelete} className='button is-danger confirm-delete'>Yes, Delete</button>
				</div>
			</dialog>
		</main>
	);
}

export default App;