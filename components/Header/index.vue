<template>
	<header>
		<LayoutWrapper class="header">
			<div class="logo">
				<NuxtLink to="/">
					<img src="/images/logo.svg" alt="logo" width="30" />

					<span> Filmotéka </span>
				</NuxtLink>
			</div>
			<nav>
				<template v-if="status === 'authenticated'">
					<NuxtLink to="/discover">
						<Icon name="prime:globe" size="1.5rem" />
						<span class="label">Objaviť</span>
					</NuxtLink>
					<NuxtLink to="/search">
						<Icon name="prime:search" size="1.5rem" />
						<span class="label">Hľadať</span>
					</NuxtLink>
				</template>
				<Button v-if="status === 'unauthenticated'" @click="open" data-login
					>Prihlásiť sa</Button
				>
				<HeaderUser v-else />
			</nav>
		</LayoutWrapper>

		<ModalAuth />
	</header>
</template>

<script setup>
const { status } = useAuth()
const { open } = useAuthModal()
</script>

<style scoped>
header {
	position: sticky;
	top: 0;
	z-index: 10;
}

.header {
	height: var(--header-height);
	display: flex;
	align-items: center;
	gap: 2rem;
	container: header / inline-size;
	background-color: black !important;

	.logo {
		font-size: 1.25rem;
		font-weight: 700;

		a {
			display: flex;
			align-items: center;
			gap: 0.75rem;
		}
	}

	nav {
		margin-left: auto;
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: flex-end;
		width: 100%;

		a {
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}
	}

	@container header (max-width: 768px) {
		.logo {
			span {
				display: none;
			}
		}

		nav {
			gap: 0.25rem;

			a .label {
				display: none;
			}
		}
	}
}

a:not([data-login]) {
	font-weight: 500;
	padding-inline: 0.5rem;

	@media (hover: hover) {
		&:hover {
			color: var(--secondary-clr);
		}
	}
}
</style>
