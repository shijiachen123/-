// import DefaultTheme from 'vitepress/theme'
// import Layout from './Layout.vue'
// import './custom.css'
// import { useRoute, useRouter } from 'vitepress'
// import { onMounted, watch } from 'vue'

// // 添加路由守卫
// const setupRouteGuard = () => {
//   const router = useRouter()
//   const route = useRoute()

//   // 检查用户是否已登录
//   const isAuthenticated = () => {
//     return !!localStorage.getItem('token')
//   }

//   // 检查用户角色
//   const getUserRole = () => {
//     const userStr = localStorage.getItem('user')
//     if (!userStr) return null
//     try {
//       const user = JSON.parse(userStr)
//       return user.role
//     } catch (e) {
//       return null
//     }
//   }

//   // 定义需要登录的路由
//   const protectedRoutes = ['/admin']
  
//   // 定义需要管理员权限的路由
//   const adminRoutes = ['/admin']
  
//   // 定义已登录用户不应访问的路由
//   const authRoutes = ['/login', '/register']

//   // 路由跳转函数
//   const handleRouteChange = () => {
//     const currentPath = route.path
//     const isLoggedIn = isAuthenticated()
//     const userRole = getUserRole()
    
//     // 1. 如果是受保护的路由，且用户未登录，重定向到登录页
//     if (protectedRoutes.includes(currentPath) && !isLoggedIn) {
//       router.go('/login?redirect=' + encodeURIComponent(currentPath))
//       return
//     }
    
//     // 2. 如果是管理员路由，且用户不是管理员或编辑者，重定向到首页
//     if (adminRoutes.includes(currentPath) && 
//         !['admin', 'editor'].includes(userRole)) {
//       router.go('/')
//       return
//     }
    
//     // 3. 如果已登录，但访问的是登录/注册页面，重定向到首页
//     if (isLoggedIn && authRoutes.includes(currentPath)) {
//       router.go('/')
//       return
//     }
//   }

//   // 监听路由变化
//   watch(() => route.path, handleRouteChange, { immediate: true })
// }

// export default {
//   extends: DefaultTheme,
//   Layout,
//   enhanceApp({ app, router }) {
//     // 在应用程序启动时设置路由守卫
//     if (typeof window !== 'undefined') {
//       // 仅在客户端执行
//       app.mixin({
//         mounted() {
//           if (this === this.$root) {
//             setupRouteGuard()
//           }
//         }
//       })
//     }
//   }
// } 
// 1. 导入 vitepress 主题
import Theme from '@escook/vitepress-theme'
// 2. 导入配套的 CSS 样式（此步骤不能省略）
import '@escook/vitepress-theme/style.css'

// 3. 把“导入”的主题“默认导出”即可
export default Theme