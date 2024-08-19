<template>
	<dialog ref="dialogRef" @close="isOpen = false">
		<button class="close-button" @click="close">&times;</button>

		<div class="image-container">
			<img src="/images/login.jpeg" alt="logo" />
		</div>

		<div class="content">
			<h2>Prihlásiť sa</h2>

			<p class="description">
				Sledujte vaše obľúbené filmy a sériály. Stačí sa prihlásiť a začať sledovať.
			</p>

			<form @submit.prevent="signIn">
				<label for="username">Používateľské meno</label>
				<input
					id="username"
					name="username"
					required
					v-model="credentials.username"
				/>

				<label for="password">Heslo</label>
				<input
					type="password"
					id="password"
					name="password"
					required
					v-model="credentials.password"
				/>

				<p v-if="error" class="error">
					{{ error?.message }}
				</p>

				<Button type="submit">Prihlásiť sa</Button>
			</form>
		</div>
	</dialog>
</template>

<script setup>
import { useMutation } from '@tanstack/vue-query'

const { login } = useAuth()
const { isOpen, close } = useAuthModal()

const dialogRef = ref(null)

const credentials = reactive({
	username: '',
	password: ''
})

const { mutate: signIn, error } = useMutation({
	mutationFn: () =>
		login({ username: credentials.username, password: credentials.password }),
	onSuccess: () => {
		close()

		credentials.username = ''
		credentials.password = ''
	}
})

watch(isOpen, (value) => {
	if (value) {
		dialogRef.value.showModal()
	} else {
		dialogRef.value.close()
	}
})
</script>

<style scoped>
dialog {
	position: fixed;
	top: 50%;
	left: 50%;
	translate: -50% -50%;
	border: unset;
	background-color: rgb(30, 30, 30);
	max-width: min(450px, calc(100% - 2rem));
	width: 100%;
	border-radius: 1rem;
	box-shadow: 0 0 35px 0px rgba(255, 255, 255, 0.25);

	.image-container {
		img {
			opacity: 0.5;
			width: 100%;
			height: auto;
			object-fit: cover;
		}
	}

	.content {
		margin-top: 1rem;
		padding-inline: 1.5rem;
		padding-bottom: 1.5rem;
	}

	h2 {
		font-size: 1.5rem;
		font-weight: 600;
		text-align: center;
		margin-bottom: 0.5rem;
	}

	.description {
		text-align: center;
		line-height: 1.4;
		margin-bottom: 2rem;
		opacity: 0.75;
		font-size: smaller;
	}

	.close-button {
		all: unset;
		cursor: pointer;
		font-size: 1.5rem;
		font-weight: 500;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		color: black;
		line-height: 1;
		position: absolute;
		top: 1rem;
		right: 1rem;
		background-color: white;
		display: grid;
		place-items: center;
		line-height: 1;
		z-index: 1;
	}

	&::backdrop {
		background-color: rgba(0, 0, 0, 0.75);
		backdrop-filter: blur(2px);
	}
}

form {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	label {
		display: block;
		font-size: 0.875rem;
		font-weight: 500;
		opacity: 0.75;
	}

	input {
		width: 100%;
		padding: 0.5rem;
		border-radius: 0.25rem;
		border: 2px solid #ffffff20;
		font-size: 1rem;
		transition: 100ms ease-in-out all;
		margin-bottom: 0.5rem;
	}

	button {
		margin-top: 1rem;
	}
}

.error {
	color: crimson;
	font-size: 0.875rem;
	background-color: rgb(220, 20, 60, 0.1);
	padding: 0.5rem;
	border-radius: 0.25rem;
	border: 1px solid crimson;
	text-align: center;
}
</style>
