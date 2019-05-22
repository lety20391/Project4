import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { UrlAPIEntity } from 'src/app/UrlAPIEntity';
import { BookingDetailEntity } from 'src/app/Booking/BookingDetailEntity';
import { CalendarEvent } from 'calendar-utils';
import { CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { isSameMonth, isSameDay, addHours } from 'date-fns';
import { listUrlAPI } from 'src/app/listUrlAPI';

@Component({
  selector: 'app-service-calendar',
  templateUrl: './service-calendar.component.html',
  styleUrls: ['./service-calendar.component.css']
})
export class ServiceCalendarComponent implements OnInit {

  urlAPI : UrlAPIEntity;
  logClass: "full calendar log";
  listBM: BookingDetailEntity[] ;

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view = 'month';
  eventToAdd: CalendarEvent[] = [ ];
  viewDate: Date = new Date();
  // --------event data---------
  startDate: string;
  caName: string;
  bookPet: string;
  bookMessage: string;
  bookOwner: string;
  myPet: string;
  bookPhone: string;
  Status: string;
  // --------end----------------
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil text-white"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times  text-white"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
  ]  ;


  activeDayIsOpen = false;

  constructor(
    private modal: NgbModal,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getBMListFromServer();

  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    // event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(event): void {
    this.events.push(event)
      // =
    //   {title: event.name,
    //   start: event.start,
    //   // end: endOfDay(new Date()),
    //   // color: event.colors.green
    //   // draggable: true,
    //   // resizable: {
    //   //   beforeStart: true,
    //   //   afterEnd: true
    //   // }
    // });
    this.refresh.next();
  }
  bookingDate : string;
    getBMListFromServer(): void{
      // console.log(this.logClass + " init");
        this.urlAPI = listUrlAPI.find(url => url.name === 'bookingDetailResource');
        console.log(this.logClass + this.urlAPI.path);

        this.http.get<HttpResponse<BookingDetailEntity[]>>(this.urlAPI.path + "/getAll",  { observe: 'response' })
          .subscribe(
            response => {
              // item.bookingMasterEntity = new BookingMasterEntity();
              // item.bookingMasterEntity.userEntity = new UserEntity();

              this.listBM = JSON.parse(JSON.stringify(response.body));
                  this.listBM.forEach( item  =>
                    {
                  console.log(item);
                  // item = new BookingDetailEntity();
                  console.log(item.bookingDate);
                  // let currentDate = item.bookingDate;
                  // let stringDate = '';
                  // stringDate = formatDate(currentDate, 'yyyy-MM-dd', 'en-US') + 'T' + formatDate(currentDate, 'hh:mm:ss', 'en-US');
                  // console.log( "date: " + stringDate);
                  this.startDate =  item.bookingDate;
                  console.log("time is: " + this.startDate);
                  this.caName = item.serviceEntity.serName;
                  this.bookMessage = item.message;
                  this.bookPet = item.petEntity.petName;
                  this.myPet = item.petEntity.petBreed;
                  this.bookOwner = item.bookingMasterEntity.userEntity.userName;
                  this.bookPhone = item.bookingMasterEntity.userEntity.userTel;
                  
                  // console.log("this is pet: " + this.bookPet + item.petEntity.petName);
                  // this.myPet = this.bookPet.PetName
                  // this.bookOwner = item.bookingMasterEntity.userEntity.UserID;
                  // console.log(this.bookOwner);
                  // this.bookPet = item.petEntity.PetBreed;
                  // console.log("bookowner " + JSON.stringify(this.bookOwner))
                  // this.bookPet = item.petEntity.PetName;
                  let event = {
                    start : addHours((this.startDate),0),
                    // start: startOfDay((item.bookingDate)),
                    // end: endOfDay(this.startDate),
                    title : this.caName + " for " + this.myPet,
                    PetName: this.bookPet,
                    PetBreed : this.myPet,
                    Message: this.bookMessage,
                    PetOwner: this.bookOwner,
                    Phone: this.bookPhone,

                  }
                  console.log("start: " + JSON.stringify(event.start))
                  console.log(event);
                this.events.push(event);
                this.refresh.next();
                });
              }
              );

            }

}
