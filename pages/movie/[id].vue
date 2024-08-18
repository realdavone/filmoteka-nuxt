<template>
	<LayoutWrapper
		style="padding-block: 6rem"
		:backgroundImage="`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie?.backdrop_path}`"
	>
		<div class="info-wrapper">
			<section class="info">
				<Rating :rating="movie?.vote_average" :votes="movie?.vote_count" />

				<h2
					class="title"
					:style="{ viewTransitionName: `movie-${useRoute().params.id}-title` }"
				>
					{{ title }}
				</h2>
				<div class="tags">
					<Tag :label="$getFormattedDate(movie?.release_date)" />
					<Tag :label="$getRuntime(movie?.runtime)" />
				</div>
				<h4 class="overview-title">Popis</h4>
				<p class="overview">
					{{ !!info?.overview ? info?.overview : movie?.overview }}
				</p>
				<div class="genres">
					<Chip
						v-for="genre in movie?.genres"
						:key="genre.id"
						:label="genre.name"
						@click="
							$router.push({
								path: '/discover',
								query: { type: 'movie', genre: genre.id }
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
		<VideoPlayer
			ref="videoPlayer"
			:url="`https://multiembed.mov/?video_id=${movie?.external_ids?.imdb_id}`"
			style="margin-inline: auto"
		/>
	</LayoutWrapper>
</template>

<script setup>
import { useQuery } from '@tanstack/vue-query'

const { $getTranslation } = useNuxtApp()

const id = useRoute().params.id

const videoPlayer = ref(null)

const { data: movie, suspense } = useQuery({
	queryKey: ['movie', id],
	queryFn: () =>
		$fetch(`/api/movie/${id}`, {
			headers: useRequestHeaders(['cookie'])
		}),
	staleTime: Infinity
})

await suspense()

const info = computed(() => {
	const translation = $getTranslation(movie.value?.translations?.translations)

	return translation
})

const title = computed(() =>
	!!info.value?.title ? info.value?.title : movie.value?.title
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
