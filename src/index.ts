/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

let currentPopup: any = undefined;

WA.room.onEnterLayer('scheduleZone').subscribe(() => {
    currentPopup =  WA.ui.openPopup("schedulePopup","Room 1: Q & A\n\nRoom 2: Main Meetup\n\nRoom 3: Lightning\n\nBeach: Random Talk",[]);
})
WA.room.onLeaveLayer('scheduleZone').subscribe(closePopUp)

WA.room.onEnterLayer('boatingZone').subscribe(() => {
    currentPopup =  WA.ui.openPopup("boatingPopup","OH NO!!!\n\nSomeone had a boating accident?",[]);
})
WA.room.onLeaveLayer('boatingZone').subscribe(closePopUp)

WA.room.onEnterLayer('citadelZone').subscribe(() => {
    currentPopup =  WA.ui.openPopup("citadelPopup","Nice draft for a citadel!",[]);
})
WA.room.onLeaveLayer('citadelZone').subscribe(closePopUp)

WA.room.onEnterLayer('portZone').subscribe(() => {
    currentPopup =  WA.ui.openPopup("portPopup","Finally a safehaven.",[]);
})
WA.room.onLeaveLayer('portZone').subscribe(closePopUp)

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}
