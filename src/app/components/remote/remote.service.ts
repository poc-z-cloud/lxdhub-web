import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { LXDHubWebSettings, LXDHUB_WEB_SETTINGS } from '../../../lxdhubwebsettings.interface';
import { isPlatformBrowser } from '@angular/common';

/**
 * Interface to the LXDHub API for
 * Remote operations.
 */
@Injectable()
export class RemoteService {
  /**
   * Initializes the Remote Service
   * @param http The HTTP Client
   */
  constructor(
    private http: HttpClient,
    private logger: NGXLogger,
    @Inject(LXDHUB_WEB_SETTINGS) private settings: LXDHubWebSettings,
    @Inject(PLATFORM_ID) private platformId: Object) {
     }

  /**
   * Fetches all remotes
   */
  findAll() {
    this.logger.debug(`Request all remotes`);
    // Fetch the remotes
    return this.http
      .get(`${this.settings.apiUrl}/remote`);
  }
}
