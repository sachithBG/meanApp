import { Component, OnInit } from '@angular/core';
import * as $ from 'node_modules/jquery';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function() {
      resizeDiv();
      function resizeDiv() {
        // var vpw = $(window).width();
        // var vph = $(window).height();
        // $('.profile').css({ 'height': (vph * 1.8) + 'px'});
        // $('.profile').css({ 'width': (vpw) * 1.5 + 'px'});
        }
    });
  }

}
