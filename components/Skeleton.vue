<template>
	<div class="skeleton"></div>
</template>

<script setup>
const props = defineProps({
	height: {
		type: String,
		default: '1.5rem'
	}
})
</script>

<style scoped>
.skeleton {
	display: inline-block;
	height: v-bind(height);
	width: 100%;
	max-width: 15rem;
	border-radius: 0.25rem;
	background-color: #ffffff10;
	animation: pulse 1s infinite;
}

@keyframes pulse {
	0% {
		opacity: 0.5;
	}
	100% {
		opacity: 1;
	}
}
</style>
