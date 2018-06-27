import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_ID, Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoModule } from 'ng-socket-io';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageModule } from './components/image/image.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LxdLogoComponent } from './components/shared/lxd-logo/lxd-logo.component';

const env = window['process.env'];

@NgModule({
  declarations: [
    AppComponent,
    LxdLogoComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'lxdhub-web' }),
    HttpClientModule,
    NoopAnimationsModule,
    ImageModule,
    AppRoutingModule,
    SocketIoModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.DEBUG,
      serverLoggingUrl: window['process.env'].LOGGING_URL
    })
  ],
  providers: [
    {
      provide: 'LXDHubWebSettings',
      useFactory: () => ({
        apiUrl: env.API_URL,
        loggingUrl: env.LOGGING_URL,
        port: env.PORT,
        hostUrl: env.HOST_URL
      })
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
