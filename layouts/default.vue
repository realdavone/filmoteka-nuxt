<template>
	<div class="layout-wrapper">
		<Header />
		<main>
			<slot />
		</main>
		<Footer />
	</div>
</template>

<style scoped>
.layout-wrapper {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}
</style>
