import process from 'process';

import { main } from './src/app';

const freq: number = Number(process.env.npm_package_env_frequency);

// setInterval (
    // () => main(),
//     freq * 1000,
// );
main();