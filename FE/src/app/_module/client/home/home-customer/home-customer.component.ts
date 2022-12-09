import { Component, OnInit } from '@angular/core';
import testimonial from "@share/_constant/data/testimonials.json";
import author from "@share/_constant/data/team.json";
import clients from "@share/_constant/data/clients.json";
import { CmsService } from '@services/cms.service';
@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.scss']
})
export class HomeCustomerComponent implements OnInit {
  settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          arrows: false,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1
        }
      }
    ]
  } as any;
  author : any;
  clients : any = clients;
  constructor(private service:CmsService) { }

  ngOnInit(): void {
    this.getFeedBack()
  }
  public testimonials : any;

  // Author
  public getAuthor(items: string | any[]) {
    var elems = this.author.filter((item: { id: string; }) => {
      return items.includes(item.id)
    }) as any;
    return elems;
  }
  // Clients
  public getClients(items: string | any[]) {
    var elems = this.clients.filter((item: { id: string; }) => {
      return items.includes(item.id)
    });
    return elems;
    
  }
  public getFeedBack(){
    this.service.getAllFreeUrl("client/customer?pageSize=12&pageNo=1").subscribe((res:any)=>{
      this.testimonials = res.data;
    })
  }
}
