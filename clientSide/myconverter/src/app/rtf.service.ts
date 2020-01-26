import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from "@angular/common/http";
import { finalize } from 'rxjs/operators';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
let headers = new HttpHeaders({
  "Authorization": "Bearer"
});
@Injectable({
  providedIn: 'root'
})
export class RtfService {
  constructor(private http: HttpClient) { }

  public upload(fileName: string, fileContent: string) {
    return this.http.put("http://localhost:3000/file/upload", { name: fileName, content: fileContent })
      .toPromise()
  }
  public download(fileName: string) {
    console.log("inside service")
    return this.http.get("http://localhost:3000/file/download/" + fileName, { responseType: 'blob' })
      .toPromise()
  }
  public remove(fileName: string) {
    return this.http.delete("http://localhost:3000/file/remove/" + fileName, { responseType: "json" })
      .toPromise()
  }
}