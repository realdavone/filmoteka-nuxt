<template>
	<div class="rating">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="40"
			height="40"
			viewBox="0 0 24 24"
		>
			<path
				fill="yellow"
				d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
			/>
		</svg>
		{{ getRating(props.rating) }} <span>({{ props.votes }})</span>
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
	display: inline-block;
	font-weight: 500;
	font-size: clamp(1.25rem, 5vw, 1.5rem);

	& span {
		font-size: 0.75em;
		font-weight: 200;
	}

	& svg {
		width: clamp(1.25rem, 5vw, 1.5rem);
		height: clamp(1.25rem, 5vw, 1.5rem);
	}
}
</style>
