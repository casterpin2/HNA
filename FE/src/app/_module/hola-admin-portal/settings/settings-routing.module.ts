import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsCategoryCrudComponent } from './settings-news/news-category/news-category-crud/news-category-crud.component';
import { NewsCategoryComponent } from './settings-news/news-category/news-category.component';
import { NewsCrudComponent } from './settings-news/news-crud/news-crud.component';
import { NewsViewComponent } from './settings-news/news-view/news-view.component';
import { SettingsNewsComponent } from './settings-news/settings-news.component';
import { SettingsSystemComponent } from './settings-system/settings-system.component';
import { CustomerFeedbackCrudComponent } from './website-content/customer-feedback/customer-feedback-crud/customer-feedback-crud.component';
import { WebsiteContentComponent } from './website-content/website-content.component';

const routes: Routes = [
  {
    path:"system",
    component:SettingsSystemComponent
  },
  {
    path:'news',
    component:SettingsNewsComponent
  },
  {
    path:'news/category/:id',
    component:SettingsNewsComponent
  },
  
  {
    path:'news/crud',
    component:NewsCrudComponent
  },
  {
    path:'news/crud/:id',
    component:NewsCrudComponent
  },
  {
    path:'news/view/:id',
    component:NewsViewComponent
  },
  {
    path:'news-category',
    component:NewsCategoryComponent
  },
  {
    path:'news-category-curd',
    component:NewsCategoryCrudComponent
  },
  {
    path:'news-category-curd/:id',
    component:NewsCategoryCrudComponent
  },
  {
    path:"web-content",
    component:WebsiteContentComponent
  },
  {
    path:"web-content/banner",
    component:WebsiteContentComponent
  },
  {
    path:"web-content/banner/crud",
    component:WebsiteContentComponent
  },
  {
    path:"web-content/banner/crud/:id",
    component:WebsiteContentComponent
  },
  {
    path:"web-content/customer/crud/:id",
    component:CustomerFeedbackCrudComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
