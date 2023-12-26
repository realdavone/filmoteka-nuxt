<template>
	<div class="tag">{{ props.label }}</div>
</template>

<script setup>
const props = defineProps({
	label: {
		type: [String, Number]
	}
})
</script>

<style scoped>
.tag {
	font-size: 0.875rem;
	padding: 0.25rem 0.65rem 0.35rem;
	border-radius: 5rem;
	background-color: black;
	color: white;
	font-weight: 600;
	display: inline-block;
}
</style>
