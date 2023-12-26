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
					<NuxtLink to="/discover" class="button"> Objaviť </NuxtLink>
					<NuxtLink to="/search" class="button">Hľadať</NuxtLink>
				</template>
				<Button
					v-if="status === 'unauthenticated'"
					@click="$router.push('/auth/signin')"
					data-login
					>Prihlásiť sa</Button
				>
				<HeaderUser v-else />
			</nav>
		</LayoutWrapper>
	</header>
</template>

<script setup>
const { status } = useAuth()
</script>

<style scoped>
header {
	position: sticky;
	top: 0;
	z-index: 10;
}

.header {
	height: 56px;
	display: flex;
	align-items: center;
	gap: 2rem;
	container: header / inline-size;

	& .logo {
		font-size: 1.25rem;
		font-weight: 700;

		& a {
			display: flex;
			align-items: center;
			gap: 0.75rem;
		}
	}

	& nav {
		margin-left: auto;
		display: flex;
		gap: 20px;
		align-items: center;
		justify-content: flex-end;
		width: 100%;
	}

	@container header  (max-width: 768px) {
		.logo {
			& span {
				display: none;
			}
		}
	}
}

.button:not([data-login]) {
	font-weight: 500;
	padding-inline: 0.5rem;

	@media (hover: hover) {
		&:hover {
			color: var(--secondary-clr);
		}
	}
}
</style>
