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
import { MatBadgeModule} from '@angular/material/badge';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatTabsModule} from '@angular/material/tabs';
import { MatSelectModule} from '@angular/material/select';
import { MatListModule} from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DevicePanelComponent } from './device-panel/device-panel.component';
import { HttpClient } from '@angular/common/http';
import { DeviceEditPanelComponent } from './device-edit-panel/device-edit-panel.component';
import { RemoveDialogComponent } from './remove-dialog/remove-dialog.component';
import { SubscriptionPanelComponent } from './subscription-panel/subscription-panel.component';
import { GroupDialogComponent } from './group-dialog/group-dialog.component';
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
    GroupDialogComponent
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
    MatSelectModule,
    MatTabsModule,
    HttpClientModule,
    MatCheckboxModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
