<!-- Simple form to collect user input -->

<script>
	let week = 0;
	let totalSpent = 0;
	let categories = [];

	async function submitBudget() {
		const response = await fetch('/api/budget', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ week, totalSpent, categories })
		});

		const result = await response.json();
		console.log(result);
	}

	function addCategory() {
		categories = [...categories, { name: '', limit: 0, spent: 0 }];
	}
</script>

<h1>Create a Budget</h1>
<form on:submit|preventDefault={submitBudget}>
	<label>Week</label>
	<input type="number" bind:value={week} />

	<label>Total Spent</label>
	<input type="number" bind:value={totalSpent} />

	<h3>Categories</h3>
	{#each categories as category, i}
		<div>
			<input type="text" bind:value={category.name} placeholder="Category Name" />
			<input type="number" bind:value={category.limit} placeholder="Limit" />
			<input type="number" bind:value={category.spent} placeholder="Spent" />
		</div>
	{/each}

	<button type="button" on:click={addCategory}>Add Category</button>
	<button type="submit">Submit Budget</button>
</form>
