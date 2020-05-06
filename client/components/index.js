/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as ProductDetails} from './ProductDetails'
export {default as ProdForm} from './ProdForm'
export {default as Products} from './Products'
export {default as Categories} from './Categories'
export {default as Profile} from './Profile'
export {Login, Signup} from './auth-form'
