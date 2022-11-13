# Admin Theme v1.0

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Run `ng g module [module-name] --routing` to generate new module with route.
`ng g c component-name --spec false` to generate new module without spec.
`ng g c component-name --flat false` to generate new c same forder.
`ng build --configuration=production` build production

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Running dev IE=11

Run `ng serve --configuration es5`

## Build QA

Run `ng build --configuration=qa` to build the project. The build artifacts will be stored in the `dist/` directory. 

Run `node --max-old-space-size=8192  node_modules/@angular/cli/bin/ng build --configuration=qa` to build the project when have error memory. The build artifacts will be stored in the `dist/` directory. 

## Build QA Can Debug
Run `node --max-old-space-size=8192  node_modules/@angular/cli/bin/ng build --configuration=uat --source-map` to build the project. The build artifacts will be stored in the `dist/` directory. 

## Further help
Run `npm i -save-dev node-sass` if see error combine css.
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Lib help
`ng-zorro-antd` use for UI control. (https://ng.ant.design/components/overview/en)
`ngx-toastr` use for show alert message (https://www.npmjs.com/package/ngx-toastr)
`ng-block-ui` use for block UI (https://www.npmjs.com/package/ng-block-ui)
