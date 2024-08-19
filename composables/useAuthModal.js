/**
 * Composable for managing the auth modal
 */
function useAuthModal() {
	const isOpen = useState('authModalOpen', () => false)

	const close = () => (isOpen.value = false)
	const open = () => (isOpen.value = true)

	return {
		isOpen,
		close,
		open
	}
}

export default useAuthModal
