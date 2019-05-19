import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  // CalendarView
} from 'angular-calendar';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {JWTHeaderService} from '../../jwtheader.service';
import { Router } from '@angular/router';
import { DatingDetailEntity } from 'src/app/ecommerce/Entity/DatingDetailEntity';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

export class CalendarView{
  static Month = 'month';
  static Week = 'week';
  static Day = 'day';
}

export class myEvent implements CalendarEvent{
  id?: string | number;  start: Date;
  end?: Date;
  title: string;
  color?: import("C:/Users/Dat_Le/Desktop/Aptech/Project4/Front_End/nice-admin-angular/main/node_modules/calendar-utils/dist/calendar-utils").EventColor;
  draggable?: boolean;
  allDay?: boolean;
  cssClass?: string;
  resizable?: { beforeStart?: boolean; afterEnd?: boolean; };
  meta?: any;
  actions?: CalendarEventAction[];


}

@Component({
  selector: 'app-dating-calendar',
  templateUrl: './dating-calendar.component.html',
  styleUrls: ['./dating-calendar.component.css']
})
export class DatingCalendarComponent implements OnInit {


  @ViewChild('modalContent') modalContent: TemplateRef<any>;

 view: CalendarView = CalendarView.Month;
 // view: 'month';

 CalendarView = CalendarView;

 viewDate: Date = new Date();

 modalData: {
   action: string;
   event: CalendarEvent;
 };

 actions: CalendarEventAction[] = [
   {
     label: '<i class="fa fa-fw fa-pencil"></i>',
     onClick: ({ event }: { event: CalendarEvent }): void => {
       this.handleEvent('Edited', event);
     }
   },
   {
     label: '<i class="fa fa-fw fa-times"></i>',
     onClick: ({ event }: { event: CalendarEvent }): void => {
       this.events = this.events.filter(iEvent => iEvent !== event);
       this.handleEvent('Deleted', event);
     }
   }
 ];

 refresh: Subject<any> = new Subject();

 // events: CalendarEvent[] = [
 //   {
 //     start: subDays(startOfDay(new Date()), 1),
 //     end: addDays(new Date(), 1),
 //     title: 'A 3 day event',
 //     color: colors.red,
 //     actions: this.actions,
 //     allDay: true,
 //     resizable: {
 //       beforeStart: true,
 //       afterEnd: true
 //     },
 //     draggable: true
 //   },
 //   {
 //     start: startOfDay(new Date()),
 //     title: 'An event with no end date',
 //     color: colors.yellow,
 //     actions: this.actions
 //   },
 //   {
 //     start: subDays(endOfMonth(new Date()), 3),
 //     end: addDays(endOfMonth(new Date()), 3),
 //     title: 'A long event that spans 2 months',
 //     color: colors.blue,
 //     allDay: true
 //   },
 //   {
 //     start: addHours(startOfDay(new Date()), 2),
 //     end: new Date(),
 //     title: 'A draggable and resizable event',
 //     color: colors.yellow,
 //     actions: this.actions,
 //     resizable: {
 //       beforeStart: true,
 //       afterEnd: true
 //     },
 //     draggable: true
 //   }
 // ];

 events: CalendarEvent[] = [];

 activeDayIsOpen: boolean = true;

 urlAPI: UrlAPIEntity;
 logClass = '--Dating Calendar Component: ';
 listDatingDetail: DatingDetailEntity[] = [];

 constructor(
   private modal: NgbModal,
   private http: HttpClient,
   private jwtService: JWTHeaderService,
   private route: Router
 ) {}

 ngOnInit(): void {
   this.getListDating();
 }

 getListDating(): void{
   //prepare Url
   this.urlAPI = listUrlAPI.find(url => url.name === 'datingDetailResource');
   console.log(this.logClass + this.urlAPI.path);

   //prepare headers
   let headers = this.createHeader();

   this.http.get<DatingDetailEntity>(this.urlAPI.path, {headers : headers})
      .subscribe(
          response => {
                console.log(this.logClass + ' dating Detail');
                console.log(this.logClass + JSON.stringify(response));
                this.listDatingDetail = JSON.parse(JSON.stringify(response));
                this.listDatingDetail.forEach(
                      item => {
                            //class myEvent duoc khai bao tren phan dau cua file
                            let tempEvent: myEvent = new myEvent();
                            tempEvent.title = item.petRequestEntity.petName + '&'+ item.petRecieveEntity.petName;
                            tempEvent.start = new Date(item.datingDate);
                            tempEvent.color = colors.yellow;
                            tempEvent.actions = this.actions;
                            //push event vao trong danh sach event cua calendar
                            this.events.push(tempEvent);

                      }
                );
          }
      );

 }

 dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
   if (isSameMonth(date, this.viewDate)) {
     this.viewDate = date;
     if (
       (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
       events.length === 0
     ) {
       this.activeDayIsOpen = false;
     } else {
       this.activeDayIsOpen = true;
     }
   }
 }

 eventTimesChanged({
   event,
   newStart,
   newEnd
 }: CalendarEventTimesChangedEvent): void {
   this.events = this.events.map(iEvent => {
     if (iEvent === event) {
       return {
         ...event,
         start: newStart,
         end: newEnd
       };
     }
     return iEvent;
   });
   this.handleEvent('Dropped or resized', event);
 }

 handleEvent(action: string, event: CalendarEvent): void {
   this.modalData = { event, action };
   this.modal.open(this.modalContent, { size: 'lg' });
 }

 addEvent(): void {
   this.events = [
     ...this.events,
     {
       title: 'New event',
       start: startOfDay(new Date()),
       end: endOfDay(new Date()),
       color: colors.red,
       draggable: true,
       resizable: {
         beforeStart: true,
         afterEnd: true
       }
     }
   ];
 }

 deleteEvent(eventToDelete: CalendarEvent) {
   this.events = this.events.filter(event => event !== eventToDelete);
 }

 setView(view: CalendarView) {
   this.view = view;
 }

 closeOpenMonthViewDay() {
   this.activeDayIsOpen = false;
 }

 createHeader():HttpHeaders {
   let headers = new HttpHeaders();
   headers = headers.set('Content-Type', 'application/json; charset=utf-8');
   headers = headers.set('Authorization', 'Bearer ' + this.jwtService.getJWT());
   return headers;
 }

}
