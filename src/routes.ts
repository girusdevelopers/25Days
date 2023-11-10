import HomeRoute from '@routes/index.route';
import audioRoutes from "@routes/audio.route";
import userRoutes from "@routes/user.route"
import adminRoutes from "@routes/admin.route"
import S3Routes from "@routes/magazine.route"




const routes = [
  {
    path: '/',
    func: HomeRoute,
  },
  {
    path: '/audio',
    func: audioRoutes,
  },
  {
    path: '/user',
    func: userRoutes,
  },

  {
    path: '/admin',
    func: adminRoutes,
  },
  {
    path: '/s3',
    func: S3Routes,
  },

];

export default routes;