import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store";
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: { requiresAuth:false },
    
  },
  {
    path: '/dashboard',
    component: () => import('@/components/AdminLayout.vue'),
    meta: { requiresAuth: true, roles: ["admin"] },
    children: [
      {
        name: 'adminDashboard',
        path: 'home',
        component: () => import('@/views/Admin/Dashboard.vue'),
      },
      {
        name: 'Test',
        path: 'test',
        component: () => import('@/views/Test.vue'),
      },
    ]
  },
  {
    path: '/absensi',
    component: () => import('@/components/AdminLayout.vue'),
    meta: { requiresAuth: true, roles: ["admin"] },
    children: [
      {
        name: 'Home Absensi',
        path: 'home',
        component: () => import('@/views/Admin/Absensi.vue'),
      },
      {
        name: 'Detail Employee',
        path: 'detail/:employeeId', // Dynamic route corrected
        component: () => import('@/views/Admin/DetailEmployee.vue'),
      },
    ]
  },
  {
    path: '/manage-user',
    component: () => import('@/components/AdminLayout.vue'),
    meta: { requiresAuth: true, roles: ["admin"] },
    children: [
      {
        name: 'Home Manage User',
        path: 'home',
        component: () => import('@/views/Admin/ManagementUser.vue'),
      },
      {
        name: 'Manage User Detail',
        path: 'detail/:employeeId', // Dynamic route corrected
        component: () => import('@/views/Admin/ManageUserDetail.vue'),
      },
      {
        name: 'Add Employee',
        path: 'add-employee',
        component: () => import('@/views/Forms/AddEmployee.vue'),
      },
      {
        name: 'Edit Employee',
        path: 'edit-employee/:id', // Dynamic route corrected
        component: () => import('@/views/Forms/EditEmployee.vue'),
      },
    ]
  },
  {
    path: '/admin',
    component: () => import('@/components/AdminLayout.vue'),
    meta: { requiresAuth: true, roles: ["admin"] },
    children: [
      {
        name: 'Home Admin',
        path: 'home',
        component: () => import('@/views/Admin/Admin.vue'),
      },
      {
        name: 'Profile',
        path: 'profile',
        component: () => import('@/views/Admin/Profile.vue'),
      },
    ]
  },
  {
    path: '/rekap-gaji',
    component: () => import('@/components/AdminLayout.vue'),
    meta: { requiresAuth: true, roles: ["admin"] },
    children: [
      {
        name: 'Home Rekap Gaji',
        path: 'home',
        component: () => import('@/views/Admin/RekapGaji.vue'),
      },
      {
        name: 'Add Gaji',
        path: 'add-gaji',
        component: () => import('@/views/Forms/AddSalary.vue'),
      },
      {
        name: 'Edit Gaji',
        path: 'edit-gaji/:id', // Dynamic route corrected
        component: () => import('@/views/Forms/EditSalary.vue'),
      },
      {
        name: 'Detail Gaji',
        path: 'detail/:salaryId', // Dynamic route corrected
        component: () => import('@/views/Admin/RekapGajiDetail.vue'),
      },
    ]
  },
  {
    path: '/employee',
    component: () => import('@/components/EmployeeLayout.vue'),
    meta: { requiresAuth: true, roles: ["employee"] },
    children: [
      {
        name: 'employeeDashboard',
        path: 'dashboard',
        component: () => import('@/views/Employee/Dashboard.vue'),
        meta: { requiresAuth: true, roles: ['employee'] },
      },
      {
        name: 'Rekap Gaji',
        path: 'salary',
        component: () => import('@/views/Employee/RekapGaji.vue'),
      },
      {
        name: 'Tap In Out',
        path: 'tap/:type', // Dynamic route corrected
        component: () => import('@/views/Employee/TapInOut.vue'),
      },
      {
        name: 'Profile',
        path: 'profile', 
        component: () => import('@/views/Employee/Profile.vue'),
      },
    ]
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
// Authentication guard
// router/index.js
// Authentication guard
// Authentication guard
router.beforeEach(async (to, from, next) => {
  const user = store.getters.getUser;
  const isAuthenticated = !!user;  // Boolean to check if user is authenticated
  const userRole = user?.role;

  // Persist user if authenticated
  if (localStorage.getItem('user')) {
    store.commit('SET_USER', JSON.parse(localStorage.getItem('user')));
  }

  // Redirect if authenticated user tries to access login page
  if (to.name === 'login' && isAuthenticated) {
    // Redirect based on the role of the user
    if (userRole === 'admin') {
      return next({ name: 'adminDashboard' });
    } else if (userRole === 'employee') {
      return next({ name: 'employeeDashboard' });
    }
  }

  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      return next({ name: 'login' });
    } else {
      const requiredRoles = to.matched.flatMap(record => record.meta.roles || []);
      if (requiredRoles.length && !requiredRoles.includes(userRole)) {
        // Redirect based on user role
        if (userRole === "admin") {
          return next({ name: 'adminDashboard' });
        } else if (userRole === "employee") {
          return next({ name: 'employeeDashboard' });
        }
      }
    }

    // If user is authenticated and session is active, start the session check
    try {
      await store.dispatch("fetchUserData");  // Verify session
      store.dispatch("startSessionCheck");  // Start session check timer
    } catch (error) {
      // If session expired, logout is handled by fetchUserData
      return next({ name: 'login' });  // In case of an error, redirect to login
    }
  }

  next();  // Proceed to the next route
});



export default router;