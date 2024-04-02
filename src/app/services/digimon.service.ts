import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Digimon } from '../interface/digimon'; // Importa la interfaz

@Injectable({
  providedIn: 'root'
})
export class DigimonService {

  private apiUrl = 'https://digi-api.com/api/v1/digimon?pageSize=294';

  constructor(private http: HttpClient) {

  }
  getDigimons(): Observable<any[]> {
    return this.http.get<Digimon>(this.apiUrl).pipe(
      map(response => response.content)
    );
  }

  getDigimonDetails(href: string): Observable<any> {
    return this.http.get<any>(href);
  }


}
