<template>
	<div class="chip" :data-clickable="props.clickable">{{ props.label }}</div>
</template>

<script setup>
const props = defineProps({
	label: {
		type: String
	},
	clickable: {
		type: Boolean,
		default: false
	}
})
</script>

<style scoped>
.chip {
	background-color: #ffffff20;
	padding: 0.5rem 1rem;
	border-radius: 0.25rem;
	color: #fff;
	display: inline-block;
	font-size: 0.85rem;
	transition: 100ms ease-in-out all;

	&[data-clickable='true'] {
		cursor: pointer;
	}

	@media (hover: hover) {
		&:hover {
			background-color: #ffffff30;
		}
	}
}
</style>
