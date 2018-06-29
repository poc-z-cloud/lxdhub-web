import { Inject, NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { LXDHUB_WEB_SETTINGS } from '../lxdhubwebsettings.interface';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
    imports: [
        AppModule,
        ServerModule,
        ModuleMapLoaderModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppServerModule {
    constructor() {
    }
}
