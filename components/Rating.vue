<template>
	<div class="rating" :data-variation="props.variation">
		<svg
			class="star"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.62L12 2L9.19 8.62L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
				fill="currentColor"
			/>
		</svg>

		<span class="rating">
			{{ getRating(props.rating) }}
		</span>

		<span class="votes">{{ props.votes }}</span>
	</div>
</template>

<script setup>
const props = defineProps({
	rating: {
		type: Number
	},
	votes: {
		type: Number
	},
	variation: {
		type: String,
		default: 'regular'
	}
})

/**
 * Format rating to string with comma separated fractional part
 * @param {number} rating Rating
 * @returns {string} Formatted rating
 */
const getRating = (rating) => {
	if (!rating) {
		return null
	}

	return new Intl.NumberFormat('sk-SK', { maximumFractionDigits: 1 }).format(
		rating
	)
}
</script>

<style scoped>
.rating {
	&[data-variation='regular'] {
		--rating-font-size: 1.25rem;
		--star-size: 1.5rem;
		--padding: 0.125rem 0.5rem;
	}

	&[data-variation='small'] {
		--rating-font-size: 0.875rem;
		--star-size: 1.25rem;
		--padding: 0.0625rem 0.375rem;
	}

	&[data-variation='large'] {
		--rating-font-size: 1.5rem;
		--star-size: 2rem;
		--padding: 0.25rem 0.75rem;
	}

	width: fit-content;
	background-color: gold;
	color: black;
	padding: var(--padding);
	display: inline-flex;
	align-items: center;

	.star {
		width: var(--star-size);
		height: auto;
		flex-shrink: 0;
	}

	&:has(.rating:empty) {
		display: none;
	}

	.rating {
		font-size: var(--rating-font-size);
		font-weight: 600;
	}

	.votes {
		font-size: 0.875rem;

		&:empty {
			display: none;
		}

		&::before {
			content: '(';
		}

		&::after {
			content: ')';
		}
	}
}
</style>
