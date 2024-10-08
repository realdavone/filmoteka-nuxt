<template>
	<LayoutWrapper>
		<div class="filters">
			<select
				@change="handleTypeChange($event.currentTarget.value)"
				:value="$route.query.type"
			>
				<option value="" disabled selected hidden>Vyberte typ</option>
				<option value="movie">Filmy</option>
				<option value="tv">Seriály</option>
			</select>

			<select
				@change="handleGenreChange($event.currentTarget.value)"
				:value="$route.query.genre"
			>
				<option value="" disabled selected hidden>Vyberte žáner</option>
				<option v-for="genre in genresOptions" :key="genre.id" :value="genre.id">
					{{ genre.name }}
				</option>
			</select>
		</div>

		<p v-if="!$route.query.type" class="no-type">
			Vyberte si typ a žáner ktorý chcete objaviť.
		</p>
		<template v-else>
			<List heading="Knižnica" :showMore="false" :isLoaded="!isLoading">
				<template v-if="status === 'pending'">
					<div class="skeleton" v-for="i in 8" :key="i"></div>
				</template>

				<template v-else-if="status === 'success'">
					<ListItem
						v-for="title in titles?.results"
						:key="title.id"
						:item="title"
						:fallback-media-type="$route.query.type"
					/>
				</template>
			</List>
			<Pagination
				:current="!!$route.query.page ? +$route.query.page : 1"
				:total="+titles?.total_pages"
				@next="updatePagination(+($route.query.page ?? 1) + 1)"
				@prev="updatePagination(+($route.query.page ?? 1) - 1)"
			/>
		</template>
	</LayoutWrapper>
</template>

<script setup>
import { useQuery } from '@tanstack/vue-query'

const genres = useState('genres')

const genresOptions = computed(() => {
	if (!genres.value) {
		return
	}

	return genres.value[useRoute().query.type]
})

const {
	data: titles,
	isLoading,
	status
} = useQuery({
	queryKey: computed(() => [
		`discover`,
		{
			type: useRoute().query.type,
			genre: useRoute().query.genre,
			page: useRoute().query.page ?? 1
		}
	]),
	queryFn: () =>
		$fetch(`/api/discover/${useRoute().query.type}`, {
			query: { genre: useRoute().query.genre, page: useRoute().query.page ?? 1 }
		}),
	keepPreviousData: true,
	staleTime: Infinity,
	enabled: computed(() => !!useRoute().query.type)
})

const handleTypeChange = (type) => useRouter().push({ query: { type } })
const handleGenreChange = (genre) => {
	const query = structuredClone(useRoute().query)
	query.genre = genre

	useRouter().push({ query })
}

const updatePagination = (page) => {
	const query = structuredClone(useRoute().query)
	query.page = page

	useRouter().push({ query })
}

definePageMeta({
	middleware: ['auth']
})

useSeoMeta({
	title: 'Objavovanie'
})
</script>

<style scoped>
.filters {
	display: flex;
	gap: 1rem;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	padding-block: 1rem;

	& select {
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		border: 2px solid #ffffff20;
		font-size: 1rem;
		cursor: pointer;
		transition: 100ms ease-in-out all;
	}
}

.no-type {
	text-align: center;
	margin-top: 1rem;
	font-size: 0.875rem;
	font-weight: 500;
}

.skeleton {
	height: 10rem;
	background-color: rgb(255, 255, 255, 0.1);
	border-radius: 0.5rem;
	animation: pulse 1s linear infinite alternate;
}

@keyframes pulse {
	0% {
		opacity: 0.5;
	}
	100% {
		opacity: 1;
	}
}
</style>
