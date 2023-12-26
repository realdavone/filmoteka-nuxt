<template>
	<div class="user" :data-active="isDropdownOpen">
		<img
			:src="user.image"
			alt="user"
			width="30"
			@click="isDropdownOpen = !isDropdownOpen"
		/>

		<Transition name="fade">
			<div v-show="isDropdownOpen" ref="dropdownRef" class="dropdown">
				<div class="main-menu">
					<div class="user-info">
						<img :src="user.image" alt="user" width="36" />
						<div>
							<div class="name">
								{{ user.name }}
							</div>
							<div class="email">
								{{ user.email }}
							</div>
						</div>
					</div>
					<button class="button">Záložky</button>
				</div>

				<button @click="signOut" class="button">Odhlásiť sa</button>
			</div>
		</Transition>
	</div>
</template>

<script setup>
const { user, signOut } = useAuth()

const isDropdownOpen = ref(false)
const dropdownRef = ref(null)

onClickOutside(dropdownRef, () => {
	isDropdownOpen.value = false
})
</script>

<style scoped>
.user {
	display: flex;
	align-items: center;
	gap: 10px;
	position: relative;
	cursor: pointer;
	flex-shrink: 0;
	border-radius: 50%;
	transition: 100ms ease-in-out all;

	&[data-active='true'] {
		box-shadow: 0 0 15px 0 #ffffff80;
	}

	& img {
		border-radius: 50%;
		flex-shrink: 0;
	}

	& .name {
		font-weight: 700;
		margin-bottom: 0.25rem;
		font-size: 1.15rem;
	}

	& .email {
		font-size: 0.75rem;
	}

	& .dropdown {
		position: absolute;
		right: 0;
		top: calc(100% + 10px);
		background-color: var(--primary-background-clr-a);
		backdrop-filter: blur(5px);
		padding: 0.75rem;
		border-radius: 0.75rem;
		border: 1px solid #ffffff10;
		width: max-content;

		& .main-menu {
			border-bottom: 1px solid #ffffff10;
			padding-bottom: 0.5rem;
		}

		& .user-info {
			display: flex;
			gap: 1rem;
			margin-block: 0.5rem;

			& img {
				border-radius: 50%;
				flex-shrink: 0;
				align-self: flex-start;
			}
		}

		& .button {
			all: unset;
			cursor: pointer;
			width: 100%;
			margin-top: 10px;
			text-align: center;
			padding: 5px 0 7px;
			border-radius: 0.25rem;
			transition: 200ms background-color ease;
			font-weight: 500;

			@media (hover: hover) {
				&:hover {
					background-color: #ffffff10;
				}
			}
		}
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 200ms ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
