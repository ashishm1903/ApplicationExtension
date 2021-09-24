import { override } from "@microsoft/decorators";
import { Log } from "@microsoft/sp-core-library";
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName,
} from "@microsoft/sp-application-base";
import { Dialog } from "@microsoft/sp-dialog";
import { escape } from "@microsoft/sp-lodash-subset";
import * as strings from "ApplicationcustmizerApplicationCustomizerStrings";
import styles from "./ACDemo.module.scss";
import * as bootstrap from "bootstrap";
const LOG_SOURCE: string = "ApplicationcustmizerApplicationCustomizer";
export interface IApplicationcustmizerApplicationCustomizerProperties {
  // This is an example; replace with your own property
  Top: string;
  Bottom: string;
  elementId: string;
  elementId1: string;
}
/** A Custom Action which can be run during execution of a Client Side Application */
export default class ApplicationcustmizerApplicationCustomizer extends BaseApplicationCustomizer<IApplicationcustmizerApplicationCustomizerProperties> {
  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;
  @override
  public onInit(): Promise<void> {
    
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    this.context.placeholderProvider.changedEvent.add(
      this,
      this._renderPlaceHolders
    );
    // this.context.application.navigatedEvent.add(this,this._renderPlaceHolders);
    this.context.application.navigatedEvent.add(this, () => {
      console.log('Navigated Event:', window.location.href);
    });
    this._renderPlaceHolders();
    this._onDispose();
    if (this.properties.elementId != "") {
      const spElement: any = document.getElementById(this.properties.elementId);
      Log.info(LOG_SOURCE, `Found Element ${spElement}`);
      spElement.style = "display:none";
    }
    if (this.properties.elementId1 != "") {
      const spElement1: any = document.getElementById(
        this.properties.elementId1
      );
      Log.info(LOG_SOURCE, `Found Element ${spElement1}`);
      spElement1.style = "display:none";
    }
    return Promise.resolve();
  }
  private _renderPlaceHolders(): void {
    console.log(
      "Available placeholders are : ",
      this.context.placeholderProvider.placeholderNames
        .map((placeholdername) => PlaceholderName[placeholdername])
        .join(", ")
    );
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );
      if (!this._topPlaceholder) {
        console.error("The placeholder Top was not found...");
        return;
      }
      if (this.properties) {
        let topString: string = this.properties.Top;
        if (!topString) {
          topString = "(Top property was not defined...)";
        }
        if (this._topPlaceholder.domElement) {
          this._topPlaceholder.domElement.innerHTML = `
            <div class="${styles.acdemoapp} " id="main"  >
              <div  class="ms-bgColor-themeDark ms-fontColor-white  ${styles.topPlaceholder} ">
              <a  href="https://nitordev.sharepoint.com/sites/HMETest/EnduranceTest">
                 <img class="${styles.img}" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0c8c350f-a304-48dd-9bdb-533975289629/dd6m9ua-33b0ac57-85fa-40f2-b8ad-6fd77d7bee2f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBjOGMzNTBmLWEzMDQtNDhkZC05YmRiLTUzMzk3NTI4OTYyOVwvZGQ2bTl1YS0zM2IwYWM1Ny04NWZhLTQwZjItYjhhZC02ZmQ3N2Q3YmVlMmYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.dsbUFd9NzgcB1xXr70nJssj4RP8spYJ8vpSYeSdaGiA" width=50px hight=50px>
                 </a>
                 <input type="text" placeholder="Search.." name="search"><input type="submit" name="search" value="Search" >
                 <a class="${styles.hyperHome} active" href="https://nitordev.sharepoint.com/sites/HMETest/EnduranceTest/Lists/SoftwareCatalog/AllItems.aspx">Software Catalog</a>
                 <a class="${styles.hyperlink}" href="https://nitordev.sharepoint.com/sites/HMETest/EnduranceTest/Lists/Employee%20Details/AllItems.aspx">Employee Details</a>
                 <a class="${styles.hyperlink}" href="https://nitordev.sharepoint.com/sites/HMETest/EnduranceTest/Lists/Salary/AllItems.aspx">Salary</a>
              </div>
            </div>`;
        }
      }
    }
    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Bottom,
          { onDispose: this._onDispose }
        );
      if (!this._bottomPlaceholder) {
        console.error("The placeholder Bottom was not found...");
        return;
      }
      if (this.properties) {
        let bottomString: string = this.properties.Bottom;
        if (!bottomString) {
          bottomString = "(Bottom property was not defined...)";
        }
        if (this._bottomPlaceholder.domElement) {
          this._bottomPlaceholder.domElement.innerHTML = `
            <div class="${styles.acdemoapp}">
              <div class="ms-bgColor-themeDark ms-fontColor-white ${styles.bottomPlaceholder}">
               <span class="${styles.bottomPlaceholder}"> Copyright &copy 2021. All Right Reserve.</span>
               <span class="${styles.footerLink}"> Contact Us: 8888333445</span>
              </div>
            </div>`;
        }
      }
    }
  }
  private _onDispose(): void {
    console.log("Disposed custom top and bottom placeholders.");
  }
}
