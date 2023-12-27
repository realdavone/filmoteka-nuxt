<template>
	<NuxtLayout>
		<NuxtLoadingIndicator color="#6FFFE9" />
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>
useHead({
	titleTemplate: (titleChunk) =>
		titleChunk ? `${titleChunk} - Filmotéka` : 'Filmotéka',
	link: {
		rel: 'icon',
		href: '/images/logo.svg'
	}
})
</script>
