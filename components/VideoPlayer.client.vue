<template>
	<div class="player">
		<div v-if="status === 'unauthenticated'" class="login-wrapper">
			<p>Prehrávač je prístupný iba prihláseným užívateľom.</p>
			<Button @click="$router.push('/auth/signin')">Prihlásiť sa</Button>
		</div>
		<template v-else>
			<div v-if="!hasPlayBeenClicked" class="play-wrapper">
				<button class="play-button" @click="play">
					Spustiť prehrávač&nbsp;&nbsp;&nbsp;&#x25B6;
				</button>
			</div>
			<iframe
				v-else
				class="player"
				:src="props.url"
				frameborder="0"
				allowfullscreen
			></iframe>
		</template>
	</div>
</template>

<script setup>
const { status } = useAuth()

const props = defineProps({
	url: {
		type: String
	}
})

const hasPlayBeenClicked = ref(false)

const play = () => (hasPlayBeenClicked.value = true)

defineExpose({ play })
</script>

<style scoped>
.play-wrapper {
	width: 100%;
	height: 100%;
	display: grid;
	place-items: center;

	& .play-button {
		all: unset;
		cursor: pointer;
		font-size: 1.5rem;
		font-weight: 700;
	}
}
.player {
	width: 100%;
	max-width: 768px;
	aspect-ratio: 16 / 9;
	background-color: black;
	overflow: hidden;
	margin-inline: auto;

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
