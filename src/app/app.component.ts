import {Component, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import { AnalyticsService } from './services/analytics/analytics.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
  title = 'kasi-detectives-CMS'; 
  reason = '';
  array = []
  numUserIncidents
  numPlaceIncidents = []
  currentYearReports = []
  constructor(public analyticsService : AnalyticsService){
    this.fetchUserReports()
  }
  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }
  fetchUserReports(){
    this.analyticsService.getUserReports().then(data => {
      console.log(data);
      let userReports = data
      let number = 0
      let addnew = true
      for(let key in userReports){
        console.log(key);
        console.log(Object.values(userReports[key]));
        let info: Array<any> = Object.values(userReports[key])
        console.log(info);
        
        for(let i=0; i<info.length; i++){
          
          console.log(info[i]);
          this.array.push({
            place: key,
            details: info[i]
          })
        }
        this.numPlaceIncidents.push({
          place: key,
          numberOfReports: info.length
        })
      }
      // let number = 0
      console.log(this.array);
      for(let x = 0; x < this.array.length; x++){
        console.log('rererererererererre');
        if(this.currentYearReports.length = 0){
          console.log('aading');
          
          this.currentYearReports.push({
            year: this.array[x].details.year,
            numberOfReports: number
          })
        }
        
        for(let y = 0; y < this.currentYearReports.length; y++){
          if(this.array[x].details.year !== this.currentYearReports[y].year){
            
            addnew = true
            console.log(addnew);
            
          }
          if(this.array[x].details.year === this.currentYearReports[y].year){
            
            addnew = false
            console.log(addnew);
          }
        }
        for(let y = 0; y < this.currentYearReports.length; y++){
          if(addnew === true){
            this.currentYearReports.push({
              year: this.array[x].details.year,
              numberOfReports: number
            })
          } else {
            this.currentYearReports[y].numberOfReports = (number + 1)
          }
        }

        
        
        
      }

      
      console.log(this.array);
      console.log(this.numPlaceIncidents);
      
      this.numUserIncidents = this.array.length
        console.log(this.numUserIncidents + ' reported user incidents')
        console.log();
        console.log(this.currentYearReports);
        
        
        
      
    })


  }
  
}
