import { InjectionToken } from '@angular/core';

/**
 * The settings for the web interface
 * of lxdhub
 */
export interface LXDHubWebSettings {
    /**
     * The LXDHub backend API url from
     * which the data should be read
     */
    apiUrl: string;
    /**
     * The logging url where the frontend should
     * be logged at. Usually at <API_URL>/api/v1/log
     */
    loggingUrl: string;
    /**
     * The port on which the web interface should
     * be run at
     */
    port: number;
    /**
     * The host url on which the web interface should
     * be run at
     */
    hostUrl: string;
    logLevel: string;
}

export const LXDHUB_WEB_SETTINGS = 'LxdhubWebSettings';
