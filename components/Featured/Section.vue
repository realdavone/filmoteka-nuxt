<template>
	<LayoutWrapper :style="featuredStyles">
		<section class="featured">
			<div>
				<h2 class="title">{{ props.movie?.title }}</h2>
				<p class="description">
					Nami vybraný film ktorý máte na dosah ruky. Sledujte teraz!
				</p>
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
      linear-gradient(to left, transparent, var(--primary-background-clr)),
      url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${props.movie?.backdrop_path})
    `
	}
})
</script>

<style scoped>
.featured {
	padding-block: 6rem;
	display: flex;
	align-items: center;
	gap: 2rem;
	min-height: 70vh;
}

.title {
	font-size: clamp(1.5rem, 5vw, 3.75rem);
	line-height: 1;
	font-weight: 700;
	margin-bottom: 1rem;
}

.description {
	font-size: clamp(1rem, 5vw, 1.5rem);
	line-height: 1.5;
	margin-bottom: 1.25rem;
	opacity: 0.65;
}

@media (max-width: 768px) {
	.featured {
		flex-direction: column;
	}
}
</style>
