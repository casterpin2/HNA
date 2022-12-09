import { Injectable, HostListener, AfterViewInit, OnInit, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import data from "@share/_constant/data/navigation.json";
import footerlinks from "@share/_constant/data/footerlinks.json";
import $ from 'jquery';
import 'magnific-popup';
import { HEADER_CLIENT } from '@models/constant.model';
import { CmsService } from '@services/cms.service';

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.scss']
})
export class HeaderClientComponent implements AfterViewInit, OnInit {
  public navigation: any[] = [];
  public links = footerlinks as any;
  windowScrolled: boolean | undefined;
  closeResult: string | undefined;
  avatarUrl: SVGStringList;
  item:any = {};
  constructor(private modalService: NgbModal,
    private service: CmsService) { }
  getSetting() {
    this.service.getAllFreeUrl("Setting").subscribe((res: any) => {
   
      this.avatarUrl = res.logoUrl;
      this.item = res;
    })
  }
  // Search
  openSearch(content: any) {
    this.modalService.open(content, { centered: true, windowClass: 'search-modal' });
  }
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
  navMethod: boolean = false;
  toggleNav() {
    this.navMethod = !this.navMethod;
  }
  // Canvas
  canvasMethod: boolean = false;
  toggleCanvas() {
    this.canvasMethod = !this.canvasMethod;
  }
  //Mobile 
  open: boolean = false;
  trigger(item: { open: boolean; }) {
    item.open = !item.open;
  }
  // Add class on resize and onload window
  visible: boolean = false;
  breakpoint: number = 1199;
  public innerWidth: any;
  detectHeader() {
    this.innerWidth = window.innerWidth;
    this.visible = this.innerWidth >= this.breakpoint;
  }
  ngOnInit(): void {
    this.navigation = HEADER_CLIENT;
    this.getSetting();
    this.detectHeader();
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

}
