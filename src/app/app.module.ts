import { NgModule} from '@angular/core';
import { FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule} from '@angular/material/menu';
import { MatDialogModule} from '@angular/material/dialog';
import { MatIconModule} from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatBadgeModule} from '@angular/material/badge';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatTabsModule} from '@angular/material/tabs';
import { MatSelectModule} from '@angular/material/select';
import { MatListModule} from '@angular/material/list';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DevicePanelComponent } from './components/device-panel/device-panel.component';
import { HttpClient } from '@angular/common/http';
import { DeviceEditPanelComponent } from './components/device-edit-panel/device-edit-panel.component';
import { RemoveDialogComponent } from './dialogs/remove-dialog/remove-dialog.component';
import { SubscriptionPanelComponent } from './components/subscription-panel/subscription-panel.component';
import { GroupDialogComponent } from './dialogs/group-dialog/group-dialog.component';
import { EmailSubDialogComponent } from './dialogs/email-sub-dialog/email-sub-dialog.component';
import { SendEmailDialogComponent } from './dialogs/send-email-dialog/send-email-dialog.component';
import { LoadingDialogComponent } from './dialogs/loading-dialog/loading-dialog.component';
import { HistoryPanelComponent } from './components/history-panel/history-panel.component';
import { PaginatorConfig } from './configurations/PaginatorConfig';
import { AppInfoDialogComponent } from './dialogs/app-info-dialog/app-info-dialog.component';
const routes: Routes = [
  {path: '', component: HomeComponent},
 ];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DevicePanelComponent,
    DeviceEditPanelComponent,
    RemoveDialogComponent,
    SubscriptionPanelComponent,
    GroupDialogComponent,
    EmailSubDialogComponent,
    SendEmailDialogComponent,
    LoadingDialogComponent,
    HistoryPanelComponent,
    AppInfoDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatBadgeModule,
    MatDialogModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatInputModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    HttpClientModule,
    MatCheckboxModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {provide: MatPaginatorIntl, useValue: PaginatorConfig()},
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
