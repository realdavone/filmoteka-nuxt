<template>
	<LayoutWrapper :style="featuredStyles">
		<section class="featured">
			<h2 class="title">{{ props.movie?.title }}</h2>

			<p>{{ props.movie?.overview }}</p>

			<div class="meta">
				<Rating
					:rating="props.movie?.vote_average"
					:votes="props.movie?.vote_count"
				/>

				<Chip
					v-for="genreId in props.movie?.genre_ids"
					:key="genreId"
					:label="getGenre(genreId)"
				/>
			</div>
			<Button @click="useRouter().push(`/movie/${props.movie?.id}`)">
				Sledovať teraz</Button
			>
		</section>
	</LayoutWrapper>
</template>

<script setup>
const props = defineProps({
	movie: {
		type: Object
	}
})

const genres = useState('genres')

const getGenre = (genreId) => {
	if (!genres.value) {
		return
	}

	return genres.value.movie.find((genre) => genre.id === genreId)?.name
}

const featuredStyles = computed(() => {
	if (!props.movie?.backdrop_path) return {}

	return {
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		backgroundImage: `
      linear-gradient(to left, var(--primary-background-clr-a), var(--primary-background-clr-a)),
      url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${props.movie?.backdrop_path})
    `
	}
})
</script>

<style scoped>
.featured {
	padding-block: 6rem;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-end;
	min-height: 70vh;
}

.title {
	font-size: clamp(1.5rem, 5vw, 4rem);
	font-weight: 600;
	margin-bottom: 0.875rem;
	line-height: 1.1;
}

p {
	margin-bottom: 1rem;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: clamp(0.875rem, 2vw, 1.25rem);
	opacity: 0.8;
}

.meta {
	margin-bottom: 1rem;
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	align-items: center;

	.genre {
		font-size: 0.875rem;
		font-weight: 500;
		color: rgb(255, 255, 255, 0.8);
		background-color: rgb(255, 255, 255, 0.1);
		padding: 0.125rem 0.5rem;
		border-radius: 0.25rem;
	}
}

@media (max-width: 768px) {
	.featured {
		flex-direction: column;
	}
}
</style>
