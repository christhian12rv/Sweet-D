enum RoutesEnum {
	PRODUCTS = '/products',
	PRODUCT = '/products/',
	ORDERS = '/orders',
	ORDER = '/orders/',
	CART = '/cart',
	
	LOGIN = '/login',
	REGISTER = '/register',
	FORGOT_PASSWORD = '/forgot-password',
	FORGOT_PASSWORD__NEW = '/forgot-password/new',
	PROFILE = '/profile',

	ABOUT_US = '/about-us',
	CONTACT = '/contact',

	ADMIN_DASHBOARD = '/admin/dashboard',
	ADMIN_LIST_PRODUCTS = '/admin/products',
	ADMIN_PRODUCT = '/admin/product/',
	ADMIN_ADD_PRODUCT = '/admin/add-product',
	ADMIN_LIST_ORDERS = '/admin/orders',
	ADMIN_ORDER = '/admin/order/',
	ADMIN_LIST_USERS = '/admin/users',
	ADMIN_USER = '/admin/user/',

	ERROR_404 = '/error/404',
	ERROR_500 = '/error/500'
}

export default RoutesEnum;