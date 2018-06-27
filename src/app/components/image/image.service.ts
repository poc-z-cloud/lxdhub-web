import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ImageListItemDto, PaginationResponseDto } from '@lxdhub/common';
import { NGXLogger } from 'ngx-logger';

/**
 * Interface to the LXDHub API for
 * Image operations.
 */
@Injectable()
export class ImageService {
  /**
   * Initializes the Image Service
   * @param http The HTTP Client
   */
  constructor(
    private http: HttpClient,
    private logger: NGXLogger,
    @Inject('LXDHubWebSettings') private appSettings) {
      console.log(this.appSettings);
    }

  /**
   * Fetches the images with the given pagination options applied
   * @param options The pagination options which will be sent as query parameter
   */
  findByRemote(options) {
    // Set the query parameters
    let params = new HttpParams()
      .set('limit', options.limit.toString())
      .set('offset', options.offset.toString())
      .set('remoteId', options.remoteId.toString());

    if (options.query) {
      params = params.set('query', options.query.toString());
    }

    this.logger.debug(`Find images by remote remoteId#${options.remoteId}`, options);

    // Fetch the Images
    return this.http
      .get<PaginationResponseDto<ImageListItemDto>>(`${window['process.env'].API_URL}/image`, { params });
  }

  /**
   * Fetches one image with the given id
   * @param pagination The id of the image
   */
  findOne(id: number) {
    this.logger.debug(`Find one image: imageId#${id}`);
    return this.http
      .get(`${window['process.env'].API_URL}/image/${id}`);
  }

  /**
   * Clones the image
   * @param id The id of the image
   * @param cloneImageDto The clone image dto
   */
  cloneImage(id: number, cloneImageDto) {
    this.logger.debug(`Cloning image: imageId#${id}`, cloneImageDto);
    return this.http
      .post(`${window['process.env'].API_URL}/image/${id}/clone`, cloneImageDto);
  }
}
