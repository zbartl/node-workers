import 'reflect-metadata';
import { App } from './app';
import { container } from './inversify.config';

const app: App = container.get(App);
app.start();
