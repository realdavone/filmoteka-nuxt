<template>
	<button v-if="!props.to" class="button"><slot /></button>
	<NuxtLink v-else :to="props.to" class="button"><slot /></NuxtLink>
</template>

<script setup>
const props = defineProps({
	to: {
		type: String
	}
})
</script>

<style scoped>
.button {
	padding: 0.75rem 1rem;
	line-height: 1;
	border-radius: 0.5rem;
	border: none;
	background-color: var(--primary-clr);
	color: white;
	font-size: 0.875rem;
	font-weight: 600;
	cursor: pointer;
	transition: all 100ms ease-in-out;

	&:active {
		scale: 0.96;
	}
}
</style>
