<template>
	<div class="player">
		<iframe
			v-if="status === 'authenticated'"
			class="player"
			:src="props.url"
			frameborder="0"
			allowfullscreen
		></iframe>
		<div v-else class="login-wrapper">
			<p>Prehrávač je prístupný iba prihláseným užívateľom.</p>
			<Button @click="$router.push('/auth/signin')">Prihlásiť sa</Button>
		</div>
	</div>
</template>

<script setup>
const { status } = useAuth()

const props = defineProps({
	url: {
		type: String
	}
})
</script>

<style scoped>
.player {
	width: 100%;
	max-width: 768px;
	aspect-ratio: 16 / 9;
	background-color: black;
	overflow: hidden;

	& iframe {
		width: 100%;
		height: 100%;
	}
}

.login-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 1rem;
	gap: 1rem;
	height: 100%;
	font-size: clamp(1rem, 5vw, 1.5rem);
	font-weight: clamp(500, 5vw, 700);

	& p {
		text-align: center;
	}
}
</style>
