import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import {BookingDetailEntity} from '../../Booking/BookingDetailEntity';
import { HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {BookingMasterEntity} from '../../Booking/BookingMasterEntity';
import {serviceEntity} from '../../serviceEntity/serviceEntity';
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

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { PetEntity } from 'src/app/ecommerce/Entity/PetEntity';

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

@Component({
  selector: 'app-fullcalendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './fullcalendar.component.html',
  styleUrls: ['./fullcalendar.component.scss']
})
export class FullcalendarComponent {
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
  bookPet: PetEntity = new PetEntity();
  bookMessage: string;
  bookOwner: string;
  myPet: string;
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

                  this.startDate =  item.bookingDate;
                  this.caName = item.serviceEntity.serName;
                  this.bookMessage = item.message;
                  // this.bookPet = item.petEntity;
                  // this.myPet = this.bookPet.PetName
                  // this.bookOwner = item.bookingMasterEntity.userEntity.UserID;
                  // console.log(this.bookOwner);
                  // this.bookPet = item.petEntity.PetBreed;
                  // console.log("bookowner " + JSON.stringify(this.bookOwner))
                  // this.bookPet = item.petEntity.PetName;
                  let event = {
                    start : startOfDay(this.startDate),
                    title : this.caName,
                    Message: this.bookMessage,
                    // pet: this.myPet
                  }
                  console.log(event);
                this.events.push(event);
                this.refresh.next();
                });
              }
              );

            }
        }
