import { createProxyMiddleware } from 'http-proxy-middleware';
import { Application } from 'express';

export default function(app: Application): void {
  app.use('/api', createProxyMiddleware({
    target: 'http://apimakrom-production.up.railway.app',
  
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/usuario/cadastrar'
    }
  }));
}
