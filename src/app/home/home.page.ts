/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { SlotService } from '../services/slot.service';
import { HospitalData } from '../interface/HospitalData';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private slotService: SlotService) {}
  checkedCount = 0;
  selectedState: any;
  allStates: any;
  allDistrict: any;
  district: any;
  isLoading = false;

  autoClick = false;
  ngOnInit(): void {
    const self = this;
    // this.checkSlot();
    this.getStates();
    interval(15000).subscribe(() => {
      console.log('interval ');
      if (this.autoClick) {
        this.checkSlot();
      }
    });
  }
  slotData: any;
  availabledata: any[] = [];
  availabledataAged: any[] = [];
  checking=false;
  checkSlot() {
    this.checking=true;
    const date = new Date(Date.now()).toLocaleString().split(',')[0];
    const nextWeekdate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toLocaleString()
      .split(',')[0];
    const currentDate = date.split('/').join('-');
    const nextWeekdateS = nextWeekdate.split('/').join('-');
    this.isLoading = true;
    this.autoClick = true;
    this.slotService.getTotalSlots(this.district.district_id, currentDate).subscribe(
      (data) => {
        this.checkedCount++;

        this.slotData = data;
        this.isLoading = false;
        this.findAvailableSlot();
      },
      (error) => {}
    );
    this.slotService
      .getTotalSlots(this.district.district_id, nextWeekdateS)
      .subscribe(
        (data) => {
          this.checkedCount++;

          this.slotData = data;
          this.isLoading = false;
          this.findAvailableSlot();
        },
        (error) => {}
      );
  }
  age: number;
  findAvailableSlot() {
    if (this.slotData) {
      this.slotData.centers.forEach((eachHospital: HospitalData) => {
        if (eachHospital.fee_type == 'Free') {
          eachHospital.sessions.forEach(
            (eachSession: {
              available_capacity: number;
              min_age_limit: number;
            }) => {
              if (this.age) {
                if (
                  eachSession.available_capacity > 0 &&
                  eachSession.min_age_limit == this.age
                ) {
                  this.play();
                  eachHospital.min_age_limit = eachSession.min_age_limit;
                  eachHospital.eachSession = eachSession;
                  if (this.availabledata.indexOf(eachHospital) === -1) {
                    this.availabledata.push(eachHospital);
                  }
                }
              } else {
                if (eachSession.available_capacity > 0) {
                  this.play();
                  if (this.availabledata.indexOf(eachHospital) === -1) {
                    eachHospital.min_age_limit = eachSession.min_age_limit;
                    eachHospital.eachSession = eachSession;
                    console.log(eachHospital);
                    this.availabledata.push(eachHospital);
                  }
                }
              }
            }
          );
        }
      });
    }
  }
  play() {
    const sound = '../assets/sound/closure-542.mp3';
    const audio = new Audio(sound);
    audio.play();
  }

  getStates() {
    this.slotService.getStates().subscribe(
      (data) => {
        this.allStates = data.states;
        console.log(this.allStates);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onStateSelect() {
    console.log('on', this.selectedState);
    this.slotService.getCities(this.selectedState.state_id).subscribe(
      (data) => {
        this.allDistrict = data.districts;
        console.log(this.allDistrict);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
