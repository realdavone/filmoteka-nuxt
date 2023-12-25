<template>
	<div class="wrapper" :style="style">
		<slot />
	</div>
</template>

<script setup>
const props = defineProps({
	background: {
		type: String,
		default: 'primary'
	},
	alpha: {
		type: Boolean,
		default: false
	},
	backgroundImage: {
		type: String,
		default: ''
	}
})

const style = computed(() => {
	if (!!props.backgroundImage) {
		return {
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundImage: `
      linear-gradient(to left, transparent, var(--primary-background-clr)),
      url(${props.backgroundImage})
    `
		}
	}

	return {
		backgroundColor: `var(--${props.background}-background-clr${
			props.alpha ? '-a' : ''
		})`
	}
})
</script>

<style scoped>
.wrapper {
	max-width: 1800px;
	margin: 0 auto;
	padding-inline: 2rem;
}
</style>
