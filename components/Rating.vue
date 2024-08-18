<template>
	<div class="rating">
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

/**
 * Format rating to string with comma separated fractional part
 * @param {number} rating
 * @returns {string}
 */
const getRating = (rating) =>
	new Intl.NumberFormat('sk-SK', { maximumFractionDigits: 1 }).format(rating)
</script>

<style scoped>
.rating {
	display: inline-flex;
	align-items: center;
	font-weight: 500;
	font-size: clamp(1.25rem, 5vw, 1.5rem);
	font-family: monospace;

	span::after {
		content: attr(data-votes);
		margin-inline-start: 0.5em;
		font-size: 0.5em;
	}
}
</style>
