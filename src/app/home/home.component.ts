import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)


@Component({
  selector: 'app-home',
  imports: [DatePipe, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  userName: string = "";
  totalDues: number = 0;
  unPaid: number = 0;
  paid: number = 0;
  mytotalDues: number = 0;
  myunPaid: number = 0;
  mypaid: number = 0;
  complaintCount: number = 0;
  notices: any;
  visitors: any;
  billsdata: any[] = [];
  mybillsdata: any[] = [];
  role: string = ""
  societyId: number = 0;

  totalNumberBooking: any = {}
  paymentsChartDisplay : boolean = false;
  mypaymentsChartDisplay : boolean = false;
  complaintsChartDisplay : boolean = false;
  bookingsChartDisplay : boolean = false;

  data: any
  data2: any
  data3: any
  data4: any
  data5: any
  data6: any
  data7: any


  config: any;
  config2: any;
  config3: any;
  config4: any;
  config5: any;
  config6: any;
  config7: any;

  chart: any;
  chart2: any;
  chart3: any;
  chart4: any;
  chart5: any;
  chart6: any;
  chart7: any;

  constructor(private ServiceSrv: ServiceService) {
    this.userName = this.ServiceSrv.getUserName();
    this.role = this.ServiceSrv.getRole();
    this.societyId = this.ServiceSrv.getSocietyId();


   
    if (this.role == "Admin") {
      this.ServiceSrv.GetMyBills(this.userName).subscribe({

      next: (data: any) => {
        this.mybillsdata = data;
        console.log(data);
        this.mybillsdata.forEach(bill => {
          if (bill.isPaid) {
            this.mypaid += bill.amount;
          } else {
            this.myunPaid += bill.amount;
          }
        });
        console.log(this.mypaid);
        console.log(this.myunPaid);
        this.mytotalDues = this.unPaid + this.mypaid


        this.data7 = {
          labels: [
            'Paid Amount ',
            'UnPaid Amount '
          ],
          datasets: [{
            // data: [50, 24, 26],
            data: [
              this.mypaid,
              this.myunPaid
            ],
            backgroundColor: [
              'rgb(54, 162, 235)',
              'rgb(255, 99, 132)',
            ],
            hoverOffset: 4
          }]
        };

        this.config7 = {
          type: 'pie',
          data: this.data7,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }
        };
        const mypaymentvalue = this.data7.datasets[0].data[0]+this.data7.datasets[0].data[1];
        if(mypaymentvalue == 0){
          this.mypaymentsChartDisplay = false;
        }else{
          this.chart7 = new Chart('MyChart7', this.config7)
          this.mypaymentsChartDisplay = true;
        }
        console.log(this.mypaymentsChartDisplay);
        
      },
      error: (error) => {
        console.error(error);
      }
    })


       this.ServiceSrv.GetAllBills(this.societyId).subscribe({

      next: (data: any) => {
        this.billsdata = data;
        console.log(data);
        this.billsdata.forEach(bill => {
          if (bill.isPaid) {
            this.paid += bill.amount;
          } else {
            this.unPaid += bill.amount;
          }
        });
        console.log(this.paid);
        console.log(this.unPaid);
        this.totalDues = this.unPaid + this.paid


        this.data6 = {
          labels: [
            'Paid Amount ',
            'UnPaid Amount '
          ],
          datasets: [{
            // data: [50, 24, 26],
            data: [
              this.paid,
              this.unPaid
            ],
            backgroundColor: [
              'rgb(54, 162, 235)',
              'rgb(255, 99, 132)',
            ],
            hoverOffset: 4
          }]
        };

        this.config6 = {
          type: 'pie',
          data: this.data6,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }
        };
        const paymentvalue = this.data6.datasets[0].data[0]+this.data6.datasets[0].data[1];
        if(paymentvalue == 0){
          this.paymentsChartDisplay = false;
        }else{
          this.chart6 = new Chart('MyChart6', this.config6)
          this.paymentsChartDisplay = true;
        }
        console.log(this.paymentsChartDisplay);
        
      },
      error: (error) => {
        console.error(error);
      }
    })
      this.ServiceSrv.TotalComplaints(this.societyId).subscribe({
        next: (data: any) => {
          this.complaintCount = data;
       
      this.ServiceSrv.TotalCompletedComplaints(this.societyId).subscribe({
        next: (data: any) => {
          this.data2 = {
            labels: [
              'UnCompleted Complaint ',
              'Completed Complaint '
            ],
            datasets: [{
              data: [
                this.complaintCount,
                data
              ],
              backgroundColor: [
                'rgb(158, 72, 72)',
                'rgb(109, 208, 96)'
              ],
              hoverOffset: 4
            }]
          };

          this.config2 = {
            type: 'pie',
            data: this.data2,
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom'
                }
              }
            }
          };
          const paymentvalue = this.data2.datasets[0].data[0]+this.data2.datasets[0].data[1];
          if(paymentvalue == 0){
            this.complaintsChartDisplay = false;
          }else{
          this.chart2 = new Chart('MyChart2', this.config2)
          this.complaintsChartDisplay = true;
        }
          
        },
        error: (error) => {
          console.error(error);
        }
      })
       },
        error: (error) => {
          console.error(error);
        }
      })

      this.ServiceSrv.AdminTotalNumberBookings(this.societyId).subscribe({
        next: (data: any) => {
          console.log(data);

          this.totalNumberBooking = data;
          this.data4 = {
            labels: [
              'Pending Booking ',
              'Approved Booking ',
              'Rejected Booking '
            ],
            datasets: [{
              data: [
                data.Pending,
                data.Approved,
                data.Rejected
              ],
              backgroundColor: [
                'rgb(147, 206, 201)',
                'rgb(66, 127, 58)',
                'rgb(177, 100, 100)'
              ],
              hoverOffset: 4
            }]
          };

          this.config4 = {
            type: 'pie',
            data: this.data4,
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom'
                }
              }
            }
          };
          const paymentvalue = this.data4.datasets[0].data[0]+this.data4.datasets[0].data[1]+this.data4.datasets[0].data[2];
          if(paymentvalue == 0){
            this.bookingsChartDisplay = false;
          }else{
            this.bookingsChartDisplay = true;
            this.chart4 = new Chart('MyChart4', this.config4)
        }
        },
        error: (error) => {
          console.error(error);
        }
      })

    }
    else {
       this.ServiceSrv.GetMyBills(this.userName).subscribe({

      next: (data: any) => {
        this.billsdata = data;
        console.log(data);
        this.billsdata.forEach(bill => {
          if (bill.isPaid) {
            this.paid += bill.amount;
          } else {
            this.unPaid += bill.amount;
          }
        });
        console.log(this.paid);
        console.log(this.unPaid);
        this.totalDues = this.unPaid + this.paid


        this.data = {
          labels: [
            'Paid Amount ',
            'UnPaid Amount '
          ],
          datasets: [{
            // data: [50, 24, 26],
            data: [
              this.paid,
              this.unPaid
            ],
            backgroundColor: [
              'rgb(54, 162, 235)',
              'rgb(255, 99, 132)',
            ],
            hoverOffset: 4
          }]
        };

        this.config = {
          type: 'pie',
          data: this.data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }
        };
        console.log(this.data.datasets[0].data[0]+this.data.datasets[0].data[1]);
        const paymentvalue =this.data.datasets[0].data[0]+this.data.datasets[0].data[1];
        if(paymentvalue == 0){
          this.paymentsChartDisplay = false;
        }else{
          this.chart = new Chart('MyChart', this.config)
          this.paymentsChartDisplay = true;
        }

      },
      error: (error) => {
        console.error(error);
      }
    })
      this.ServiceSrv.MyComplaintsNumber(this.userName).subscribe({
        next: (data: any) => {
          this.complaintCount = data;
       
      this.ServiceSrv.MyCompletedComplaintsNumber(this.userName).subscribe({
        next: (data: any) => {
          console.log(this.complaintCount);

          this.data3 = {
            labels: [
              'UnCompleted Complaint ',
              'Completed Complaint '
            ],
            datasets: [{
              data: [
                this.complaintCount,
                data
              ],
              backgroundColor: [
                'rgb(158, 72, 72)',
                'rgb(109, 208, 96)'
              ],
              hoverOffset: 4
            }]
          };

          this.config3 = {
            type: 'pie',
            data: this.data3,
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom'
                }
              }
            }
          };
          const paymentvalue =this.data3.datasets[0].data[0]+this.data3.datasets[0].data[1];
          if(paymentvalue == 0){
            this.complaintsChartDisplay = false;
          }else{
            this.complaintsChartDisplay = true;
            this.chart3 = new Chart('MyChart3', this.config3)
        }
        },
        error: (error) => {
          console.error(error);
        }
      })
       },
        error: (error) => {
          console.error(error);
        }
      })

      this.ServiceSrv.MyTotalNumberBookings(this.userName).subscribe({
        next: (data: any) =>{
          console.log(data);
          
          this.totalNumberBooking = data;
          this.data5 = {
            labels: [
              'Pending Booking ',
              'Approved Booking ',
              'Rejected Booking '
            ],
            datasets: [{
              data: [
                data.Pending,
                data.Approved,
                data.Rejected
              ],
              backgroundColor: [
                'rgb(147, 206, 201)',
                'rgb(66, 127, 58)',
                'rgb(177, 100, 100)'
              ],
              hoverOffset: 4
            }]
          };

          this.config5 = {
            type: 'pie',
            data: this.data5,
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom'
                }
              }
            }
          };
          const paymentvalue =this.data5.datasets[0].data[0]+this.data5.datasets[0].data[1]+this.data5.datasets[0].data[2];
          if(paymentvalue == 0){
            this.bookingsChartDisplay = false;
          }else{
            this.bookingsChartDisplay = true;
            this.chart5 = new Chart('MyChart5', this.config5)
        }
        },
        error: (error) =>{
          console.error(error);
        }
      })
    }

    this.ServiceSrv.GetOneNotice(this.societyId).subscribe({
      next: (data: any) => {
        this.notices = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    })

    this.ServiceSrv.GetOneVisitors(this.societyId).subscribe({
      next: (data: any) => {
        this.visitors = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    })

    console.log(this.userName);




  }
  ngOnInit() {

  }

}
