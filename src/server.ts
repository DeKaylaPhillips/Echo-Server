import express from 'express';
import indexController from 'controllers';
export const app = express();
 
app.get('/', indexController);
 
app.listen(3000);
