/**
 *  useAuth composable for managing authentication state and token refresh
 */
function useAuth() {
	const { $pb } = useNuxtApp()

	const user = useState('user', () => null)
	const status = computed(() =>
		user.value ? 'authenticated' : 'unauthenticated'
	)

	const token = useCookie('pocketbase_auth')

	/**
	 * Register a new user
	 * @param {Object} credentials
	 * @returns {Promise}
	 */
	async function register(credentials) {
		try {
			return Promise.resolve()
		} catch (e) {
			return Promise.reject(e)
		}
	}

	/**
	 * Login a user as admin
	 * @param {{email: string, password: string}} credentials
	 * @returns {Promise}
	 */
	async function adminLogin({ email, password }) {
		try {
			const response = await $pb
				.collection('users')
				.authWithPassword(email, password)

			token.value = $pb.authStore.exportToCookie()

			setUser(response.record)

			return Promise.resolve(response)
		} catch (e) {
			return Promise.reject(e)
		}
	}

	/**
	 * Login a user
	 * @param {Object} credentials
	 * @returns {Promise}
	 */
	async function login({ username, password }) {
		try {
			const response = await $pb
				.collection('users')
				.authWithPassword(username, password)

			token.value = $pb.authStore.exportToCookie()

			setUser(response.record)

			return Promise.resolve(response)
		} catch (e) {
			return Promise.reject(e)
		}
	}

	/**
	 * Logout a user
	 * @returns {Promise}
	 */
	async function logout() {
		try {
			$pb.authStore.clear()
			token.value = null
			setUser(null)

			return Promise.resolve()
		} catch (e) {
			return Promise.reject(e)
		}
	}

	/**
	 * Set user
	 * @param {Object} value
	 */
	function setUser(value) {
		user.value = value
	}

	return {
		user,
		status,
		register,
		login,
		adminLogin,
		logout,
		setUser
	}
}

export default useAuth
