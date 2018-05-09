import { Injectable } from '@angular/core';
import { JsonRpcService } from '../json-rpc/json-rpc.service';
import { Ref } from './models/ref';
import { Playlist } from './models/playlist';

@Injectable()
export class MopidyPlaylistService {
  constructor(
    private jsonRpcService: JsonRpcService
  ) {}

  getUriSchemes = () => this.jsonRpcService.rpcRequest<string[]>("core.playlists.get_uri_schemes");
  getPlaylist = (uri: string) => this.jsonRpcService.rpcRequest<Playlist>("core.playlists.lookup");
  getPlaylists = () => this.jsonRpcService.rpcRequest<Ref[]>("core.playlists.as_list");
  getPlaylistItems = (uri: string) => this.jsonRpcService.rpcRequest<Ref[]>("core.playlists.get_items");
  refresh = (uriScheme?: string) => this.jsonRpcService.rpcRequest("core.playlists.refresh");

  create = (name: string, uriScheme?: string) => this.jsonRpcService.rpcRequest("core.playlists.create", [name, uriScheme]);
  save = (playlist: Playlist) => this.jsonRpcService.rpcRequest<Playlist>("core.playlists.save", [playlist]);
  delete = (uri: string) => this.jsonRpcService.rpcRequest("core.playlists.delete", [uri]);
}
