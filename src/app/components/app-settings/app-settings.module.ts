import { ModuleWithProviders, NgModule } from '@angular/core';

import { LXDHubWebSettings } from '../../../../src/lxdhubwebsettings.interface';

@NgModule()
/**
 * The module which contains providers which
 * configure the application
 */
export class AppSettingsModule {
    public static forRoot(settings: LXDHubWebSettings): ModuleWithProviders {
        const settingsProvider = {
            provide: 'LXDHubWebSettings',
            useFactory: () => settings
        };
        return {
            ngModule: AppSettingsModule,
            providers: [
                settingsProvider
            ]
        };
    }
}
