import { Injectable, Inject } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { LXDHUB_WEB_SETTINGS } from '../../../lxdhubwebsettings.interface';

@Injectable()
export class ImageSocket extends Socket {
    constructor(@Inject(LXDHUB_WEB_SETTINGS) private settings) {
        super({ url: `${settings.apiUrl}/image`, options: {} });
    }

    getCloneStatus(destinationRemoteId: number, operation: string, imageId: number): any {
        this.emit('clone-status', { destinationRemoteId, operation, imageId });
        return this.fromEvent('clone-status');
    }
}
