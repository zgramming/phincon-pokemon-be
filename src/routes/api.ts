import express from 'express';
import authRoute from '@/routes/v1/auth.route';
import userRoute from '@/routes/v1/user.route';
import roleRoute from '@/routes/v1/role.route';
import parameterRoute from '@/routes/v1/parameter.route';
import masterIconRoute from '@/routes/v1/master-icon.route';
import masterDataRoute from '@/routes/v1/master-data.route';
import masterCategoryRoute from '@/routes/v1/master-category.route';
import appModulRoute from '@/routes/v1/app-modul.route';
import appMenuRoute from '@/routes/v1/app-menu.route';
import appCategoryModulRoute from '@routes/v1/app-category-modul.route';
import appAccessModulRoute from '@routes/v1/app-access-modul.route';
import appAccessMenuRoute from '@routes/v1/app-access-menu.route';
import templateDokumenRoute from '@routes/v1/template-dokumen.route';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});

router.use('/app-modul', appModulRoute);
router.use('/app-menu', appMenuRoute);
router.use('/app-category-modul', appCategoryModulRoute);
router.use('/app-access-modul', appAccessModulRoute);
router.use('/app-access-menu', appAccessMenuRoute);
router.use('/auth', authRoute);
router.use('/master-icon', masterIconRoute);
router.use('/master-data', masterDataRoute);
router.use('/master-category', masterCategoryRoute);
router.use('/parameter', parameterRoute);
router.use('/role', roleRoute);
router.use('/template-dokumen', templateDokumenRoute);
router.use('/user', userRoute);

export default router;
