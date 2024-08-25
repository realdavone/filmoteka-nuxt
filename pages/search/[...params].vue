<template>
	<LayoutWrapper style="padding-block: 6rem">
		<SearchBar
			@search="handleSearch"
			:defaultValue="$route.query?.q"
			:isLoading="isFetching"
		/>

		<template v-if="!!$route.query?.q">
			<template
				v-if="$route.params.params[0] === 'multi' || !$route.params.params[0]"
			>
				<List heading="Filmy" @showMore="handleShowMore('movie')">
					<ListItem
						v-for="item in data?.results?.filter(
							(result) => result.media_type === 'movie' && !!result.poster_path
						)"
						:key="item.id"
						:item="item"
					/>
				</List>

				<List heading="Seriály" @showMore="handleShowMore('tv')">
					<ListItem
						v-for="item in data?.results?.filter(
							(result) => result.media_type === 'tv' && !!result.poster_path
						)"
						:key="item.id"
						:item="item"
					/>
				</List>

				<!-- <List heading="Persony" @showMore="handleShowMore('person')">
					<ListItem
						v-for="item in data?.results?.filter(
							(result) => result.media_type === 'person' && !!result.profile_path
						)"
						:key="item.id"
						:item="item"
					/>
				</List> -->
			</template>

			<template v-else>
				<List
					:heading="
						$route.params?.params?.[0] === 'movie'
							? 'Filmy'
							: $route.params?.params?.[0] === 'tv'
							? 'Seriály'
							: 'Persony'
					"
					:showMore="false"
				>
					<ListItem
						v-for="item in data?.results?.filter(
							(item) => !!item.poster_path || !!item.profile_path
						)"
						:key="item.id"
						:item="item"
						:fallbackMediaType="$route.params?.params?.[0]"
					/>
				</List>
			</template>

			<Pagination
				v-if="$route.params?.params?.[0] !== 'multi' && $route.params?.params?.[0]"
				:total="data?.total_pages ?? 0"
				:current="+$route.query?.page ?? 1"
				@prev="updatePage(+$route.query?.page - 1)"
				@next="updatePage(+$route.query?.page + 1)"
			/>
		</template>
		<div v-else class="empty">Zadajte hľadaný výraz do vyhľadávania.</div>
	</LayoutWrapper>
</template>

<script setup>
import { useQuery } from '@tanstack/vue-query'

const { data, isFetching } = useQuery({
	queryKey: computed(() => [
		'search',
		{
			type: useRoute().params.params[0] ?? 'multi',
			query: useRoute().query.q ?? '',
			page: useRoute().query.page ?? 1
		}
	]),
	keepPreviousData: true,
	queryFn: () =>
		$fetch(`/api/search/${useRoute().params.params[0] ?? 'multi'}`, {
			query: { q: useRoute().query.q ?? '', page: useRoute().query.page ?? 1 }
		}),
	staleTime: Infinity,
	enabled: computed(() => !!useRoute().query.q)
})

const handleSearch = (q) => {
	const query = { q }

	if (
		useRoute().params.params[0] === 'movie' ||
		useRoute().params.params[0] === 'tv'
	) {
		query.page = 1
	}

	useRouter().push({ query })
}

const updatePage = (page) => {
	const query = structuredClone(useRoute().query)
	query.page = page

	useRouter().push({ query })
}

const handleShowMore = (type) => {
	const query = structuredClone(useRoute().query)
	query.page = 1

	useRouter().push({ path: `/search/${type}`, query })
}

definePageMeta({
	middleware: ['auth']
})

useSeoMeta({
	title: `Vyhľadávanie ${useRoute().query.q ? '- ' + useRoute().query.q : ''}`
})
</script>

<style scoped>
.title {
	font-size: 2.5rem;
	line-height: 1;
	font-weight: 700;
	margin-bottom: 1.5rem;
	text-align: center;
}

.results {
	margin-top: 2rem;
}

.tabs {
	margin-top: 2rem;
	display: flex;
	justify-content: center;
	gap: 1rem;
	flex-wrap: wrap;
}

.empty {
	font-size: 1.25rem;
	text-align: center;
	margin-top: 2rem;
	font-weight: 500;
}
</style>
