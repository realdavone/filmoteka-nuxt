<template>
	<LayoutWrapper
		style="padding-block: 6rem"
		:backgroundImage="`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${tv?.backdrop_path}`"
	>
		<div class="info-wrapper">
			<section class="info">
				<h2 class="title">
					{{ title }} <Rating :rating="tv?.vote_average" :votes="tv?.vote_count" />
				</h2>
				<div class="tags">
					<Tag :label="$getFormattedDate(tv?.first_air_date)" />
					<Tag :label="`${tv.number_of_episodes} epizód`" />
				</div>
				<h4 class="overview-title">Popis</h4>
				<p class="overview">
					{{ !!info?.overview ? info?.overview : tv?.overview }}
				</p>
				<div class="genres">
					<Chip
						v-for="genre in tv?.genres"
						:key="genre.id"
						:label="genre.name"
						@click="
							$router.push({
								path: '/discover',
								query: { type: 'tv', genre: genre.id }
							})
						"
						clickable
					/>
				</div>
				<Button
					@click="
						$scrollToElement({ offsetTop: 66, element: $refs.videoPlayer.$el })
					"
					>Prejsť na prehrávač</Button
				>
			</section>
		</div>
	</LayoutWrapper>

	<LayoutWrapper background="black" bleed>
		<VideoPlayer ref="videoPlayer" :url="playerUrl" style="margin-inline: auto" />
	</LayoutWrapper>

	<LayoutWrapper style="padding-bottom: 6rem">
		<div class="select-wrapper">
			<select v-model="playerState.season">
				<option v-for="(season, index) in seasons" :value="index + 1">
					{{ season.name }}
				</option>
			</select>

			<select v-model="playerState.episode">
				<option v-for="episode in numberOfEpisodes" :value="episode" :key="episode">
					{{ `Epizóda ${episode}` }}
				</option>
			</select>
		</div>

		<Episode
			:seriesId="id"
			:season="playerState.season"
			:episode="playerState.episode"
			:enabled="status === 'authenticated'"
		/>
	</LayoutWrapper>
</template>

<script setup>
import { useQuery } from '@tanstack/vue-query'

const { status } = useAuth()

const { $getTranslation } = useNuxtApp()

const id = useRoute().params.id

const playerState = reactive({
	season: 1,
	episode: 1
})

const { data: tv, suspense } = useQuery({
	queryKey: ['tv', id],
	queryFn: () =>
		$fetch(`/api/tv/${id}`, {
			headers: useRequestHeaders(['cookie'])
		}),
	staleTime: Infinity
})

await suspense()

console.log(tv.value)

const playerUrl = computed(
	() =>
		`https://multiembed.mov/?video_id=${tv.value?.external_ids?.imdb_id}&s=${playerState.season}&e=${playerState.episode}`
)

const numberOfEpisodes = computed(
	() => seasons.value?.[playerState.season - 1]?.episode_count
)

const info = computed(() => {
	const translation = $getTranslation(tv.value?.translations?.translations)

	return translation
})

const seasons = computed(() =>
	tv.value?.seasons?.filter((season) => season?.season_number > 0)
)

const title = computed(() =>
	!!info.value?.name ? info.value?.name : tv.value?.name
)

useSeoMeta({
	title
})
</script>

<style scoped>
.info-wrapper {
	display: flex;
	flex-wrap: wrap;
	gap: 5rem;
}
.info {
	width: 100%;
	max-width: 768px;
}

.title {
	font-size: clamp(1.5rem, 5vw, 3.75rem);
	font-weight: 700;
	margin-bottom: 1rem;
	line-height: 1.2;
	text-wrap: balance;
}

.overview-title {
	font-size: 1.25rem;
	font-weight: 500;
	margin-bottom: 1rem;
}
.overview {
	margin-bottom: 1rem;
	line-height: 1.5;
	opacity: 0.8;
	font-size: 0.875rem;
}

.select-wrapper {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	justify-content: center;
	gap: 1rem;
	margin-block: 2rem;

	& select {
		width: 150px;
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		color: #fff;
		font-size: 1rem;
		appearance: none;
		border: none;
		outline: none;
		cursor: pointer;
		font-family: inherit;
		font-weight: 500;
		text-align: center;
	}
}

.genres {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin-bottom: 1rem;
}

.tags {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin-bottom: 1rem;
}
</style>
