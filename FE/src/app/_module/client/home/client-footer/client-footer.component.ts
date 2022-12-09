import { Injectable, HostListener, AfterViewInit, OnInit,Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import data from "@share/_constant/data/navigation.json";
import footerlinks from "@share/_constant/data/footerlinks.json";
import $ from 'jquery';
import 'magnific-popup';
import { CmsService } from '@services/cms.service';

@Component({
  selector: 'app-client-footer',
  templateUrl: './client-footer.component.html',
  styleUrls: ['./client-footer.component.scss']
})
export class ClientFooterComponent implements AfterViewInit, OnInit {

  windowScrolled: boolean | undefined;
  addressPage:string ="Số 10 Phạm văn bạch";
  img:string;
  googleMaps:string;
  aboutUs:string;
  phoneNumber:string;
  constructor(private service : CmsService) { }
  
  // Sticky Nav
  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.windowScrolled = window.scrollY > 100;
  }
  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }
  // navigation
 
 
  //Mobile 
  
  // Add class on resize and onload window
  visible: boolean = false;
  breakpoint: number = 1199;
  public innerWidth: any;
  detectHeader() {
    this.innerWidth = window.innerWidth;
    this.visible = this.innerWidth >= this.breakpoint;
  }
  ngOnInit(): void {
    this.detectHeader();
    this.getSetting();
  }
  ngAfterViewInit(): void {
    ($('.popup-youtube') as any).magnificPopup({
      type: 'iframe'
    });
    ($('.gallery-img-popup') as any).magnificPopup({
      type: 'image',
      gallery: {
        enabled: true,
      },
      mainClass: 'mfp-fade',
    });
  }
  getSetting() {
    this.service.getAllFreeUrl("Setting").subscribe((res: any) => {
      let object = {} as any;
    
      this.addressPage = res.address;
      this.img = res.logoUrl;
      this.googleMaps = res.google;
      this.aboutUs = res.aboutUs;
      this.phoneNumber = res.phone;
    })
  }
}

