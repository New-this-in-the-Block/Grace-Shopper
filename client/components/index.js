/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as SplashPage} from './SplashPage'
export {default as UserHome} from './user-home'
export {default as ProductDetails} from './ProductDetails'
export {default as ProdForm} from './ProdForm'
export {default as Products} from './Products'
export {default as Categories} from './Categories'
export {default as Profile} from './Profile'
export {default as Cart} from './Cart'
export {Login, Signup} from './auth-form'
export {default as AdminProdList} from './AdminProdList'
export {default as AdminProfile} from './AdminProfile'
export {default as AdminOrders} from './AdminOrders'
export {default as AdminUsers} from './AdminUsers'