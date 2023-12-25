<template>
	<div class="error">
		<div>
			{{ getError($route.query.error) }}
		</div>

		<Button @click="useRouter().push('/')">Domov</Button>
	</div>
</template>

<script setup>
const errorMap = {
	AccessDenied: 'Na prístup k tejto stránke nemáte oprávnenie'
}

const getError = (error) => {
	if (errorMap[error]) {
		return errorMap[error]
	}

	return 'Something went wrong'
}

definePageMeta({
	layout: false,
	middleware: 'guest-only',
	auth: { authenticatedRedirectTo: '/' }
})

useSeoMeta({
	title: 'Chyba'
})
</script>

<style scoped>
.error {
	height: 100vh;
	display: flex;
	flex-direction: column;
	gap: 2rem;
	justify-content: center;
	align-items: center;
}
</style>
