<template>
	<FeaturedSection :movie="featuredMovie" />
	<ExploreSection
		chipText="Populárne filmy"
		title="Naše najpopulárnejšie filmy"
		description="Prezrite si naše najpopulárnejšie filmy. Aktualizované denne."
		type="movie"
		@setFeaturedMovie="featuredMovie = $event"
		background="tertiary"
	/>
	<ExploreSection
		chipText="Populárne seriály"
		title="Naše najpopulárnejšie seriály"
		description="Prezrite si naše najpopulárnejšie seriály. Aktualizované denne."
		type="tv"
	/>
</template>

<script setup>
const featuredMovie = ref(null)

useSeoMeta({})
</script>
