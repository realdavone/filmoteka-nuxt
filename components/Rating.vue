<template>
	<div class="rating">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path
				fill="yellow"
				d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
			/>
		</svg>
		<span :data-votes="`(${props.votes})`">{{ getRating(props.rating) }}</span>
	</div>
</template>

<script setup>
const props = defineProps({
	rating: {
		type: Number
	},
	votes: {
		type: Number
	}
})

const getRating = (rating) =>
	new Intl.NumberFormat('sk-SK', { maximumFractionDigits: 1 }).format(rating)
</script>

<style scoped>
.rating {
	display: inline-flex;
	align-items: center;
	font-weight: 500;
	font-size: clamp(1.25rem, 5vw, 1.5rem);

	& span::after {
		content: attr(data-votes);
		margin-inline-start: 0.5em;
		font-size: 0.5em;
	}

	& svg {
		margin-inline-end: 0.25em;
		width: 1em;
	}
}
</style>
