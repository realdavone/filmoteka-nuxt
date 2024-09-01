<template>
	<div
		class="card"
		@click="
			$router.push(`/${item.media_type ?? props.fallbackMediaType}/${item.id}`)
		"
	>
		<div class="card-poster">
			<img
				:src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
				draggable="false"
				loading="lazy"
			/>
		</div>
		<div class="card-overlay">
			<Rating :rating="item.vote_average" variation="small" />
			<h4>
				{{ item.title ?? item.name }}
			</h4>

			<div class="card-description">
				{{ item.overview }}
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	item: {
		type: Object
	},
	fallbackMediaType: {
		type: String
	}
})
</script>

<style scoped>
.card {
	background-color: var(--header-clr);
	display: flex;
	flex-direction: column;
	gap: 1.25rem;
	position: relative;
	overflow: hidden;
	aspect-ratio: 2/3;
	box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
	transition: all 300ms ease;
	cursor: pointer;
	isolation: isolate;

	.card-poster {
		width: 100%;
		height: 100%;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	@media (hover: hover) {
		.card-overlay {
			position: absolute;
			inset: 0;
			background-color: var(--primary-background-clr-a);
			padding: 1rem;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			opacity: 0;
			transition: opacity 0.3s ease;

			h4 {
				font-size: 1.25rem;
				line-height: 1.5;
				color: white;
				font-weight: 500;
			}

			.card-description {
				font-size: 0.85rem;
				line-height: 1.5;
				opacity: 0.75;
				display: -webkit-box;
				-webkit-line-clamp: 6;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}
		}

		&:hover {
			.card-overlay {
				opacity: 1;
			}
		}
	}
}
</style>
