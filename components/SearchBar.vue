<template>
	<form class="search-bar" @submit.prevent="handleSearch">
		<div class="input">
			<Icon v-if="!props.isLoading" name="prime:search" size="28" />
			<div v-else class="loader"></div>

			<input
				ref="input"
				class="search-input"
				type="text"
				placeholder="Vyhľadávanie"
				v-model="search"
				required
			/>
			<button type="submit" tabindex="0">Hľadať</button>
		</div>
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
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	width: min(500px, 100%);
	margin-inline: auto;

	& button {
		all: unset;
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
	border: 2px solid #ffffff20;
	width: 100%;
	transition: box-shadow 150ms ease;

	&:focus-within {
		border-color: rgb(255, 255, 255, 1);
		box-shadow: 0 0 0 4px rgb(255, 255, 255, 0.25);
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
