import { home,rooms,treatments,booking,cart,registration,login } from '../views';


export const routes = [
 
  { name: 'Home', path: '/', data: {}, component: home },
  { name: 'Rooms', path: '/rooms', data: {}, component: rooms },
  { name: 'Treatments', path: '/treatments', data: {}, component: treatments },
  { name: 'Booking', path: '/booking', data: {}, component: booking },
  { name: 'Cart', path: '/cart', data: {}, component: cart },
  { name: 'Registration', path: '/registration', data: {}, component: registration },
  { name: 'Login', path: '/login', data: {}, component: login }
];