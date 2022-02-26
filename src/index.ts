/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

///////////////////////
// World configuration
///////////////////////

let Room1Available = true;
let Room2Available = true;
let Room3Available = true;

let StartJitsiInRoomsImmediatelly = false;

let Room1Topic = "Q & A";
let Room2Topic = "MainMeetup";
let Room3Topic = "Lightning";
let BeachTopic = "Random talk";

///////////////////////
// Configuration end
///////////////////////

if (!Room1Available) {
    WA.room.setProperty('Door1OpenZone', 'doorVariable', 'fakeDoorVar');
    Room1Topic = "Closed";
    WA.room.showLayer('Room1Closed');
    WA.room.onEnterLayer('Door1OpenZone').subscribe(() => {
        displayActionMessage("This room is closed today.", 2000);
    })
}

if (!Room2Available) {
    WA.room.setProperty('Door2OpenZone', 'doorVariable', 'fakeDoorVar');
    Room2Topic = "Closed";
    WA.room.showLayer('Room2Closed');
    WA.room.onEnterLayer('Door2OpenZone').subscribe(() => {
        displayActionMessage("This room is closed today.", 2000);
    })
}

if (!Room3Available) {
    WA.room.setProperty('Door3OpenZone', 'doorVariable', 'fakeDoorVar');
    Room3Topic = "Closed";
    WA.room.showLayer('Room3Closed');
    WA.room.onEnterLayer('Door3OpenZone').subscribe(() => {
        displayActionMessage("This room is closed today.", 2000);
    })
}

if (StartJitsiInRoomsImmediatelly){
    WA.room.setProperty('jitsiRoom1', 'jitsiTrigger', 'noTrigger');
    WA.room.setProperty('jitsiRoom2', 'jitsiTrigger', 'noTrigger');
    WA.room.setProperty('jitsiRoom3', 'jitsiTrigger', 'noTrigger');
}


let currentPopup: any = undefined;

WA.room.onEnterLayer('scheduleZone').subscribe(() => {
    currentPopup =  WA.ui.openPopup("schedulePopup","Room 1: " + Room1Topic + "\n\nRoom 2: " + Room2Topic + "\n\nRoom 3: " + Room3Topic + "\n\nBeach: "+ BeachTopic,[]);
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

WA.room.onEnterLayer('blockchainZone').subscribe(() => {
    currentPopup =  WA.ui.openPopup("blockchainPopup","Wow! Maybe an ancient concept of a blockchain?\n\nThere is even some \"data\" in that blocks...",[]);
})
WA.room.onLeaveLayer('blockchainZone').subscribe(closePopUp)

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

function displayActionMessage(message : string, durationInMS : number){
    const triggerMessage = WA.ui.displayActionMessage({
        message: message,
        callback: () => { },
    });
    
    setTimeout(() => {
        // later
        triggerMessage.remove();
    }, durationInMS)
}