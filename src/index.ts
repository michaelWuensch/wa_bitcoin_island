/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

let currentPopup: any = undefined;

WA.room.onEnterLayer('scheduleZone').subscribe(() => {
    console.log('toto')
    currentPopup =  WA.ui.openPopup("schedulePopup","Room 1: Questions & Answers\n\nRoom 2: Main Meetup\n\nRoom 3: Lightning\n\nBeach: Random Talk",[]);
})

WA.room.onLeaveLayer('scheduleZone').subscribe(closePopUp)

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}
