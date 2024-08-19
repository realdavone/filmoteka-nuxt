<template>
	<div class="rating">
		<div class="stars">
			<div v-for="i in 5" :key="i" class="star" :data-fill="getFill(i)" />
		</div>

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

function getFill(index) {
	if (index * 2 > props.rating) {
		return 'empty'
	}

	return 'full'
}
</script>

<style scoped>
.rating {
	display: inline-flex;
	align-items: center;
	font-weight: 500;
	font-size: clamp(1.25rem, 5vw, 1.5rem);
	font-family: monospace;
	align-items: center;
	gap: 0.75rem;

	span::after {
		content: attr(data-votes);
		margin-inline-start: 0.5em;
		font-size: 0.5em;
	}
}

.stars {
	display: inline-flex;
	align-items: center;
	gap: 8px;

	.star {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		clip-path: polygon(
			50% 0%,
			61% 35%,
			98% 35%,
			68% 57%,
			79% 91%,
			50% 70%,
			21% 91%,
			32% 57%,
			2% 35%,
			39% 35%
		);

		&[data-fill='full'] {
			background-color: gold;
		}

		&[data-fill='empty'] {
			background-color: white;
		}
	}
}
</style>
