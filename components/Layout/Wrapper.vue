<template>
	<div class="wrapper" :data-bleed="props.bleed">
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
</script>

<style scoped>
.wrapper {
	max-width: 1800px;
	margin: 0 auto;

	&[data-bleed] {
		padding-inline: 1.5rem;
	}
}
</style>
