<template>
	<dialog ref="dialogRef">
		<header>
			<h2>Prihlásiť sa</h2>

			<button @click="close">&times;</button>
		</header>

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
	border-radius: 0.75rem;
	padding: 1.5rem;

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;

		h2 {
			font-size: 1.5rem;
			font-weight: 700;
		}

		button {
			all: unset;
			cursor: pointer;
			font-size: 2rem;
			font-weight: 500;
			color: #fff;
			align-self: flex-start;
			line-height: 1;
		}
	}

	&::backdrop {
		background-color: rgba(0, 0, 0, 0.5);
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
