// These are important and needed before anything else
import 'reflect-metadata';
import 'zone.js/dist/zone-node';

import { enableProdMode } from '@angular/core';
import { ILXDHubService } from '@lxdhub/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as express from 'express';
import * as nunjucks from 'nunjucks';
import { join } from 'path';

import { LXDHubWebSettings } from './src/lxdhubwebsettings.interface';

export class LXDHubWeb implements ILXDHubService {
  private app;
  private distFolder: string = join(process.cwd(), 'lib');
  private browserDistFolder: string = join(this.distFolder, 'browser');
  constructor(private settings: LXDHubWebSettings) { }

  private setupNunjucks() {
    nunjucks.configure(this.browserDistFolder, {
      autoescape: true,
      express: this.app,
    });
  }

  private setupNgRendering() {
    const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./lib/server/main');

    this.app.engine('html', ngExpressEngine({
      bootstrap: AppServerModuleNgFactory,
      providers: [
        provideModuleMap(LAZY_MODULE_MAP),
        {
          useValue: this.settings,
          provide: 'LXDHubWebSettings'
        }
      ]
    }));
  }

  private async bootstrap() {
    this.app = express();

    this.setupNunjucks();
    this.setupNgRendering();

    this.app.set('view engine', 'html');
    this.app.set('views', this.browserDistFolder);

    // Server static files from /browser
    this.app.get('*.*', express.static(this.browserDistFolder));

    const env = process.env;
    // All regular routes use the Universal engine
    this.app.get('*', (req, res) => {
      res.render('index', {
        req,
        env: {
          API_URL: env.API_URL || 'http://localhost:3000/api/v1',
          LOGGING_URL: env.LOGGING_URL || 'http://localhost:3000/api/v1/log',
          NODE_ENV: env.NODE_ENV || 'debug',
        }
      });
    });

  }

  /**
   * Runs the webinterface with the set settings
   */
  async run() {
    if (process.env.NODE_ENV === 'production') {
      // Faster server renders w/ Prod mode (dev mode never needed)
      enableProdMode();
    }
    try {
      await this.bootstrap();
    } catch (err) {
      err = err as Error;
      console.error(`An error occured while bootstraping the application`);
      console.error(err.message);
    }
    this.app.listen(this.settings.port, this.settings.hostUrl, () =>
      console.log(`Open on http://${this.settings.hostUrl}:${this.settings.port}`));
  }
}



