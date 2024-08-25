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
	font-size: 0.875rem;
	font-weight: 500;
	color: rgb(255, 255, 255, 0.8);
	background-color: rgb(255, 255, 255, 0.1);
	padding: 0.125rem 0.5rem;
	border-radius: 0.25rem;
	width: fit-content;
	pointer-events: none;

	&[data-clickable='true'] {
		cursor: pointer;
		pointer-events: all;

		@media (hover: hover) {
			&:hover {
				background-color: #ffffff30;
			}
		}
	}
}
</style>
