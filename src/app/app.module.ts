import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { QueryInputComponent } from "./query-input/query-input.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { createCustomElement } from "@angular/elements";
import { environment } from "./../environments/environment";
import { Injector } from "@angular/core";
import {
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatNativeDateModule
} from "@angular/material";

@NgModule({
  declarations: [AppComponent, QueryInputComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [],
  entryComponents: [AppComponent, QueryInputComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}
  ngDoBootstrap() {
    // don't bootstrap AppComponent if in production
    // development will bootstrap AppComponent, which references the component
    // production will bootstrap custom element

    if (environment.production) {
      const el = createCustomElement(QueryInputComponent, {
        injector: this.injector
      });
      customElements.define("query-input", el);
    } else if (!environment.production) {
      const appRootEl = createCustomElement(AppComponent, {
        injector: this.injector
      });
      customElements.define("app-root", appRootEl);
    }
  }
}
