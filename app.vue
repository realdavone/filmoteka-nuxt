<template>
	<NuxtLayout>
		<NuxtLoadingIndicator color="#6FFFE9" />
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>
useHead({
	titleTemplate: (titleChunk) =>
		titleChunk ? `${titleChunk} - Filmotéka` : 'Filmotéka'
})
</script>
