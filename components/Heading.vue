<template>
	<component class="heading" :is="props.element"><slot /></component>
</template>

<script setup>
const props = defineProps({
	element: {
		type: String,
		default: 'h1'
	}
})
</script>

<style scoped>
.heading {
	font-size: clamp(1.5rem, 5vw, 2.75rem);
	font-weight: 700;
	margin-bottom: 0.25rem;
	margin-top: 0.25rem;
}
</style>
