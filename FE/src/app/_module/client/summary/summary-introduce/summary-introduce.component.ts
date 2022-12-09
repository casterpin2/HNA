import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DATE_FOMAT, DATE_TIME_FORMAT, DEFAULT_IMG } from '@models/constant.model';
import { CmsService } from '@services/cms.service';
import blog from '@share/_constant/data/blog/blog.json';
@Component({
  selector: 'app-summary-introduce',
  templateUrl: './summary-introduce.component.html',
  styleUrls: ['./summary-introduce.component.scss']
})
export class SummaryIntroduceComponent implements OnInit {
  date = new Date();
  dateFormat = DATE_TIME_FORMAT;
  avatarUrl: string;
  item: any = {} as any;
  tags: string[] = [];
  blogs: any = blog;
  public pageUrl = window.location.href;
  showLastNews = false;
  dataLastNews: any = [];
  constructor(private service: CmsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getIntroduce();
    this.getLastNews();
  }
  public socialShare(title: string) {
    var socialIcons = [
      {
        title: "facebook",
        iconClass: "fab fa-facebook-f",
        iconStyle: "fb",
        link: "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(this.pageUrl) + ""
      },
      {
        title: "twitter",
        iconClass: "fab fa-twitter",
        iconStyle: "tw",
        link: "http://twitter.com/intent/tweet?text=" + encodeURIComponent(title) + "&" + encodeURIComponent(this.pageUrl) + ""
      },
      {
        title: "linkedin",
        iconClass: "fab fa-linkedin-in",
        iconStyle: "ln",
        link: "https://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(this.pageUrl) + "&title=" + encodeURIComponent(title) + ""
      },
      {
        title: "pinterest",
        iconClass: "fab fa-pinterest-p",
        iconStyle: "gg",
        link: "http://pinterest.com/pin/create/button/?url=" + encodeURIComponent(this.pageUrl) + ""
      }
    ];
    return socialIcons;
  }
  openSocialPopup(social: any) {
    window.open(social.link, "MsgWindow", "width=600,height=600")
  }

  public getIntroduce() {

    let id = this.activatedRoute.snapshot.params['id'];
    console.log();
    let urlFee = 'client/' + this.activatedRoute.snapshot.routeConfig.path;
    if (id) {
      urlFee = urlFee.replace(":id", id).replace("/:take","");
    }
    this.service.getAllFreeUrl(urlFee).subscribe((res: any) => {
      this.item = res;
      this.tags = this.item.tag.split(';');
      console.log(this.tags);
      this.updateContent(res.content)
    })
  }

  public getLastNews() {
    let id = this.activatedRoute.snapshot.params['id'];
    let take = this.activatedRoute.snapshot.params['take'];

    if (!id) {
      return;
    }
    if(take){
      return;
    }
    this.showLastNews =  true;

    this.service.getAllFreeUrl(`client/eventLastNews`).subscribe((res: any) => {
      this.dataLastNews = res;

    })
  }
  public getBanner() {
    this.service.getAllFreeUrl("client/banner", { type: "INTRODUCE" }).subscribe((res: any) => {
      this.avatarUrl = res.imgUrl;
    })
  }
  updateContent(value: string) {
    let encoded = encodeURIComponent(value);
    let dataValue = decodeURIComponent(encoded);
    if( document.getElementById("item-content")){
      document.getElementById("item-content").innerHTML = dataValue;
    }

    return;
  }
}
