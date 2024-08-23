<template>
	<LayoutWrapper :style="featuredStyles">
		<section class="featured">
			<img
				class="poster"
				:src="`https://image.tmdb.org/t/p/w500${props.movie?.poster_path}`"
			/>
			<div class="info">
				<h2 class="title">{{ props.movie?.title }}</h2>
				<p>{{ props.movie?.overview }}</p>
				<Button @click="useRouter().push(`/movie/${props.movie?.id}`)"
					>Sledovať teraz</Button
				>
			</div>
		</section>
	</LayoutWrapper>
</template>

<script setup>
const props = defineProps({
	movie: {
		type: Object
	}
})

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
	align-items: flex-start;
	gap: 2rem;
	min-height: 70vh;
}

.info {
	max-width: 600px;
}

.poster {
	width: 160px;
	aspect-ratio: 2/3;
	object-fit: cover;
	border-radius: 1rem;
}

.title {
	font-size: clamp(1.5rem, 5vw, 3rem);
	font-weight: 600;
	margin-bottom: 0.125rem;
	line-height: 1.1;
}

p {
	margin-bottom: 1rem;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 0.875rem;
	opacity: 0.8;
}

@media (max-width: 768px) {
	.featured {
		flex-direction: column;
	}
}
</style>
