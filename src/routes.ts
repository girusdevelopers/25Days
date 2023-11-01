import HomeRoute from '@routes/index.route';
import articleRoutes from '@routes/article.route'



const routes = [
  {
    path: '/',
    func: HomeRoute,
  },
  {
    path: '/auth',
    func: articleRoutes,
  },
//  {
//     path: '/auth',
//     func: artistRoutes,
//   },
//   {
//     path: '/audio',
//     func: audioRoutes,
//   },
// {
//   path: '/admin',
//   func: adminRoutes,
// }

];

export default routes;
