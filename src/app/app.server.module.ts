import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { AppSettingsModule } from './components/app-settings/app-settings.module';
import { NgModule } from '@angular/core';

const env = window['process.env'];

@NgModule({
    imports: [
        AppModule,
        ServerModule,
        ModuleMapLoaderModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppServerModule {}
