<template>
	<section class="episode" :data-locked="!props.enabled">
		<img
			v-if="episode?.still_path"
			:src="`https://image.tmdb.org/t/p/w500${episode?.still_path}`"
			alt="still"
		/>
		<div class="info">
			<header>
				<span v-if="episode?.episode_number" class="number">
					Epizóda #{{ episode?.episode_number }}
				</span>
				<span class="date">{{ $getFormattedDate(episode?.air_date) }}</span>
			</header>
			<h3 class="title">
				<Skeleton v-if="isLoading" height="1.5rem" />
				<span v-else>{{ info?.name ?? episode?.name }}</span>
			</h3>
			<p class="overview">
				<Skeleton v-if="isLoading" height="1rem" />
				<span v-else>{{
					!props.enabled ? 'Popis epizódy' : info?.overview ?? episode?.overview
				}}</span>
			</p>
		</div>
	</section>
</template>

<script setup>
import { useQuery } from '@tanstack/vue-query'

const props = defineProps({
	seriesId: {
		type: [Number, String]
	},
	season: {
		type: Number
	},
	episode: {
		type: Number
	},
	enabled: {
		type: Boolean,
		default: true
	}
})

const { data: episode, isLoading } = useQuery({
	queryKey: computed(() => [
		'episode',
		{
			series: props.seriesId,
			season: props.season,
			episode: props.episode
		}
	]),
	staleTime: Infinity,
	queryFn: () =>
		$fetch(`/api/tv/${props.seriesId}/episode`, {
			headers: useRequestHeaders(['cookie']),
			query: { s: props.season, e: props.episode }
		}),
	enabled: props.enabled
})

const info = computed(() => {
	const translation = useNuxtApp().$getTranslation(
		episode.value?.translations?.translations
	)

	return translation
})
</script>

<style scoped>
.episode {
	border-radius: 0.5rem;
	border: 1px solid #ffffff10;
	background-color: #ffffff10;
	position: relative;
	display: flex;
	overflow: hidden;
	height: 140px;
	container: episode / inline-size;

	& img {
		height: 100%;
		aspect-ratio: 1.5 / 1;
		object-fit: cover;
		flex-shrink: 0;
		align-self: flex-start;
	}

	& .info {
		padding-inline: 1rem;
		padding-bottom: 1rem;
		padding-top: 0.5rem;
		width: 100%;
	}

	& header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
		font-size: 0.95rem;
	}

	& .number {
		font-weight: 500;
		color: #ffffffb0;
	}

	& .title {
		font-weight: 700;
	}

	& .overview {
		margin-top: 0.5rem;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	& .date {
		margin-top: 0.5rem;
	}

	&[data-locked='true']::after {
		content: 'Iba prihlásený používatelia si môžu zobraziť informácie o epizóde.';
		font-weight: 700;
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		backdrop-filter: blur(5px);
		padding: 1rem;
		text-align: center;
	}

	@container episode (max-width: 768px) {
		img {
			display: none;
		}
	}
}
</style>
