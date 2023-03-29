import { useState, useEffect } from 'react';
import './bulma.min.css';
import './App.css';

function App() {
	const [recipes, setRecipes] = useState([{id: 1, name: 'Blue Milk'}]);

	function handleRecipeItemClick(event) {
		console.log(event.target.textContent);
	}

	return (
		<div id='main'>
			<h1 className='title'>React Recipe App</h1>
			<button className='button'>Add New</button>
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
		</div>
	);
}

export default App;