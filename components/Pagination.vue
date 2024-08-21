<template>
	<section class="pagination">
		<button
			:disabled="props.current === 1"
			style="margin-right: 1rem"
			@click="$emit('prev')"
		>
			&#9664;
		</button>
		<span>{{ props.current }}</span>
		<button
			:disabled="props.current === props.total"
			style="margin-left: 1rem"
			@click="$emit('next')"
		>
			&#9654;
		</button>
	</section>
</template>

<script setup>
const props = defineProps({
	total: {
		type: Number
	},
	current: {
		type: Number
	}
})
</script>

<style scoped>
.pagination {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	margin-top: 2rem;
	margin-bottom: 2rem;

	button {
		outline: none;
		border: none;
		width: 2rem;
		height: 2rem;
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		cursor: pointer;

		&:disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}
	}

	span {
		font-size: 1.25rem;
		font-weight: 500;
	}
}
</style>
