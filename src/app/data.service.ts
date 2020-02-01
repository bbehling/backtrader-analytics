import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {}

  getGolenCrossData(data) {
    return this.http.post(
      `${environment.apiUrl}/goldencross/date`,
      JSON.stringify(data),
      {
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
