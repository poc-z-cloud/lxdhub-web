// These are important and needed before anything else
import 'reflect-metadata';
import 'zone.js/dist/zone-node';

import { enableProdMode, StaticProvider } from '@angular/core';
import { Interfaces, LogType, WinstonLogger } from '@lxdhub/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as Chalk from 'chalk';
import * as express from 'express';
import { join } from 'path';

import { LXDHUB_WEB_SETTINGS, LXDHubWebSettings } from './src/lxdhubwebsettings.interface';

export class LXDHubWeb implements Interfaces.ILXDHubService {
    private app;
    private distFolder: string = join(process.cwd(), 'lib');
    private browserDistFolder: string = join(this.distFolder, 'browser');
    private logger: WinstonLogger;
    constructor(private settings: LXDHubWebSettings) {
        this.logger = new WinstonLogger('LXDHubWeb', settings.logLevel as LogType);
    }

    private setupNgRendering() {
        const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./lib/server/main');

        const lxdHubWebSettingsProvider: StaticProvider = {
            provide: LXDHUB_WEB_SETTINGS,
            useValue: this.settings,
        };

        this.app.engine('html', ngExpressEngine({
            bootstrap: AppServerModuleNgFactory,
            providers: [
                provideModuleMap(LAZY_MODULE_MAP),
                lxdHubWebSettingsProvider
            ]
        }));

        this.app.set('view engine', 'html');
        this.app.set('views', this.browserDistFolder);

        this.app.get('/api/*', (req, res) => {
            res.status(404).send('data requests are not supported');
        });

        // Server static files from /browser
        this.app.get('*.*', express.static(this.browserDistFolder));

        // All regular routes use the Universal engine
        this.app.get('*', (req, res) => {
            res.render('index.html', { req });
        });
    }

    private async bootstrap() {
        this.app = express();
        this.setupNgRendering();
    }

    private async listen() {
        this.app.listen(this.settings.port, this.settings.hostUrl, () =>
            this.logger.log(`Running webinterface on ` + Chalk.default.blue(`http://${this.settings.hostUrl}:${this.settings.port}`)));
        try {
            this.logger.log(`Set configuration: ${Chalk.default.blue(JSON.stringify(this.settings))}`);
        } catch (ex) { }
    }

    /**
     * Runs the webinterface with the set settings
     */
    async run() {
        enableProdMode();
        try {
            await this.bootstrap();
        } catch (err) {
            err = err as Error;
            this.logger.error(`An error occured while bootstraping the application`);
            this.logger.error(err.message);
        }
        return await this.listen();
    }
}

new LXDHubWeb({
    hostUrl: process.env.HOST_URL || '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 4200,
    logLevel: process.env.LOG_LEVEL || 'silly',
    loggingUrl: 'localhost:3000/api/v1/log',
    apiUrl: process.env.API_URL || 'localhost:3000/api/v1'
}).run();
