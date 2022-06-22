import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
        path: '/',
        name: 'Home',
        // component: () =>
        //     import ('../views/Home.vue'),
        redirect: { name: 'Map' },
    },
    {
        path: '/map',
        name: 'Map',
        component: () =>
            import ('../views/Map.vue'),
        redirect: '/map/quality/low',
        meta: {
            requiresAuth: true,
        },
        children: [{
                path: 'quality',
                component: () =>
                    import ('../components/MapSvgController.vue'),
                children: [{
                        path: 'low',
                        name: 'low',
                        component: () =>
                            import ('../components/MapQualityLowSvgContainer.vue')
                    },
                    {
                        path: 'high',
                        name: 'high',
                        component: () =>
                            import ('../components/MapQualityHighSvgContainer.vue'),
                    },
                ]
            },
            {
                path: 'list',
                component: () =>
                    import ('../components/MapListController.vue'),
            },
        ]
    },
    {
        path: '/course',
        name: 'Course',
        component: () =>
            import ('../views/Course.vue'),
        meta: {
            requiresAuth: true,
        },
        children: [{
            path: '',
            component: () =>
                import ('../components/CourseContent.vue'),
        }, {
            path: 'theory',
            component: () =>
                import ('../components/CourseContentTheory.vue'),
        }, {
            path: 'theory/:id',
            component: () =>
                import ('../components/CourseContentTheory.vue'),
        }, {
            path: 'minitests',
            component: () =>
                import ('../components/CourseContentTest.vue'),
        }, {
            path: 'quiz',
            component: () =>
                import ('../components/CourseContentQuiz.vue'),
        }, {
            path: 'contest',
            component: () =>
                import ('../components/CourseContentContest.vue'),
        }, {
            path: 'project',
            component: () =>
                import ('../components/CourseContentProject.vue'),
        }]
    },
    {
        path: '/leaderboard',
        name: 'Leaderboard',
        component: () =>
            import ('../views/Leaderboard.vue')
    },
    {
        path: '/statistics',
        name: 'Statistics',
        component: () =>
            import ('../views/Statistics.vue'),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () =>
            import ('../views/Settings.vue'),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () =>
            import ('../views/Profile.vue'),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/auth',
        name: 'Authorization',
        component: () =>
            import ('../views/Authorization.vue'),
        children: [{
                path: 'login',
                component: () =>
                    import ('../components/LoginForm.vue'),
            },
            {
                path: 'register',
                component: () =>
                    import ('../components/RegistrationForm.vue'),
            }
        ]
    },
    {
        path: "/:catchAll(.*)",
        redirect: { name: 'Map' },
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to) {
        if (to.hash) {
            return {
                selector: to.hash,
                behavior: 'smooth',
            }
        }
    }
})

// if user authorized
router.beforeEach((to, from, next) => {
    // scroll up 
    window.scrollTo(0, 0)

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('token') == null) {
            next({
                path: '/auth/login',
            })
        } else {
            let user = JSON.parse(localStorage.getItem('user'))
            if (to.matched.some(record => record.meta.is_admin)) {
                if (user.is_admin == 1) {
                    next()
                }
            } else {
                next()
            }
        }
    } else {
        next()
    }
})

export default router