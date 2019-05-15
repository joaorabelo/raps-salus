import { TabsPage } from './tabs/tabs.page';
import { DatabaseService } from './services/database.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Environment } from '@ionic-native/google-maps';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  rootPage: any = null;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dbProvider: DatabaseService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      Environment.setEnv({
        // Api key for your server
        // (Make sure the api key should have Website restrictions for your website domain only)
        API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyBZamoub9SCWL2GriEBRSgLGVVrF0QPakk',

        // Api key for local development
        // (Make sure the api key should have Website restrictions for 'http://localhost' only)
        API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyAxc-BRxFUWLr57cY5svpYuokVaLmGDv94'
      });
      this.statusBar.styleDefault();
      this.dbProvider.createDatabase()
        .then(() => {
          // fechando a SplashScreen somente quando o banco for criado
          this.openHomePage(this.splashScreen);
        })
        .catch(() => {
          // ou se houver erro na criação do banco
          this.openHomePage(this.splashScreen);
        });
      this.splashScreen.hide();
    });
  }

  private openHomePage(splashScreen: SplashScreen) {
    splashScreen.hide();
    this.rootPage = TabsPage;
  }
}
