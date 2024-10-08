<template>
	<LayoutWrapper :style="$attrs.wrapperStyle">
		<section class="explore">
			<header>
				<Chip
					v-if="props.chipText"
					:label="props.chipText"
					style="margin-inline: auto"
				/>
				<Heading element="h2" style="margin-block: 1rem">{{ props.title }}</Heading>
				<p class="description">{{ props.description }}</p>
			</header>
			<div class="cards">
				<Card v-for="item in items?.results" :key="item.id" :item="item" />
			</div>
		</section>
	</LayoutWrapper>
</template>

<script setup>
import { useQuery } from '@tanstack/vue-query'

const props = defineProps({
	chipText: {
		type: String
	},
	title: {
		type: String
	},
	description: {
		type: String
	},
	type: {
		type: String
	}
})
const emit = defineEmits(['setFeaturedMovie'])

const { data: items } = useQuery({
	queryKey: [`trending/${props.type}`],
	queryFn: () => $fetch(`/api/trending/${props.type}`),
	staleTime: Infinity
})

watch(
	items,
	(items) => {
		if (!items) {
			return
		}
		const randomIndex = Math.floor(Math.random() * items.results.length)

		const featured = items?.results[randomIndex]

		emit('setFeaturedMovie', featured)
	},
	{
		deep: true,
		immediate: true
	}
)
</script>

<style scoped>
.explore {
	padding-block: 6rem;
	container: feat / inline-size;
}

header {
	text-align: center;
	padding-bottom: 1.5rem;
}

.description {
	font-size: 1.25rem;
	line-height: 1.5;
	opacity: 0.5;
}

.cards {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
	margin-top: 3rem;
	margin-inline: -1.5rem;
}

@container feat (width < 768px) {
	.cards {
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)) !important;
	}
}
</style>
