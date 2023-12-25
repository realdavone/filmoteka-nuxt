<template>
	<section class="list">
		<header>
			<Heading element="h2" v-if="props.heading">{{ props.heading }}</Heading>
			<button v-if="props.showMore" @click="emit('showMore')">
				Zobraziť viac
			</button>
		</header>
		<div class="items" :data-loaded="props.isLoaded">
			<slot />
		</div>
	</section>
</template>

<script setup>
const props = defineProps({
	heading: {
		type: String
	},
	showMore: {
		type: Boolean,
		default: true
	},
	isLoaded: {
		type: Boolean,
		default: true
	}
})
const emit = defineEmits(['showMore'])
</script>

<style scoped>
.list {
	margin-top: 2rem;

	& header {
		margin-bottom: 1.75rem;
		border-bottom: 2px solid #ffffff20;
		padding-bottom: 1rem;
		display: flex;
		align-items: center;
		gap: 1rem;

		& button {
			all: unset;
			font-weight: 500;
			cursor: pointer;
			color: var(--primary-clr);
			margin-left: auto;
		}
	}

	& h2 {
		font-size: 2rem;
		font-weight: 500;
	}

	& .items {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 2rem;

		&:not(:empty) {
			margin-bottom: 2rem;
		}

		&[data-loaded='true']:empty::after {
			content: 'Nie sú tu žiadne výsledky.';
		}
	}
}
</style>
