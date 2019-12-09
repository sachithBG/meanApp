import { Component, OnInit } from '@angular/core';
import * as $ from 'node_modules/jquery';
import { faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { User } from './../../shared/user.model';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [UserService]
})
export class NavBarComponent implements OnInit {

  faBell = faBell;
  faEnvelope = faEnvelope;
  userDetails = new User();
  faSignOutAlt = faSignOutAlt;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {console.log(err); }
    );
    'use strict';

    /*=================================*/
    /* mobilemenu-trigger */
    /*=================================*/

    let windowWidth = $(window).width();

    if (windowWidth <= 767) {
      $('#main-navigation li.menu-item-has-children').prepend('<span class="fa fa-angle-down"></span>');
      $('#main-navigation li.menu-item-has-children ul').hide();
      $('#main-navigation li.menu-item-has-children span.fa-angle-down').on('click', function() {
        $(this).siblings('#main-navigation li.menu-item-has-children ul').slideToggle(500);
      });
    }
    // resizeDiv();
    function resizeDiv() {
      let vpw = $(window).width();
      let vph = $(window).height();
      $('.main-header').css({'height': vph + 30 + 'px'});
      }

    /*====================================
    // menu-fix
    ======================================*/

    $(window).on('scroll', function() {
      if ($(this).scrollTop() > 100) {
        $('.menu').addClass("affix");
      } else {
        $('.menu').removeClass("affix");
      }
    });

    /*=================================*/
    /* search popup */
    /*=================================*/

    $('.header-search .top-search').on('click', () => {
      $('.header-search .search-popup').toggleClass('active');
    });

    $('.ak-search .close').on('click', () => {
      $('.search-icon .ak-search').removeClass('active');
    });

    $('.search-overlay').on('click', () => {
      $('.header-search .search-popup').removeClass('active');
    });


    /*=================================*/
    /* toggle-nav */
    /*=================================*/

    $('.header-nav-search .toggle-button').on('click', () => {

      let a = $('body').addClass('menu-active');
      // alert(a);
    });
    $('.close-icon').on('click', () => {
      $('body').removeClass('menu-active');
    });

  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}
