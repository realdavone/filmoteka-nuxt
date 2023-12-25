<template>
	<div
		class="item"
		:style="imageSource"
		@click="
			$router.push(
				`/title/${props.item?.media_type ?? props.fallbackMediaType}/${
					props.item?.id
				}`
			)
		"
	>
		<!-- <img
			v-if="props.item?.media_type === 'person'"
			class="image"
			:src="`https://image.tmdb.org/t/p/w500/${props.item?.profile_path}`"
		/> -->
		<h3 class="title">{{ props.item?.title ?? props.item?.name }}</h3>
		<p class="date">
			{{
				$getFormattedDate(props.item?.release_date ?? props.item?.first_air_date)
			}}
		</p>
		<div class="bottom-row">
			<NuxtLink
				:to="`/title/${props.item?.media_type ?? props.fallbackMediaType}/${
					props.item?.id
				}`"
			>
				{{ props.item?.media_type === 'person' ? 'Informácie' : 'Sledovať' }}
			</NuxtLink>
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

const imageSource = computed(() => {
	switch (props.item?.media_type ?? props.fallbackMediaType) {
		case 'movie':
		case 'tv': {
			return `url('https://image.tmdb.org/t/p/w500/${props.item?.poster_path}')`
		}
		case 'person': {
			return `url('https://image.tmdb.org/t/p/w500/${props.item?.profile_path}')`
		}
		default: {
			return `black`
		}
	}
})
</script>

<style scoped>
.item {
	padding: 1rem;
	border-radius: 0.5rem;
	position: relative;
	overflow: hidden;
	z-index: 1;
	display: flex;
	flex-direction: column;
	height: 10rem;

	& .image {
		align-self: center;
		height: 100%;
		width: auto;
	}

	& .title {
		font-size: 1.5rem;
		font-weight: 700;
		text-shadow: 0 0 0.5rem black;
	}

	& .date {
		margin-top: 0.5rem;
		font-size: 0.9rem;
		text-shadow: 0 0 0.5rem black;
	}

	& .bottom-row {
		margin-top: auto;
		align-self: end;
		opacity: 0;
		visibility: hidden;
		transition: 200ms ease-in-out all;

		& a {
			color: var(--secondary-clr);
			font-weight: 700;
		}
	}

	&::before {
		content: '';
		position: absolute;
		inset: 0;
		background: v-bind(imageSource);
		background-size: 100%;
		background-position: center;
		background-repeat: no-repeat;
		transition: 100ms linear all;
		z-index: -1;
		opacity: 0.75;
	}

	@media (hover: hover) {
		&:hover {
			& .bottom-row {
				opacity: 1;
				visibility: visible;
			}

			&::before {
				cursor: pointer;
				background-size: 105%;
				opacity: 0.25;
			}
		}
	}
}
</style>
