<template>
	<section>
		<div class="form">
			<div class="logo">
				<img src="/images/logo.svg" alt="logo" width="30" />
				<h3>Filmotéka</h3>
			</div>
			<h1 class="title">Prihlásenie</h1>
			<p class="description">Vyberte si možnosť prihlásenia</p>
			<button @click="signIn('google')" class="google-signin-button">
				Prihlásenie cez Google
			</button>
		</div>
	</section>
</template>

<script setup>
const { signIn } = useAuth()

useSeoMeta({
	title: 'Prihlásenie'
})

definePageMeta({
	layout: false,
	middleware: 'guest-only',
	auth: { authenticatedRedirectTo: '/' }
})
</script>

<style scoped>
section {
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}

.form {
	padding: 20px;
	border-radius: 10px;
	width: 100%;
	max-width: 400px;
	text-align: center;
}

.logo {
	margin-bottom: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;

	& h3 {
		font-size: 1.5rem;
		font-weight: 700;
	}
}

.title {
	font-size: 2rem;
	font-weight: 700;
	margin-bottom: 0.5rem;
}

.description {
	font-size: 1.15rem;
	margin-bottom: 2rem;
	opacity: 0.75;
}

.google-signin-button {
	width: 100%;
	background-color: #4285f4;
	color: #fff;
	padding: 0.875rem 1.5rem;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 1rem;
	font-weight: 700;
	transition: background-color 0.3s ease;

	@media (hover: hover) {
		&:hover {
			background-color: #357ae8;
		}
	}
}
</style>
