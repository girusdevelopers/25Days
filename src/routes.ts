import HomeRoute from '@routes/index.route';
import articleRoutes from '@routes/article.route'
import S3Routes from '@routes/magazine.route'

const routes = [
  {
    path: '/',
    func: HomeRoute,
  },
  {
    path: '/auth',
    func: articleRoutes,
  },

 
  {
    path: '/s3',
    func: S3Routes,
  },
// {
//   path: '/admin',
//   func: adminRoutes,
// }

];

export default routes;
