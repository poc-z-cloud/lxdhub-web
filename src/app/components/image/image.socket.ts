import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Injectable()
export class ImageSocket extends Socket {
    constructor() {
        super({ url: `${window['process.env'].API_URL}/image`, options: {} });
    }

    getCloneStatus(destinationRemoteId: number, operation: string, imageId: number): any {
        this.emit('clone-status', { destinationRemoteId, operation, imageId });
        return this.fromEvent('clone-status');
    }
}
