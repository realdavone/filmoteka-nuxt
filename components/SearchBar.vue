<template>
	<form class="search-bar" @submit.prevent="handleSearch">
		<div class="input">
			<svg
				v-if="!props.isLoading"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
				height="16"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
				/>
			</svg>

			<div v-else class="loader"></div>

			<input
				ref="input"
				class="search-input"
				type="text"
				placeholder="Vyhľadávanie"
				v-model="search"
				required
			/>
		</div>
		<button type="submit" tabindex="0">Hľadať</button>
	</form>
</template>

<script setup>
const props = defineProps({
	isLoading: {
		type: Boolean,
		default: false
	},
	defaultValue: {
		type: String,
		default: ''
	}
})
const emit = defineEmits(['search'])

const search = ref(props.defaultValue)
const input = ref(null)

const handleSearch = () => emit('search', search.value)

onMounted(() => {
	if (process.client && input.value) {
		input.value.focus()
	}
})
</script>

<style scoped>
.search-bar {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	width: 100%;

	& button {
		all: unset;
		padding: 0.5rem 0.75rem 0.6rem;
		border-radius: 0.25rem;
		font-weight: 500;
		cursor: pointer;
	}
}
.input {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	background-color: var(--primary-background-clr);
	padding: 0.5rem 0.75rem 0.6rem;
	border-radius: 0.25rem;
	outline: 1px solid #ffffff30;
	width: 100%;
	max-width: 320px;

	&:focus-within {
		box-shadow: 0 0 3px 1px var(--primary-clr);
	}
}

form {
	width: 100%;
}

input {
	background: transparent;
	outline: none;
	border: none;
	font-size: 0.875rem;
	width: 100%;
	color: white;
}

.loader {
	width: 16px;
	height: 16px;
	border-radius: 50%;
	border: 2px solid #ffffff;
	border-top-color: transparent;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	to {
		transform: rotate(360deg);
		transform-origin: center center;
		transform-style: preserve-3d;
		transform-box: fill-box;
		opacity: 0;
		visibility: hidden;
		border-color: #ffffff;
		border-top-color: transparent;
		border-bottom-color: transparent;
		border-left-color: transparent;
		border-right-color: transparent;
	}
}
</style>
