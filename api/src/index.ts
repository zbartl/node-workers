import 'reflect-metadata';
import { App } from './app';
import { container } from './inversify.config';
import { useContainer } from 'type-graphql';

// ugly, but can't be in app.ts
useContainer(container);
const app: App = container.get(App);
app.start();
