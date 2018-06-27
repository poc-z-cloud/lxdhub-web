import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

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
    private logger: NGXLogger) { }

  /**
   * Fetches all remotes
   */
  findAll() {
    this.logger.debug(`Request all remotes`);
    // Fetch the remotes
    return this.http
      .get(`${window['process.env'].API_URL}/remote`);
  }
}
