module.exports = {
  '/sign_applys/**': {
    target: 'http://api.xxx.com',
    secure: true,
    changeOrigin: true,
  },

  target: 'http://www.example.org', // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  pathRewrite: {
    '^/api/old-path': '/api/new-path', // rewrite path
    '^/api/remove/path': '/path', // remove base path
  },
  router: {
    'dev.localhost:3000': 'http://localhost:8000',
  },
}
