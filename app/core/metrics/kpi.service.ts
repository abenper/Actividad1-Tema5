import { Injectable } from '@angular/core';

export type KPIs = {
  httpRequests: number;
  activeSubscriptions: number;
  renderItems: number;
  cacheHit: number;
  cacheMiss: number;
};

@Injectable({ providedIn: 'root' })
export class KpiService {
  kpis: KPIs = {
    httpRequests: 0,
    activeSubscriptions: 0,
    renderItems: 0,
    cacheHit: 0,
    cacheMiss: 0
  };

  reset() {
    this.kpis = { httpRequests: 0, activeSubscriptions: 0, renderItems: 0, cacheHit: 0, cacheMiss: 0 };
  }

  // En la App Buena, esto se llama poco o nada porque usamos AsyncPipe
  incSub() { this.kpis.activeSubscriptions++; }
  decSub() { this.kpis.activeSubscriptions = Math.max(0, this.kpis.activeSubscriptions - 1); }

  // Se llama desde el interceptor o servicio (simulado)
  incHttp() { this.kpis.httpRequests++; }
}
