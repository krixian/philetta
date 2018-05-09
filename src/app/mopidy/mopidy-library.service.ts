import { Injectable } from '@angular/core';
import { JsonRpcService } from '../json-rpc/json-rpc.service';
import { Ref } from './models/ref';
import { SearchQuery } from './models/search-query';
import { SearchResult } from './models/search-result';
import { Track } from './models/track';
import { Image } from './models/image';

@Injectable()
export class MopidyLibraryService {
  constructor(
    private jsonRpcService: JsonRpcService
  ) {}

  browse = (uri?: string) => this.jsonRpcService.rpcRequest<Ref[]>("core.library.browse", [uri]);
  search = (query: SearchQuery, uris?: string[], exact = false) => this.jsonRpcService.rpcRequest<SearchResult[]>("core.library.search", [query, uris, exact]);
  lookup = (uris: string[]) => this.jsonRpcService.rpcRequest<{[uri: string]: Track[]}>("core.library.lookup", [null, uris]);
  refresh = (uri?: string) => this.jsonRpcService.rpcRequest("core.library.refresh", [uri]);
  getImages = (uris: string[]) => this.jsonRpcService.rpcRequest<{[uri: string]: Image[]}>("core.library.get_images", [uris]);
}