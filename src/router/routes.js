import store from "@/state/store";

const beforeEnterCheckLogin = (from, to, next) => {
  if (store.getters["auth/loggedIn"]) {
    // Redirect to the home page instead
    next({ name: "home" });
  } else {
    // Continue to the login page
    next();
  }
};

const beforeEnterCheckUser = (from, to, next) => {
  const user = localStorage.getItem("user");
  if (!user) {
    // Redirect to the login page instead
    next({ name: "login" });
  } else {
    store.dispatch("auth/SET_CURRENT_USER", user);
    next();
  }
};

const beforeEnterLogout = async (from, to, next) => {
  await store.dispatch("auth/logOut");
  next({ name: "login" });
};

export default [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/pages/account/login"),
    beforeEnter: beforeEnterCheckLogin,
  },
 
  
  {
    path: "/logout",
    name: "logout",
    beforeEnter: beforeEnterLogout,
  },
  {
    path: "/",
    name: "layout",
    meta: {
      authRequired: true,
    },
    component: () => import("../views/layouts/main.vue"),
    beforeEnter: beforeEnterCheckUser,
    children: [
      {
        path: "/",
        name: "home",
        meta: {
          authRequired: true,
        },
        component: () => import("../views/pages/dashboard/index"),
      },
      {
        path:"/components",
        name:"components",
        meta:{
          authRequired: true,
        },
        component: () => import("../views/pages/componentspage/ComponentsPage.vue")
      },
      
      {
        path: "/companies",
        name: "companies",
        meta: {
          authRequired: true,
        },
        component: () => import("../views/pages/allcompanies/AllCompaniesPage.vue"),
      },
      {
        path: "/companies/add",
        name: "addCompany",
        meta: {
          authRequired: true,
        },
        component: () => import("../views/pages/allcompanies/AddCompany.vue"),
      },

      {
        path: "/companies/:id",
        name: "companyDetails",
        component: () => import("../views/pages/companydetails/CompanyDetailsPage"),
      },
    
      {
        path: "/companies/:id/payment",
        name: "paymentPage",
        component: () => import("../views/pages/payment/paymentPage.vue")
      },
      {
        path: "/companies/:id/payment/pay",
        name: "creditcard",
        meta: {
          authRequired: true,
        },
        component: () => import("../views/pages/payment/creditCard.vue"),
      },
    ],
  },

  {
    path: "*",
    name: "notFound",
    component: () => import("../views/pages/notfound/notFound.vue"),
    beforeEnter: beforeEnterCheckUser,
  },
];
