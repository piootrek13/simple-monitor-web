import { HttpClient } from '@angular/common/http';
import { Conditional } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map, Subscription, throwError, timer } from 'rxjs';
import { Device, DeviceService } from '../../services/device.service';
import { EmailSubscription, EmailSubscriptionService } from '../../services/email-subscription.service';
import { GroupDialogComponent } from '../../dialogs/group-dialog/group-dialog.component';
import { RemoveDialogComponent } from '../../dialogs/remove-dialog/remove-dialog.component';
import { SubscriptionGroup, SubscriptionGroupService } from '../../services/subscription-group.service';
import { EmailSubDialogComponent } from 'src/app/dialogs/email-sub-dialog/email-sub-dialog.component';
import { SendEmailDialogComponent } from 'src/app/dialogs/send-email-dialog/send-email-dialog.component';
import { EmailService } from 'src/app/services/email.service';
import { LoadingData, LoadingDialogComponent } from 'src/app/dialogs/loading-dialog/loading-dialog.component';
import { EventService, DeviceEvent } from 'src/app/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  static readonly MODE_NEW = 1;
  static readonly MODE_EDIT = 2;
  static readonly MODE_SUBSCRIPTION = 3;
  static readonly MODE_HISTORY = 4;
  mode = HomeComponent.MODE_HISTORY;
  viewedDevice = new Device();
  editedDevice = new Device();
  deviceService: DeviceService;
  subscriptionGroupService: SubscriptionGroupService;
  emailSubscriptionService: EmailSubscriptionService;
  emailService: EmailService;
  eventService: EventService;
  checkSubscription: Subscription = new Subscription;
  devices: Device[] = [];
  checkingStates = false;
  alertCount = 0;
  alerting=false;
  subscriptionGroups: SubscriptionGroup[] = [];
  viewedSubscriptions: EmailSubscription[] = [];
  viewedEvents: DeviceEvent[] = [];
  constructor(private httpClient: HttpClient, private dialog: MatDialog) {
    this.deviceService = new DeviceService(httpClient);
    this.subscriptionGroupService = new SubscriptionGroupService(httpClient);
    this.emailSubscriptionService = new EmailSubscriptionService(httpClient);
    this.emailService = new EmailService(httpClient);
    this.eventService = new EventService(httpClient);
   }
  ngOnDestroy(): void {
    this.checkSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.checkSubscription = timer(0, 1000).pipe( 
      map(() => { 
        if(!this.checkingStates) this.checkStates(); 
        this.checkingStates = true;
      }) 
    ).subscribe();
    this.showHistory();
  }
  checkDiffrence(ds: Device[]): boolean{

    if(ds.length!=this.devices.length) return false;
    for(let i=0; i<this.devices.length; i++){
      if(ds[i].name != this.devices[i].name ||
        ds[i].counter != this.devices[i].counter ||
        ds[i].id != this.devices[i].id ||
        ds[i].ip != this.devices[i].ip ||
        ds[i].active != this.devices[i].active ||
        ds[i].silenced != this.devices[i].silenced ||
        ds[i].state != this.devices[i].state ||
        ds[i].subscriptionGroup != this.devices[i].subscriptionGroup) return false;
    }
    return true; 
  }
  newData(data:Device[]){
    
    data = this.sortDevices(data);
    if(!this.checkDiffrence(data)){
      this.devices = data;
      this.setAlertCount();
      this.refreshViewedEvents(this.viewedDevice.id);

      
    }
  }
  checkStates(){
    this.deviceService.getDevices().pipe(
      catchError(error => { 
        this.checkingStates=false;
        return throwError(error); 
      })
    ).subscribe(
      data=>{
        this.newData(data);
        this.checkingStates = false;
      }
    );
  }
  setAlertCount(){
    this.alertCount = 0;
    this.alerting=false;
    this.devices.forEach(d=>{
      if(d.state!=0 && d.active){
        this.alertCount++;
        if(!d.silenced){
           this.alerting = true;
        }
      }
    });
  }
  save(device: Device){
    this.checkingStates = true;

    let request;
    if(device.id>0) request = this.deviceService.editDevice(device);
    else request = this.deviceService.addDevice(device);    
    request.pipe(
      catchError(error => { 
        this.checkingStates=false;
        return throwError(error); 
      })
    ).subscribe(
      data=>{
        this.newData(data);
        this.checkingStates = false;
      }
    );
    this.mode = HomeComponent.MODE_HISTORY;

  }
  remove(device: Device){
    const dialogRef = this.dialog.open(RemoveDialogComponent, {data:{name: device.name}});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.checkingStates = true;
        this.deviceService.removeDevice(device.id).pipe(
          catchError(error => { 
            this.checkingStates=false;
            return throwError(error); 
          })
        ).subscribe(
          data=>{
            this.newData(data);
            this.checkingStates = false;
          }
        );
        this.mode = HomeComponent.MODE_HISTORY;
      }
    });
  }
  setHistoryMode(){
    
    this.mode = HomeComponent.MODE_HISTORY;

  }
  setNewMode(){
    this.mode = HomeComponent.MODE_NEW;
    this.editedDevice = new Device();
    this.refreshSubscriptionGroup();
  }
  setSubscriptionsMode(){
    this.mode = HomeComponent.MODE_SUBSCRIPTION;
  }
  setEditMode(device: Device){    
    this.mode = HomeComponent.MODE_EDIT;
    this.editedDevice = new Device();
    this.editedDevice.id = device.id;
    this.editedDevice.counter = device.counter;
    this.editedDevice.ip = device.ip;
    this.editedDevice.name = device.name;
    this.editedDevice.state = device.state;
    this.editedDevice.silenced = device.silenced;
    this.editedDevice.active = device.active;
    this.editedDevice.subscriptionGroup = device.subscriptionGroup;
    this.refreshSubscriptionGroup();
  }
  setSilenced(device: Device){
    this.checkingStates=true;
    this.deviceService.setSilenced(device.id, device.silenced).pipe(
      catchError(error => { 

        this.checkingStates=false;
        return throwError(error); 
      })
    ).subscribe(
      data=>{
        this.newData(data);
        this.setAlertCount();
        this.checkingStates = false;
      }
    );
  }
  refreshSubscriptionGroup(){
    this.subscriptionGroupService.getGroups().pipe(
      catchError(error => { 
                return throwError(error); 
      })
    ).subscribe(
      data=>{
        this.subscriptionGroups = data;
      }
    );
  }
  openGroupDialog(){
    const dialogRef = this.dialog.open(GroupDialogComponent,  {data:{groups: this.subscriptionGroups}});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.subscriptionGroupService.postGroup(result).pipe(
          catchError(error => { 
                    return throwError(error); 
          })
        ).subscribe(
          data=>{
            this.subscriptionGroups = data;
          }
        );
      }
    });
  }
  refreshEmailSubs(group: any){
    this.emailSubscriptionService.getSubsByGroup(group).pipe(
      catchError(error => { 
                return throwError(error); 
      })
    ).subscribe(
      data=>{
        this.viewedSubscriptions = data;
      }
    );
  }
  openEmailSubDialog(emailSubscription: any){
    const dialogRef = this.dialog.open(EmailSubDialogComponent, {data:{emailSubscription: emailSubscription}});
    dialogRef.afterClosed().subscribe(result => {
      if(result){        
        this.emailSubscriptionService.post(result).pipe(
          catchError(error => { 
                    return throwError(error); 
          })
        ).subscribe(
          data=>{
            this.viewedSubscriptions = data;
          }
        );
      }
    });
  }

  editEmailSubscription(emailSubscription: any){
    const dialogRef = this.dialog.open(EmailSubDialogComponent, {data:{emailSubscription: emailSubscription}});
    dialogRef.afterClosed().subscribe(result => {
      if(result){        
        this.emailSubscriptionService.put(result).pipe(
          catchError(error => { 
                    return throwError(error); 
          })
        ).subscribe(
          data=>{
            this.viewedSubscriptions = data;
          }
        );
      }
    });
  }

  removeEmailSubscription(emailSubscription: EmailSubscription){
    const dialogRef = this.dialog.open(RemoveDialogComponent, {data:{name: emailSubscription.name}});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.checkingStates = true;
        this.emailSubscriptionService.delete(emailSubscription.id).pipe(
          catchError(error => { 
            this.checkingStates=false;
            return throwError(error); 
          })
        ).subscribe(
          data=>{
            this.viewedSubscriptions = data;
          }
        );
      }
    });
  }

  sendTestMail(to: any){
    const dialogRef = this.dialog.open(SendEmailDialogComponent, {data:{to: to}});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let loadingData = new LoadingData();
        loadingData.title="e-mail";
        loadingData.text="wysyłanie...";
        this.openLoading(loadingData);
        this.emailService.post(result).pipe(
          catchError(error => { 
            loadingData.text = "Błąd wysyłania wiadomości";
            loadingData.state = -1;
            return throwError(error); 
          })
        ).subscribe(
          data=>{
            loadingData.text = "Wysłano wiadomość";
            loadingData.state = 1;
          }
        );     
      }
    });
  }
  openLoading(loadingData: LoadingData){
    const dialogRef = this.dialog.open(LoadingDialogComponent, {data:{loadingData: loadingData}});
    dialogRef.afterClosed().subscribe(result => {
      if(result){ 
      }
    });
  }
  showHistoryOfDevice(device: any){
    this.viewedDevice = device;
    this.mode=HomeComponent.MODE_HISTORY;
    this.refreshViewedEvents(device.id)
  }
  showHistory(){
    let device = new Device();
    device.id = -1;
    this.showHistoryOfDevice(device);
  }
  refreshViewedEvents(device: any){
    this.viewedEvents = [];
    this.eventService.getEventsByDevice(device).pipe(
      catchError(error => { 
        return throwError(error); 
      })
    ).subscribe(
      data=>{
        this.viewedEvents = data;        
      }
    );
    
  }
  sortDevices(devsToSort: Device[]): Device[]{
    let alertDevices: Device[] = [];
    let okDevices: Device[] = [];
    for(let d of devsToSort){
      if(d.state==0) okDevices.push(d);
      else alertDevices.push(d);
    }
    let devices = [];
    devices.push(...alertDevices);
    devices.push(...okDevices);
    return devices;
  }

}
