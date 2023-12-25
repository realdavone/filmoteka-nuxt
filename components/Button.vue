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
	padding: 0.5rem 1rem 0.6rem;
	border-radius: 0.25rem;
	border: none;
	background-color: var(--primary-clr);
	color: white;
	font-size: 1rem;
	font-weight: 700;
	cursor: pointer;
}
</style>
