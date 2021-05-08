import routerInstance from '../router'

routerInstance.beforeEach((to, from, next) => {
  console.log(121212111129);
  next()
})


