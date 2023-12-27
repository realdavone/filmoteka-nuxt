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
	},
	bleed: {
		type: Boolean,
		default: false
	}
})

const style = computed(() => {
	const background = !!props.backgroundImage
		? {
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				backgroundImage: `
      linear-gradient(to left, transparent, var(--primary-background-clr)),
      url(${props.backgroundImage})
    `
		  }
		: {
				backgroundColor: `var(--${props.background}-background-clr${
					props.alpha ? '-a' : ''
				})`
		  }

	return {
		...(!props.bleed
			? { paddingInline: 'clamp(1rem, 0.7368rem + 1.1228vw, 2rem)' }
			: {}),
		...background
	}
})
</script>

<style scoped>
.wrapper {
	max-width: 1800px;
	margin: 0 auto;
}
</style>
