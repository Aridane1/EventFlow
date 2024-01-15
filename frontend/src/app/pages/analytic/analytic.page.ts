import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';
@Component({
  selector: 'app-analytic',
  templateUrl: './analytic.page.html',
  styleUrls: ['./analytic.page.scss'],
})
export class AnalyticPage implements OnInit {
  constructor(private reportsService: ReportsService) {}

  ngOnInit() {}

  generateReport() {
    this.reportsService.fetchReportData().subscribe(
      (data) => {
        console.log('Datos del informe:', data);
      },
      (error) => {}
    );
  }
}
