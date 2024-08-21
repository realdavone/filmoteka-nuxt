<template>
	<div class="card-wrapper">
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
				<div class="card-rating">
					{{ getRating(item.vote_average) }}
				</div>
				<div class="card-description">
					{{ item.overview }}
				</div>
			</div>
		</div>
		<div
			class="card-title"
			:style="{ viewTransitionName: `${item.media_type}-${item.id}-title` }"
		>
			{{ item.title ?? item.name }}
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

const getRating = (rating) =>
	new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(rating)
</script>

<style scoped>
& .card-title {
	font-weight: 500;
	margin-top: 1rem;
	line-height: 1.2;
}
.card {
	background-color: var(--header-clr);
	border-radius: 1rem;
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

	& .card-poster {
		width: 100%;
		height: 100%;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	@media (hover: hover) {
		& .card-overlay {
			position: absolute;
			inset: 0;
			background-color: var(--primary-background-clr-a);
			padding: 1rem;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			opacity: 0;
			transition: opacity 0.3s ease;

			& .card-rating {
				border-radius: 50%;
				border: 4px solid var(--primary-clr);
				align-self: flex-start;
				width: 2.5rem;
				aspect-ratio: 1;
				font-size: 1rem;
				font-weight: 700;
				display: flex;
				align-items: center;
				justify-content: center;
				color: var(--primary-clr);
				padding-bottom: 0.1rem;
				flex-shrink: 0;
				background-color: white;
				outline: 2px solid white;
			}

			& .card-description {
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
			transform: scale(1.05);

			& .card-overlay {
				opacity: 1;
			}
		}
	}
}
</style>
