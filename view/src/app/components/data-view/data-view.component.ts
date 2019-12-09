import { sens_data } from './../../shared/data/sens_data.model';
import { Component, OnInit } from '@angular/core';
import * as $ from 'node_modules/jquery';
import { DataService } from './../../shared/data/data.service';
import { Router } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

declare var M: any;
@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css'],
  providers: [DataService]
})


export class DataViewComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router) { }
  // searchValue: '';
  // tslint:disable-next-line:variable-name
  // sens_data = this.dataService.selectedData;
  searchValue: string = '';
  dataMnDetails = this.dataService.selectedData;
  SData ;
  snsData = new sens_data();
  SD = [];

  faDownload = faDownload;
  ngOnInit() {
    this.refreshProfileList();
    this.dataService.getAllData().subscribe(
      // tslint:disable-next-line:no-string-literal
      data => { this.SData = data['sens_data'];
                // tslint:disable-next-line:only-arrow-functions
                data['sens_data'].forEach(element => {
                  this.SD.push(element);
                  // alert(this.SD);
                });
                this.SData = this.SD;
              },
             err => console.error(err),
             () => console.log('completed')
      // res => {
      //   // this.SData = res['sens_data'];
      //   // this.sens_data = this.dataService.selectedData;
      //   // alert(this.dataService.selectedData);
      // },
      // err => {console.log(err);
      // }
    );

    // this.resetForm();
    // this.refreshProfileList();
    $(document).ready(function() {
      $('.filterable .btn-filter').click(function() {
        var $panel = $(this).parents('.filterable'),
        $filters = $panel.find('.filters input'),
        $tbody = $panel.find('.table tbody');
        if ($filters.prop('disabled') == true) {
            $filters.prop('disabled', false);
            $filters.first().focus();
        } else {
            $filters.val('').prop('disabled', true);
            $tbody.find('.no-result').remove();
            $tbody.find('tr').show();
        }
    });

      $('.filterable .filters input').keyup(function(e) {
      /* Ignore tab key */
      var code = e.keyCode || e.which;
      if (code == 9) return;
        /* Useful DOM data and selectors */
      // tslint:disable-next-line:no-var-keyword
      var $input = $(this),
        inputContent = $input.val().toString().toLowerCase(),
        $panel = $input.parents('.filterable'),
        column = $panel.find('.filters th').index($input.parents('th')),
        $table = $panel.find('.table'),
        $rows = $table.find('tbody tr');
        /* Dirtiest filter function ever ;) */
      var $filteredRows = $rows.filter(function() {
            var value = $(this).find('td').eq(column).text().toLowerCase();
            return value.indexOf(inputContent) === -1;
      });
      /* Clean previous no-result if exist */
      $table.find('tbody .no-result').remove();
      /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
      $rows.show();
      $filteredRows.hide();
      /* Prepend no-result row if all rows are filtered */
      if ($filteredRows.length === $rows.length) {
          $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="'+ $table.find('.filters th').length +'">No result found</td></tr>'));
      }
    });
});


    function resizeDiv() {
      // var vpw = $(window).width();
      // var vph = $(window).height();
      // $('.profile-body').css({ 'height': vph + 30 + 'px'});
      // $('.profile-body').css({ 'width': vpw - 30 + 'px'});
      }

  }

  resetForm(form?: NgForm) {
    // if (form) {
    //   form.reset();
    // }
    // this.dataService.selectedData = {
    //   id: '',
    //   sensName: '',
    //   date: '',
    //   time: ''
    // };
    // this.searchValue = '';
  }

  onSubmit(form: NgForm) {
    if (form.value._id === '') {
      this.dataService.postData(form.value).subscribe((res) => {
        // this.resetForm(form);
        // this.refreshProfileList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    } else {
      this.dataService.putData(form.value).subscribe((res) => {
        // this.resetForm(form);
        // this.refreshProfileList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshProfileList() {
    this.dataService.getAllData().subscribe((res) => {
      // this.dataDetails = res['sens_data'];
      // this.dataService.selectedData = res['sens_data'];
      // alert(this.dataService.selectedData.sensName);

    });
  }

  onEdit(emp: sens_data) {
    this.dataMnDetails = emp;
    this.dataService.selectedData = emp;
  }

  // tslint:disable-next-line:variable-name
  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.dataService.deleteData(_id).subscribe((res) => {
        // this.refreshProfileList();
        // this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
