import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonRpcService } from './json-rpc.service';

@NgModule({
  imports: [CommonModule],
  providers: [JsonRpcService]
})
export class JsonRpcModule { }
