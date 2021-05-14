let playerData = {
    Text: null,
    BackgroundColor: null,
}
let receivePlayerData = {
    Text: null,
    BackgroundColor: null,
    receiveId: null
}
let InfoData = {
    Tank: 0,
    Heal: 0,
    Melee: 0,
    Range: 0,
    Players: 0,
    MeleeCrit: 0,
    SpellCrit: 0,
    SpellHit: 0,
    Health: 0,
    StaminaP: 0,
    StaminaPartyDemonology: 0,
    Strength: 0,
    Agility: 0,
    AttackPowerPWarrior: 0,
    AttackPowerPShaman: 0,
    AttackPowerPHunter: 0,
    AttackCastingSpeed: 0,
    ExtraMeleeAttack: 0,
    Damage: 0,
    DamageRet: 0,
    ManaReplenishment: 0,
    ManaRestorationShaman: 0,
    ManaRestorationResto: 0,
    HealingReceived: 0,
    SpellDamage: 0,
    // raid
    StatsP: 0,
    StaminaR: 0,
    StatsStatic: 0,
    Spirit: 0,
    Intellect: 0,
    AttackPowerR: 0,
    ReducedThreat: 0,
    ManaRestoration: 0,
    //debuff
    PlayerAttackPower: 0,
    PlayerAttackPowerMarks: 0,
    PhysicalDamageTaken: 0,
    SpellDamageTaken: 0,
    IncreasedSpellDamageTaken: 0,
    FireDamageTaken: 0,
    ShadowDamageTaken: 0,
    ShadowDamageTakenWarlock: 0,
    Crit: 0,
    PlayerFrostCrit: 0,
    PhysicalHit: 0,
    BleedDamage: 0,
    ReducedArmorWarrior: 0,
    ReducedArmorWarlock: 0,
    ReducedArmorDruid: 0,
    ReducedArmorRogue: 0,
    ReducedArmorAssassination: 0,
    ReducedAttackPower: 0,
    ReducedAttackSpeed: 0,
    ReducedPhysicalHit: 0,
    ReducedHitBalance: 0,
    ReducedPhysicalDamage: 0,
    Judgement: 0,
}
let partyData = {
    "01": {
        number: null,
        color: null,
        name: null,
    },
    "02": {
        number: null,
        color: null,
        name: null,
    },
    "03": {
        number: null,
        color: null,
        name: null
    },
    "04": {
        number: null,
        color: null,
        name: null
    },
    "05": {
        number: null,
        color: null,
        name: null
    },
    "06": {
        number: null,
        color: null,
        name: null
    },
    "07": {
        number: null,
        color: null,
        name: null
    },
    "08": {
        number: null,
        color: null,
        name: null
    },
    "09": {
        number: null,
        color: null,
        name: null
    },
    "10": {
        number: null,
        color: null,
        name: null
    },
    "11": {
        number: null,
        color: null,
        name: null
    },
    "12": {
        number: null,
        color: null,
        name: null
    },
    "13": {
        number: null,
        color: null,
        name: null
    },
    "14": {
        number: null,
        color: null,
        name: null
    },
    "15": {
        number: null,
        color: null,
        name: null
    },
    "16": {
        number: null,
        color: null,
        name: null
    },
    "17": {
        number: null,
        color: null,
        name: null
    },
    "18": {
        number: null,
        color: null,
        name: null
    },
    "19": {
        number: null,
        color: null,
        name: null
    },
    "20": {
        number: null,
        color: null,
        name: null
    },
    "21": {
        number: null,
        color: null,
        name: null
    },
    "22": {
        number: null,
        color: null,
        name: null
    },
    "23": {
        number: null,
        color: null,
        name: null
    },
    "24": {
        number: null,
        color: null,
        name: null
    },
    "25": {
        number: null,
        color: null,
        name: null
    }
}
let mainString = ""
let removeElement = null
window.onload = function() {
    if (localStorage.getItem("view") == "role") {
        SetRoleView()
        document.getElementById("btnrole").innerText = "Spec View"
    } else if (localStorage.getItem("view") == "spec") {
        SetSpecView()
        document.getElementById("btnrole").innerText = "Role View"
    }
    GetURLData()
	
}

function mouseClick(event) { // click load
    let click = Array.from(document.getElementsByClassName("party"))
    let newArray = []
    click = click.sort(function(a, b) {
        let aNum = parseInt(a.id);
        let bNum = parseInt(b.id);
        return aNum - bNum;
    });
    click.forEach(item => {
        if (item.style.backgroundColor == "rgb(0, 0, 0)") {
            newArray.push(item)
        }
    });
    newArray[0].style.borderColor = "rgb(0, 0, 0)"
    newArray[0].style.backgroundColor = event.target.style.backgroundColor
    newArray[0].innerText = event.target.innerText
    partyData[newArray[0].id].color = event.target.style.backgroundColor
    partyData[newArray[0].id].name = event.target.innerText
    partyData[newArray[0].id].number = GetNumberFromNameAndColor(event.target.innerText, event.target.style.backgroundColor)
    ClearData()
    SetDisplay()
}

function startdragevent(event) { //start the Drag
    event.dataTransfer.setData("html", event.target.id);
    playerData.BackgroundColor = event.target.style.backgroundColor
    playerData.Text = event.target.innerText
}

function dropevent(event) { // drop element receive
    event.preventDefault()
    receivePlayerData.Text = event.target.innerText
    receivePlayerData.BackgroundColor = event.target.style.backgroundColor
    event.target.style.backgroundColor = playerData.BackgroundColor
    event.target.innerText = playerData.Text
    event.target.style.borderColor = "rgb(0, 0, 0)"
    partyData[event.target.id].color = event.target.style.backgroundColor
    partyData[event.target.id].name = event.target.innerText
    partyData[event.target.id].number = GetNumberFromNameAndColor(event.target.innerText, event.target.style.backgroundColor)
    StringsSetup()
}

function enddropevent(event) { // last event from Drag
    if (document.getElementById(event.target.id).classList.contains("classspec")) {
        document.getElementById(event.target.id).style.backgroundColor = playerData.BackgroundColor
        document.getElementById(event.target.id).innerText = playerData.Text
    } else {
        
    
        if (receivePlayerData.BackgroundColor != "rgb(66, 80, 44)") {

            event.target.innerText = receivePlayerData.Text
            event.target.style.backgroundColor = receivePlayerData.BackgroundColor
            event.target.style.borderColor = "rgb(0, 0, 0)"
            partyData[event.target.id].number = GetNumberFromNameAndColor(receivePlayerData.Text, receivePlayerData.BackgroundColor)
            partyData[event.target.id].color = receivePlayerData.BackgroundColor
            partyData[event.target.id].name = receivePlayerData.Text
            receivePlayerData.BackgroundColor = "rgb(66, 80, 44)"
            
         
        } else {

            event.target.innerText = " "
            event.target.style.borderColor = "rgb(143, 182, 79)"
            event.target.style.backgroundColor = "rgb(0, 0, 0)"
            partyData[event.target.id].number = null
            partyData[event.target.id].color = null
            partyData[event.target.id].name = null
        }
        
         
        
    };
    
    ClearData()
    SetDisplay()
   
   
     
};


function enterAreaDrag(event) { //dragenter onelement
    if (document.getElementById(event.currentTarget.id).classList.contains("party")) {
        if (event.currentTarget.style.backgroundColor == "rgb(0, 0, 0)") {
            event.currentTarget.style.backgroundColor = "rgb(66, 80, 44)"
        };
    }
};

function leaveAreaDrag(event) { // dragleave onelement
    if (document.getElementById(event.currentTarget.id).classList.contains("party")) {
        if (event.currentTarget.style.backgroundColor == "rgb(66, 80, 44)") {
            event.currentTarget.style.backgroundColor = "rgb(0, 0, 0)"
        }
    }
};

function mouseEnter(event) {
    removeElement = null
    removeElement = document.getElementById(event.target.id)
    removeElement.oncontextmenu = rightClick;
    if (document.getElementById(event.target.id).style.backgroundColor == "rgb(0, 0, 0)") {
        document.getElementById(event.target.id).setAttribute('draggable', false);
        document.getElementById(event.target.id).setAttribute('unselectable', true);
        document.getElementById(event.target.id).style.cursor = "default"
    } else {
        document.getElementById(event.target.id).setAttribute('draggable', true);
        document.getElementById(event.target.id).setAttribute('unselectable', false);
        document.getElementById(event.target.id).style.cursor = "grab"
    };
};

function mouseLeave(event) {}

function hideMenu() {
    document.getElementById("contextMenu").style.display = "none"
}

function rightClick(e) {
    e.preventDefault();
    if (document.getElementById(e.target.id).style.backgroundColor !== "rgb(0, 0, 0)") {
        if (document.getElementById("contextMenu").style.display == "block")
            hideMenu();
        else {
            let menu = document.getElementById("contextMenu")
            menu.style.display = 'block';
            menu.style.left = e.pageX + "px";
            menu.style.top = e.pageY + "px";
        }
    }
}

function mouseClickMe(event) {}

function mouseClickThis(event) {
    hideMenu()
    removeElement.innerText = " "
    removeElement.style.borderColor = "rgb(143, 182, 79)"
    removeElement.style.backgroundColor = "rgb(0, 0, 0)"
    partyData[removeElement.id].number = null
    partyData[removeElement.id].color = null
    partyData[removeElement.id].name = null
    ClearData()
    SetDisplay()
}


function SetDisplay() {
    mainString = ""
    Object.keys(partyData).forEach(function(key) {
        let value = partyData[key];
        if (value.name !== null) {
            SetDataFromNumber(value.number)
            mainString += (key + value.number)
        }
    })
}

function ClearData() {
    for (let item in InfoData) {
        InfoData[item] = 0
    }
    document.getElementById("atank").innerText = "0"
    document.getElementById("aheal").innerText = "0"
    document.getElementById("amelee").innerText = "0"
    document.getElementById("arange").innerText = "0"
    document.getElementById("aplayers").innerText = "0"
    let infotext = document.getElementsByClassName("infotext");
    for (let index = 0; index < infotext.length; index++) {
        infotext[index].innerText = "0"
        infotext[index].style.color = "rgb(255, 255, 255)"
    }
}

function ClearParty() {
    let partyElement = document.getElementsByClassName("party");
    for (let i = 0; i < partyElement.length; i++) {
        partyElement[i].innerText = " "
        partyElement[i].style.borderColor = "rgb(143, 182, 79)"
        partyElement[i].style.backgroundColor = "rgb(0, 0, 0)"
    }
    Object.keys(partyData).forEach(function(key) {
        let value = partyData[key];
        value.color = null
        value.name = null
        value.number = null
    })
}

function allowDrop(event) {
    event.preventDefault()
}

function btnRole(event) {
    if (event.target.innerText == "Role View") {
        event.target.innerText = "Spec View" // 1st thing
        localStorage.setItem("view", "role")
        SetRoleView()
            // document.getElementById("btnrole").innerText = "Spec View"
    } else {
        event.target.innerText = "Role View" // 2nd thing
        localStorage.setItem("view", "spec")
        SetSpecView()
            // document.getElementById("btnrole").innerText = "Role View"
    }
}

function SetRoleView() {
    document.getElementById("Grid01").setAttribute("style", "background-color:rgb(198, 155, 109)");
    document.getElementById("Grid01").innerText = "Protection"
    document.getElementById("Grid02").setAttribute("style", "background-color:rgb(244, 140, 186)");
    document.getElementById("Grid02").innerText = "Protection"
    document.getElementById("Grid03").setAttribute("style", "background-color:rgb(255, 124, 10)");
    document.getElementById("Grid03").innerText = "Feral"
    RemovedViewRole()
        //
    document.getElementById("Grid07").setAttribute("style", "background-color:rgb(255, 124, 10)");
    document.getElementById("Grid07").innerText = "Restoration"
    document.getElementById("Grid08").setAttribute("style", "background-color:rgb(244, 140, 186)");
    document.getElementById("Grid08").innerText = "Holy"
    document.getElementById("Grid09").setAttribute("style", "background-color:rgb(255, 255, 255)");
    document.getElementById("Grid09").innerText = "Discipline"
    document.getElementById("Grid10").setAttribute("style", "background-color:rgb(255, 255, 255)");
    document.getElementById("Grid10").innerText = "Holy"
    document.getElementById("Grid11").setAttribute("style", "background-color:rgb(0, 112, 221)");
    document.getElementById("Grid11").innerText = "Restoration"
        //
    document.getElementById("Grid16").setAttribute("style", "background-color:rgb(170, 211, 114)");
    document.getElementById("Grid16").innerText = "Beast Mastery"
    document.getElementById("Grid17").setAttribute("style", "background-color:rgb(170, 211, 114)");
    document.getElementById("Grid17").innerText = "Marksmanship"
    document.getElementById("Grid18").setAttribute("style", "background-color:rgb(170, 211, 114)");
    document.getElementById("Grid18").innerText = "Survival"
    document.getElementById("Grid19").setAttribute("style", "background-color:rgb(63, 199, 235)");
    document.getElementById("Grid19").innerText = "Arcane"
    document.getElementById("Grid20").setAttribute("style", "background-color:rgb(63, 199, 235)");
    document.getElementById("Grid20").innerText = "Fire"
    document.getElementById("Grid21").setAttribute("style", "background-color:rgb(63, 199, 235)");
    document.getElementById("Grid21").innerText = "Frost"
    document.getElementById("Grid22").setAttribute("style", "background-color:rgb(148, 130, 201)");
    document.getElementById("Grid22").innerText = "Affliction"
    document.getElementById("Grid23").setAttribute("style", "background-color:rgb(148, 130, 201)");
    document.getElementById("Grid23").innerText = "Demonology"
    document.getElementById("Grid24").setAttribute("style", "background-color:rgb(148, 130, 201)");
    document.getElementById("Grid24").innerText = "Destruction"
    document.getElementById("Grid25").setAttribute("style", "background-color:rgb(255, 124, 10)");
    document.getElementById("Grid25").innerText = "Balance"
    document.getElementById("Grid26").setAttribute("style", "background-color:rgb(255, 255, 255)");
    document.getElementById("Grid26").innerText = "Shadow"
    document.getElementById("Grid27").setAttribute("style", "background-color:rgb(0, 112, 221)");
    document.getElementById("Grid27").innerText = "Elemental"
        //
    document.getElementById("Grid31").setAttribute("style", "background-color:rgb(255, 244, 104)");
    document.getElementById("Grid31").innerText = "Assassination"
    document.getElementById("Grid32").setAttribute("style", "background-color:rgb(255, 244, 104)");
    document.getElementById("Grid32").innerText = "Combat"
    document.getElementById("Grid33").setAttribute("style", "background-color:rgb(255, 244, 104)");
    document.getElementById("Grid33").innerText = "Subtlety"
    document.getElementById("Grid34").setAttribute("style", "background-color:rgb(0, 112, 221)");
    document.getElementById("Grid34").innerText = "Enhancement"
    document.getElementById("Grid35").setAttribute("style", "background-color:rgb(198, 155, 109)");
    document.getElementById("Grid35").innerText = "Arms"
    document.getElementById("Grid36").setAttribute("style", "background-color:rgb(198, 155, 109)");
    document.getElementById("Grid36").innerText = "Fury"
    document.getElementById("Grid37").setAttribute("style", "background-color:rgb(244, 140, 186)");
    document.getElementById("Grid37").innerText = "Retribution"
}

function SetSpecView() {
    document.getElementById("Grid01").setAttribute("style", "background-color:rgb(255, 124, 10)");
    document.getElementById("Grid01").innerText = "Balance"
    document.getElementById("Grid02").setAttribute("style", "background-color:rgb(255, 124, 10)");
    document.getElementById("Grid02").innerText = "Feral"
    document.getElementById("Grid03").setAttribute("style", "background-color:rgb(255, 124, 10)");
    document.getElementById("Grid03").innerText = "Restoration"
    document.getElementById("Grid04").setAttribute("class", "classspec");
    document.getElementById("Grid04").setAttribute('draggable', "true");
    document.getElementById("Grid04").setAttribute('onclick', "mouseClick(event)");
    document.getElementById("Grid04").setAttribute('ondragstart', "startdragevent(event)");
    document.getElementById("Grid04").setAttribute('ondragend', "enddropevent(event)");
    document.getElementById("Grid04").setAttribute("style", "background-color:rgb(170, 211, 114)");
    document.getElementById("Grid04").innerText = "Beast Mastery"
    document.getElementById("Grid05").setAttribute("class", "classspec");
    document.getElementById("Grid05").setAttribute('draggable', "true");
    document.getElementById("Grid05").setAttribute('onclick', "mouseClick(event)");
    document.getElementById("Grid05").setAttribute('ondragstart', "startdragevent(event)");
    document.getElementById("Grid05").setAttribute('ondragend', "enddropevent(event)");
    document.getElementById("Grid05").setAttribute("style", "background-color:rgb(170, 211, 114)");
    document.getElementById("Grid05").innerText = "Marksmanship"
    document.getElementById("Grid06").setAttribute("class", "classspec");
    document.getElementById("Grid06").setAttribute('draggable', "true");
    document.getElementById("Grid06").setAttribute('onclick', "mouseClick(event)");
    document.getElementById("Grid06").setAttribute('ondragstart', "startdragevent(event)");
    document.getElementById("Grid06").setAttribute('ondragend', "enddropevent(event)");
    document.getElementById("Grid06").setAttribute("style", "background-color:rgb(170, 211, 114)");
    document.getElementById("Grid06").innerText = "Survival"
    document.getElementById("Grid07").setAttribute("style", "background-color:rgb(63, 199, 235)");
    document.getElementById("Grid07").innerText = "Arcane"
    document.getElementById("Grid08").setAttribute("style", "background-color:rgb(63, 199, 235)");
    document.getElementById("Grid08").innerText = "Fire"
    document.getElementById("Grid09").setAttribute("style", "background-color:rgb(63, 199, 235)");
    document.getElementById("Grid09").innerText = "Frost"
    document.getElementById("Grid10").setAttribute("style", "background-color:rgb(244, 140, 186)");
    document.getElementById("Grid10").innerText = "Holy"
    document.getElementById("Grid11").setAttribute("style", "background-color:rgb(244, 140, 186)");
    document.getElementById("Grid11").innerText = "Protection"
    document.getElementById("Grid12").setAttribute("class", "classspec");
    document.getElementById("Grid12").setAttribute('draggable', "true");
    document.getElementById("Grid12").setAttribute('onclick', "mouseClick(event)");
    document.getElementById("Grid12").setAttribute('ondragstart', "startdragevent(event)");
    document.getElementById("Grid12").setAttribute('ondragend', "enddropevent(event)");
    document.getElementById("Grid12").setAttribute("style", "background-color:rgb(244, 140, 186)");
    document.getElementById("Grid12").innerText = "Retribution"
    document.getElementById("Grid13").setAttribute("class", "classspec");
    document.getElementById("Grid13").setAttribute('draggable', "true");
    document.getElementById("Grid13").setAttribute('onclick', "mouseClick(event)");
    document.getElementById("Grid13").setAttribute('ondragstart', "startdragevent(event)");
    document.getElementById("Grid13").setAttribute('ondragend', "enddropevent(event)");
    document.getElementById("Grid13").setAttribute("style", "background-color:rgb(255, 255, 255)");
    document.getElementById("Grid13").innerText = "Discipline"
    document.getElementById("Grid14").setAttribute("class", "classspec");
    document.getElementById("Grid14").setAttribute('draggable', "true");
    document.getElementById("Grid14").setAttribute('onclick', "mouseClick(event)");
    document.getElementById("Grid14").setAttribute('ondragstart', "startdragevent(event)");
    document.getElementById("Grid14").setAttribute('ondragend', "enddropevent(event)");
    document.getElementById("Grid14").setAttribute("style", "background-color:rgb(255, 255, 255)");
    document.getElementById("Grid14").innerText = "Holy"
    document.getElementById("Grid15").setAttribute("class", "classspec");
    document.getElementById("Grid15").setAttribute('draggable', "true");
    document.getElementById("Grid15").setAttribute('onclick', "mouseClick(event)");
    document.getElementById("Grid15").setAttribute('ondragstart', "startdragevent(event)");
    document.getElementById("Grid15").setAttribute('ondragend', "enddropevent(event)");
    document.getElementById("Grid15").setAttribute("style", "background-color:rgb(255, 255, 255)");
    document.getElementById("Grid15").innerText = "Shadow"
    document.getElementById("Grid16").setAttribute("style", "background-color:rgb(255, 244, 104)");
    document.getElementById("Grid16").innerText = "Assassination"
    document.getElementById("Grid17").setAttribute("style", "background-color:rgb(255, 244, 104)");
    document.getElementById("Grid17").innerText = "Combat"
    document.getElementById("Grid18").setAttribute("style", "background-color:rgb(255, 244, 104)");
    document.getElementById("Grid18").innerText = "Subtlety"
    document.getElementById("Grid19").setAttribute("style", "background-color:rgb(0, 112, 221)");
    document.getElementById("Grid19").innerText = "Elemental"
    document.getElementById("Grid20").setAttribute("style", "background-color:rgb(0, 112, 221)");
    document.getElementById("Grid20").innerText = "Enhancement"
    document.getElementById("Grid21").setAttribute("style", "background-color:rgb(0, 112, 221)");
    document.getElementById("Grid21").innerText = "Restoration"
    document.getElementById("Grid22").setAttribute("style", "background-color:rgb(148, 130, 201)");
    document.getElementById("Grid22").innerText = "Affliction"
    document.getElementById("Grid23").setAttribute("style", "background-color:rgb(148, 130, 201)");
    document.getElementById("Grid23").innerText = "Demonology"
    document.getElementById("Grid24").setAttribute("style", "background-color:rgb(148, 130, 201)");
    document.getElementById("Grid24").innerText = "Destruction"
    document.getElementById("Grid25").setAttribute("style", "background-color:rgb(198, 155, 109)");
    document.getElementById("Grid25").innerText = "Arms"
    document.getElementById("Grid26").setAttribute("style", "background-color:rgb(198, 155, 109)");
    document.getElementById("Grid26").innerText = "Fury"
    document.getElementById("Grid27").setAttribute("style", "background-color:rgb(198, 155, 109)");
    document.getElementById("Grid27").innerText = "Protection"
    document.getElementById("Grid31").setAttribute("style", "background-color:rgb(255, 124, 10)");
    document.getElementById("Grid31").innerText = "Druid"
    document.getElementById("Grid32").setAttribute("style", "background-color:rgb(170, 211, 114)");
    document.getElementById("Grid32").innerText = "Hunter"
    document.getElementById("Grid33").setAttribute("style", "background-color:rgb(63, 199, 235)");
    document.getElementById("Grid33").innerText = "Mage"
    document.getElementById("Grid34").setAttribute("style", "background-color:rgb(244, 140, 186)");
    document.getElementById("Grid34").innerText = "Paladin"
    document.getElementById("Grid35").setAttribute("style", "background-color:rgb(255, 255, 255)");
    document.getElementById("Grid35").innerText = "Priest"
    document.getElementById("Grid36").setAttribute("style", "background-color:rgb(255, 244, 104)");
    document.getElementById("Grid36").innerText = "Rogue"
    document.getElementById("Grid37").setAttribute("style", "background-color:rgb(0, 112, 221)");
    document.getElementById("Grid37").innerText = "Shaman"
    document.getElementById("Grid38").setAttribute("style", "background-color:rgb(148, 130, 201)");
    document.getElementById("Grid38").innerText = "Warlock"
    document.getElementById("Grid39").setAttribute("style", "background-color:rgb(198, 155, 109)");
    document.getElementById("Grid39").innerText = "Warrior"
    document.getElementById("Grid38").setAttribute("class", "classspec");
    document.getElementById("Grid38").setAttribute('draggable', "true");
    document.getElementById("Grid38").setAttribute('onclick', "mouseClick(event)");
    document.getElementById("Grid38").setAttribute('ondragstart', "startdragevent(event)");
    document.getElementById("Grid38").setAttribute('ondragend', "enddropevent(event)");
    document.getElementById("Grid38").setAttribute("style", "background-color:rgb(148, 130, 201)");
    document.getElementById("Grid38").innerText = "Warlock"
    document.getElementById("Grid39").setAttribute("class", "classspec");
    document.getElementById("Grid39").setAttribute('draggable', "true");
    document.getElementById("Grid39").setAttribute('onclick', "mouseClick(event)");
    document.getElementById("Grid39").setAttribute('ondragstart', "startdragevent(event)");
    document.getElementById("Grid39").setAttribute('ondragend', "enddropevent(event)");
    document.getElementById("Grid39").setAttribute("style", "background-color:rgb(198, 155, 109)");
    document.getElementById("Grid39").innerText = "Warrior"
    RemovedViewSpec()
}

function RemovedViewRole() {
    document.getElementById("Grid04").removeAttribute("class");
    document.getElementById("Grid04").removeAttribute("draggable");
    document.getElementById("Grid04").removeAttribute("onclick");
    document.getElementById("Grid04").removeAttribute("ondragstart");
    document.getElementById("Grid04").removeAttribute("ondragend");
    document.getElementById("Grid04").removeAttribute("draggable");
    document.getElementById("Grid04").setAttribute("style", "background-color:rgb(33, 32, 30)");
    document.getElementById("Grid04").innerText = " "
    document.getElementById("Grid05").removeAttribute("class");
    document.getElementById("Grid05").removeAttribute("draggable");
    document.getElementById("Grid05").removeAttribute("onclick");
    document.getElementById("Grid05").removeAttribute("ondragstart");
    document.getElementById("Grid05").removeAttribute("ondragend");
    document.getElementById("Grid05").removeAttribute("draggable");
    document.getElementById("Grid05").setAttribute("style", "background-color:rgb(33, 32, 30)");
    document.getElementById("Grid05").innerText = " "
    document.getElementById("Grid06").removeAttribute("class");
    document.getElementById("Grid06").removeAttribute("draggable");
    document.getElementById("Grid06").removeAttribute("onclick");
    document.getElementById("Grid06").removeAttribute("ondragstart");
    document.getElementById("Grid06").removeAttribute("ondragend");
    document.getElementById("Grid06").removeAttribute("draggable");
    document.getElementById("Grid06").setAttribute("style", "background-color:rgb(33, 32, 30)");
    document.getElementById("Grid06").innerText = " "
    document.getElementById("Grid12").removeAttribute("class");
    document.getElementById("Grid12").removeAttribute("draggable");
    document.getElementById("Grid12").removeAttribute("onclick");
    document.getElementById("Grid12").removeAttribute("ondragstart");
    document.getElementById("Grid12").removeAttribute("ondragend");
    document.getElementById("Grid12").removeAttribute("draggable");
    document.getElementById("Grid12").setAttribute("style", "background-color:rgb(33, 32, 30)");
    document.getElementById("Grid12").innerText = " "
    document.getElementById("Grid13").removeAttribute("class");
    document.getElementById("Grid13").removeAttribute("draggable");
    document.getElementById("Grid13").removeAttribute("onclick");
    document.getElementById("Grid13").removeAttribute("ondragstart");
    document.getElementById("Grid13").removeAttribute("ondragend");
    document.getElementById("Grid13").removeAttribute("draggable");
    document.getElementById("Grid13").setAttribute("style", "background-color:rgb(33, 32, 30)");
    document.getElementById("Grid13").innerText = " "
    document.getElementById("Grid14").removeAttribute("class");
    document.getElementById("Grid14").removeAttribute("draggable");
    document.getElementById("Grid14").removeAttribute("onclick");
    document.getElementById("Grid14").removeAttribute("ondragstart");
    document.getElementById("Grid14").removeAttribute("ondragend");
    document.getElementById("Grid14").removeAttribute("draggable");
    document.getElementById("Grid14").setAttribute("style", "background-color:rgb(33, 32, 30)");
    document.getElementById("Grid14").innerText = " "
    document.getElementById("Grid15").removeAttribute("class");
    document.getElementById("Grid15").removeAttribute("draggable");
    document.getElementById("Grid15").removeAttribute("onclick");
    document.getElementById("Grid15").removeAttribute("ondragstart");
    document.getElementById("Grid15").removeAttribute("ondragend");
    document.getElementById("Grid15").removeAttribute("draggable");
    document.getElementById("Grid15").setAttribute("style", "background-color:rgb(33, 32, 30)");
    document.getElementById("Grid15").innerText = " "
    document.getElementById("Grid38").removeAttribute("class");
    document.getElementById("Grid38").removeAttribute("draggable");
    document.getElementById("Grid38").removeAttribute("onclick");
    document.getElementById("Grid38").removeAttribute("ondragstart");
    document.getElementById("Grid38").removeAttribute("ondragend");
    document.getElementById("Grid38").removeAttribute("draggable");
    document.getElementById("Grid38").setAttribute("style", "background-color:rgb(33, 32, 30)");
    document.getElementById("Grid38").innerText = " "
    document.getElementById("Grid39").removeAttribute("class");
    document.getElementById("Grid39").removeAttribute("draggable");
    document.getElementById("Grid39").removeAttribute("onclick");
    document.getElementById("Grid39").removeAttribute("ondragstart");
    document.getElementById("Grid39").removeAttribute("ondragend");
    document.getElementById("Grid39").removeAttribute("draggable");
    document.getElementById("Grid39").setAttribute("style", "background-color:rgb(33, 32, 30)");
    document.getElementById("Grid39").innerText = " "
}

function RemovedViewSpec() {
    document.getElementById("Grid28").removeAttribute("class");
    document.getElementById("Grid28").removeAttribute("draggable");
    document.getElementById("Grid28").removeAttribute("onclick");
    document.getElementById("Grid28").removeAttribute("ondragstart");
    document.getElementById("Grid28").removeAttribute("ondragend");
    document.getElementById("Grid28").removeAttribute("draggable");
    document.getElementById("Grid28").setAttribute("style", "background-color:rgb(33, 32, 30)");
    document.getElementById("Grid28").innerText = " "
    document.getElementById("Grid29").removeAttribute("class");
    document.getElementById("Grid29").removeAttribute("draggable");
    document.getElementById("Grid29").removeAttribute("onclick");
    document.getElementById("Grid29").removeAttribute("ondragstart");
    document.getElementById("Grid29").removeAttribute("ondragend");
    document.getElementById("Grid29").removeAttribute("draggable");
    document.getElementById("Grid29").setAttribute("style", "background-color:rgb(33, 32, 30)");
    document.getElementById("Grid29").innerText = " "
    document.getElementById("Grid30").removeAttribute("class");
    document.getElementById("Grid30").removeAttribute("draggable");
    document.getElementById("Grid30").removeAttribute("onclick");
    document.getElementById("Grid30").removeAttribute("ondragstart");
    document.getElementById("Grid30").removeAttribute("ondragend");
    document.getElementById("Grid30").removeAttribute("draggable");
    document.getElementById("Grid30").setAttribute("style", "background-color:rgb(33, 32, 30)");
    document.getElementById("Grid30").innerText = " "
}

function btnSaveImage() {
    html2canvas(document.getElementById('capture')).then(function(canvas) {
        let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        image.backgroundColor = "black";
        downloadImage(image, 'TBC_Comp.png')
    });
}

function downloadImage(data, filename) { // Save Download image
    let a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
}

function btnClearall() {
    window.location = window.location.href.split("?")[0];
}

function btnCopyLink() {
    SetURLData(window.location.origin + "?" + mainString)
}

function btnFaq() {
    document.getElementById("modal-bg").style.visibility = "visible"
    document.getElementById("modal-close").style.visibility = "visible"
}

function mouseClickCloseModal() {
    document.getElementById("modal-bg").style.visibility = "hidden"
    document.getElementById("modal-close").style.visibility = "hidden"
}

function SetURLData(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

function GetURLData() { // search link
    if (window.location.search != "") {
        let urlString = window.location.search
        urlString = urlString.substring(1)
        let myArray = []
        for (let i = 0; i < urlString.length; i += 4) {
            myArray.push(urlString.substr(i, 4))
        }
        myArray.forEach(item => {
            document.getElementById(item.substr(0, 2)).innerText = SetNameFromNumber(item.substr(2, 4))
            document.getElementById(item.substr(0, 2)).style.backgroundColor = SetColorFromNumber(item.substr(2, 4))
            document.getElementById(item.substr(0, 2)).style.borderColor = "rgb(0, 0, 0)"
            partyData[item.substr(0, 2)].color = SetColorFromNumber(item.substr(2, 4))
            partyData[item.substr(0, 2)].name = SetNameFromNumber(item.substr(2, 4))
            partyData[item.substr(0, 2)].number = item.substr(2, 4)
        });
    }
    SetDisplay()
}

function StringsSetup() {
    mainString = ""
    Object.keys(partyData).forEach(function(key) {
        let value = partyData[key];
        if (value.name !== null) {
            mainString += (key + value.number)
        }
    })
}

function SetTemplateData(data) {
    ClearParty()
    ClearData()
    let urlString = data
        // urlString = urlString.substring(1)
    let myArray = []
    for (let i = 0; i < urlString.length; i += 4) {
        myArray.push(urlString.substr(i, 4))
    }
    myArray.forEach(item => {
        document.getElementById(item.substr(0, 2)).innerText = SetNameFromNumber(item.substr(2, 4))
        document.getElementById(item.substr(0, 2)).style.backgroundColor = SetColorFromNumber(item.substr(2, 4))
        document.getElementById(item.substr(0, 2)).style.borderColor = "rgb(0, 0, 0)"
        partyData[item.substr(0, 2)].color = SetColorFromNumber(item.substr(2, 4))
        partyData[item.substr(0, 2)].name = SetNameFromNumber(item.substr(2, 4))
        partyData[item.substr(0, 2)].number = item.substr(2, 4)
    });
    SetDisplay()
}

function btnTemplate(event) {
    switch (event.target.id) {
        case "dropbtn01":
            SetTemplateData("111221082501011106100713")
            break;
        case "dropbtn02":
            SetTemplateData("160217061805210822222501011102250312061007130815")
            break;
        case "dropbtn03":
            SetTemplateData("11171412152016021706180419052021210822242322241925010127021103250403061007130815")
            break;
        case "dropbtn04":
            SetTemplateData("1021111712171326141215201602170618041904202121072224232424012519012702110325040305200614071308100915")
            break;
        case "dropbtn05":
            SetTemplateData("1021111512081307140115191602171118041904202121242224232424012519012702120326041705200613071408100903")
            break;
        default:
            break;
    }
    document.getElementById("dropdownitems").style.display = "none";
}

function mouseEnterTemplate() {
    document.getElementById("dropdownitems").style.display = "block";
}

function mouseLeaveTemplate() {
    document.getElementById("dropdownitems").style.display = "none";
}

function SetColorFromNumber(num) {
    switch (num) {
        case "01":
            return "rgb(255, 124, 10)"
        case "02":
            return "rgb(255, 124, 10)"
        case "03":
            return "rgb(255, 124, 10)"
        case "04":
            return "rgb(170, 211, 114)"
        case "05":
            return "rgb(170, 211, 114)"
        case "06":
            return "rgb(170, 211, 114)"
        case "07":
            return "rgb(63, 199, 235)"
        case "08":
            return "rgb(63, 199, 235)"
        case "09":
            return "rgb(63, 199, 235)"
        case "10":
            return "rgb(244, 140, 186)"
        case "11":
            return "rgb(244, 140, 186)"
        case "12":
            return "rgb(244, 140, 186)"
        case "13":
            return "rgb(255, 255, 255)"
        case "14":
            return "rgb(255, 255, 255)"
        case "15":
            return "rgb(255, 255, 255)"
        case "16":
            return "rgb(255, 244, 104)"
        case "17":
            return "rgb(255, 244, 104)"
        case "18":
            return "rgb(255, 244, 104)"
        case "19":
            return "rgb(0, 112, 221)"
        case "20":
            return "rgb(0, 112, 221)"
        case "21":
            return "rgb(0, 112, 221)"
        case "22":
            return "rgb(148, 130, 201)"
        case "23":
            return "rgb(148, 130, 201)"
        case "24":
            return "rgb(148, 130, 201)"
        case "25":
            return "rgb(198, 155, 109)"
        case "26":
            return "rgb(198, 155, 109)"
        case "27":
            return "rgb(198, 155, 109)"
        case "28":
            return "rgb(255, 124, 10)"
        case "29":
            return "rgb(170, 211, 114)"
        case "30":
            return "rgb(63, 199, 235)"
        case "31":
            return "rgb(244, 140, 186)"
        case "32":
            return "rgb(255, 255, 255)"
        case "33":
            return "rgb(255, 244, 104)"
        case "34":
            return "rgb(0, 112, 221)"
        case "35":
            return "rgb(148, 130, 201)"
        case "36":
            return "rgb(198, 155, 109)"
        default:
            break
    }
}

function SetNameFromNumber(num) {
    switch (num) {
        case "01":
            return "Balance"
        case "02":
            return "Feral"
        case "03":
            return "Restoration"
        case "04":
            return "Beast Mastery"
        case "05":
            return "Marksmanship"
        case "06":
            return "Survival"
        case "07":
            return "Arcane"
        case "08":
            return "Fire"
        case "09":
            return "Frost"
        case "10":
            return "Holy"
        case "11":
            return "Protection"
        case "12":
            return "Retribution"
        case "13":
            return "Discipline"
        case "14":
            return "Holy"
        case "15":
            return "Shadow"
        case "16":
            return "Assassination"
        case "17":
            return "Combat"
        case "18":
            return "Subtlety"
        case "19":
            return "Elemental"
        case "20":
            return "Enhancement"
        case "21":
            return "Restoration"
        case "22":
            return "Affliction"
        case "23":
            return "Demonology"
        case "24":
            return "Destruction"
        case "25":
            return "Arms"
        case "26":
            return "Fury"
        case "27":
            return "Protection"
        case "28":
            return "Druid"
        case "29":
            return "Hunter"
        case "30":
            return "Mage"
        case "31":
            return "Paladin"
        case "32":
            return "Priest"
        case "33":
            return "Rogue"
        case "34":
            return "Shaman"
        case "35":
            return "Warlock"
        case "36":
            return "Warrior"
        default:
            break
    }
}

function GetNumberFromNameAndColor(name, color) {
    switch (true) {
        case (name == "Feral" && color == "rgb(255, 124, 10)"):
            return "02"
        case (name == "Balance" && color == "rgb(255, 124, 10)"):
            return "01"
        case (name == "Restoration" && color == "rgb(255, 124, 10)"):
            return "03"
        case (name == "Beast Mastery" && color == "rgb(170, 211, 114)"):
            return "04"
        case (name == "Marksmanship" && color == "rgb(170, 211, 114)"):
            return "05"
        case (name == "Survival" && color == "rgb(170, 211, 114)"):
            return "06"
        case (name == "Arcane" && color == "rgb(63, 199, 235)"):
            return "07"
        case (name == "Fire" && color == "rgb(63, 199, 235)"):
            return "08"
        case (name == "Frost" && color == "rgb(63, 199, 235)"):
            return "09"
        case (name == "Holy" && color == "rgb(244, 140, 186)"):
            return "10"
        case (name == "Protection" && color == "rgb(244, 140, 186)"):
            return "11"
        case (name == "Retribution" && color == "rgb(244, 140, 186)"):
            return "12"
        case (name == "Discipline" && color == "rgb(255, 255, 255)"):
            return "13"
        case (name == "Holy" && color == "rgb(255, 255, 255)"):
            return "14"
        case (name == "Shadow" && color == "rgb(255, 255, 255)"):
            return "15"
        case (name == "Assassination" && color == "rgb(255, 244, 104)"):
            return "16"
        case (name == "Combat" && color == "rgb(255, 244, 104)"):
            return "17"
        case (name == "Subtlety" && color == "rgb(255, 244, 104)"):
            return "18"
        case (name == "Elemental" && color == "rgb(0, 112, 221)"):
            return "19"
        case (name == "Enhancement" && color == "rgb(0, 112, 221)"):
            return "20"
        case (name == "Restoration" && color == "rgb(0, 112, 221)"):
            return "21"
        case (name == "Affliction" && color == "rgb(148, 130, 201)"):
            return "22"
        case (name == "Demonology" && color == "rgb(148, 130, 201)"):
            return "23"
        case (name == "Destruction" && color == "rgb(148, 130, 201)"):
            return "24"
        case (name == "Arms" && color == "rgb(198, 155, 109)"):
            return "25"
        case (name == "Fury" && color == "rgb(198, 155, 109)"):
            return "26"
        case (name == "Protection" && color == "rgb(198, 155, 109)"):
            return "27"
        case (name == "Druid" && color == "rgb(255, 124, 10)"):
            return "28"
        case (name == "Hunter" && color == "rgb(170, 211, 114)"):
            return "29"
        case (name == "Mage" && color == "rgb(63, 199, 235)"):
            return "30"
        case (name == "Paladin" && color == "rgb(244, 140, 186)"):
            return "31"
        case (name == "Priest" && color == "rgb(255, 255, 255)"):
            return "32"
        case (name == "Rogue" && color == "rgb(255, 244, 104)"):
            return "33"
        case (name == "Shaman" && color == "rgb(0, 112, 221)"):
            return "34"
        case (name == "Warlock" && color == "rgb(148, 130, 201)"):
            return "35"
        case (name == "Warrior" && color == "rgb(198, 155, 109)"):
            return "36"
        default:
            break;
    }
}

function SetDataFromNumber(num) {
    switch (num) {
        case "01": //druid B
            InfoData.ReducedArmorDruid += 1
            document.getElementById("aReducedArmorDruid").innerText = InfoData.ReducedArmorDruid
            document.getElementById("aReducedArmorDruid").style.color = 'LimeGreen'
            InfoData.PhysicalHit += 1
            document.getElementById("aPhysicalHit").innerText = InfoData.PhysicalHit
            document.getElementById("aPhysicalHit").style.color = 'LimeGreen'
            InfoData.SpellCrit += 1
            document.getElementById("aSpellCrit").innerText = InfoData.SpellCrit
            document.getElementById("aSpellCrit").style.color = 'LimeGreen'
            InfoData.ReducedHitBalance += 1
            document.getElementById("aReducedHitBalance").innerText = InfoData.ReducedHitBalance
            document.getElementById("aReducedHitBalance").style.color = 'LimeGreen'
            InfoData.StatsStatic += 1
            document.getElementById("aStatsStatic").innerText = InfoData.StatsStatic
            document.getElementById("aStatsStatic").style.color = 'LimeGreen'
            InfoData.Players += 1
            InfoData.Range += 1
            document.getElementById("arange").innerText = InfoData.Range
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "02": //F
            InfoData.ReducedAttackPower += 1
            document.getElementById("aReducedAttackPower").innerText = InfoData.ReducedAttackPower
            document.getElementById("aReducedAttackPower").style.color = 'LimeGreen'
            InfoData.BleedDamage += 1
            document.getElementById("aBleedDamage").innerText = InfoData.BleedDamage
            document.getElementById("aBleedDamage").style.color = 'LimeGreen'
            InfoData.ReducedArmorDruid += 1
            document.getElementById("aReducedArmorDruid").innerText = InfoData.ReducedArmorDruid
            document.getElementById("aReducedArmorDruid").style.color = 'LimeGreen'
            InfoData.MeleeCrit += 1
            document.getElementById("aMeleeCrit").innerText = InfoData.MeleeCrit
            document.getElementById("aMeleeCrit").style.color = 'LimeGreen'
            InfoData.StatsStatic += 1
            document.getElementById("aStatsStatic").innerText = InfoData.StatsStatic
            document.getElementById("aStatsStatic").style.color = 'LimeGreen'
            InfoData.Players += 1
            InfoData.Tank += 1
            document.getElementById("atank").innerText = InfoData.Tank
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "03": //R
            InfoData.StatsStatic += 1
            document.getElementById("aStatsStatic").innerText = InfoData.StatsStatic
            document.getElementById("aStatsStatic").style.color = 'LimeGreen'
            InfoData.HealingReceived += 1
            document.getElementById("aHealingReceived").innerText = InfoData.HealingReceived
            document.getElementById("aHealingReceived").style.color = 'LimeGreen'
            InfoData.ReducedArmorDruid += 1
            document.getElementById("aReducedArmorDruid").innerText = InfoData.ReducedArmorDruid
            document.getElementById("aReducedArmorDruid").style.color = 'LimeGreen'
            InfoData.Players += 1
            InfoData.Heal += 1
            document.getElementById("aheal").innerText = InfoData.Heal
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "04": //hunter bm
            InfoData.ReducedPhysicalHit += 1
            document.getElementById("aReducedPhysicalHit").innerText = InfoData.ReducedPhysicalHit
            document.getElementById("aReducedPhysicalHit").style.color = 'LimeGreen'
            InfoData.Damage += 1
            document.getElementById("aDamage").innerText = InfoData.Damage
            document.getElementById("aDamage").style.color = 'LimeGreen'
            InfoData.Players += 1
            InfoData.Range += 1
            document.getElementById("arange").innerText = InfoData.Range
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "05": // marks
            InfoData.Players += 1
            InfoData.Range += 1
            document.getElementById("arange").innerText = InfoData.Range
            document.getElementById("aplayers").innerText = InfoData.Players
            InfoData.PlayerAttackPowerMarks += 1
            document.getElementById("aPlayerAttackPowerMarks").innerText = InfoData.PlayerAttackPowerMarks
            document.getElementById("aPlayerAttackPowerMarks").style.color = 'LimeGreen'
            InfoData.AttackPowerPHunter += 1
            document.getElementById("aAttackPowerPHunter").innerText = InfoData.AttackPowerPHunter
            document.getElementById("aAttackPowerPHunter").style.color = 'LimeGreen'
            InfoData.ReducedPhysicalHit += 1
            document.getElementById("aReducedPhysicalHit").innerText = InfoData.ReducedPhysicalHit
            document.getElementById("aReducedPhysicalHit").style.color = 'LimeGreen'
            break;
        case "06": //surv
            InfoData.PlayerAttackPower += 1
            document.getElementById("aPlayerAttackPower").innerText = InfoData.PlayerAttackPower
            document.getElementById("aPlayerAttackPower").style.color = 'LimeGreen'
            InfoData.ReducedPhysicalHit += 1
            document.getElementById("aReducedPhysicalHit").innerText = InfoData.ReducedPhysicalHit
            document.getElementById("aReducedPhysicalHit").style.color = 'LimeGreen'
            InfoData.Players += 1
            InfoData.Range += 1
            document.getElementById("arange").innerText = InfoData.Range
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "07": //mage arc
            InfoData.Players += 1
            InfoData.Range += 1
            InfoData.Intellect += 1
            document.getElementById("aIntellect").innerText = InfoData.Intellect
            document.getElementById("aIntellect").style.color = 'LimeGreen'
            document.getElementById("arange").innerText = InfoData.Range
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "08": //fire
            InfoData.Players += 1
            InfoData.Range += 1
            InfoData.Intellect += 1
            document.getElementById("aIntellect").innerText = InfoData.Intellect
            document.getElementById("aIntellect").style.color = 'LimeGreen'
            document.getElementById("arange").innerText = InfoData.Range
            document.getElementById("aplayers").innerText = InfoData.Players
            InfoData.FireDamageTaken += 1
            document.getElementById("aFireDamageTaken").innerText = InfoData.FireDamageTaken
            document.getElementById("aFireDamageTaken").style.color = 'LimeGreen'
            break;
        case "09": //Frost
            InfoData.PlayerFrostCrit += 1
            document.getElementById("aPlayerFrostCrit").innerText = InfoData.PlayerFrostCrit
            document.getElementById("aPlayerFrostCrit").style.color = 'LimeGreen'
            InfoData.Intellect += 1
            document.getElementById("aIntellect").innerText = InfoData.Intellect
            document.getElementById("aIntellect").style.color = 'LimeGreen'
            InfoData.Players += 1
            InfoData.Range += 1
            document.getElementById("arange").innerText = InfoData.Range
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "10": //paladin holy
            InfoData.StatsP += 1
            document.getElementById("aStatsP").innerText = InfoData.StatsP
            document.getElementById("aStatsP").style.color = 'LimeGreen'
            InfoData.Judgement += 1
            document.getElementById("aJudgement").innerText = InfoData.Judgement
            document.getElementById("aJudgement").style.color = 'LimeGreen'
            InfoData.AttackPowerR += 1
            document.getElementById("aAttackPowerR").innerText = InfoData.AttackPowerR
            document.getElementById("aAttackPowerR").style.color = 'LimeGreen'
            InfoData.ReducedThreat += 1
            document.getElementById("aReducedThreat").innerText = InfoData.ReducedThreat
            document.getElementById("aReducedThreat").style.color = 'LimeGreen'
            InfoData.ManaRestoration += 1
            document.getElementById("aManaRestoration").innerText = InfoData.ManaRestoration
            document.getElementById("aManaRestoration").style.color = 'LimeGreen'
            InfoData.Players += 1
            InfoData.Heal += 1
            document.getElementById("aheal").innerText = InfoData.Heal
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "11": // prot
            InfoData.StatsP += 1
            document.getElementById("aStatsP").innerText = InfoData.StatsP
            document.getElementById("aStatsP").style.color = 'LimeGreen'
            InfoData.Judgement += 1
            document.getElementById("aJudgement").innerText = InfoData.Judgement
            document.getElementById("aJudgement").style.color = 'LimeGreen'
            InfoData.AttackPowerR += 1
            document.getElementById("aAttackPowerR").innerText = InfoData.AttackPowerR
            document.getElementById("aAttackPowerR").style.color = 'LimeGreen'
            InfoData.ReducedThreat += 1
            document.getElementById("aReducedThreat").innerText = InfoData.ReducedThreat
            document.getElementById("aReducedThreat").style.color = 'LimeGreen'
            InfoData.ManaRestoration += 1
            document.getElementById("aManaRestoration").innerText = InfoData.ManaRestoration
            document.getElementById("aManaRestoration").style.color = 'LimeGreen'
            InfoData.Players += 1
            InfoData.Tank += 1
            document.getElementById("atank").innerText = InfoData.Tank
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "12": // ret
            InfoData.Crit += 1
            document.getElementById("aCrit").innerText = InfoData.Crit
            document.getElementById("aCrit").style.color = 'LimeGreen'
            InfoData.Judgement += 1
            document.getElementById("aJudgement").innerText = InfoData.Judgement
            document.getElementById("aJudgement").style.color = 'LimeGreen'
            InfoData.DamageRet += 1
            document.getElementById("aDamageRet").innerText = InfoData.DamageRet
            document.getElementById("aDamageRet").style.color = 'LimeGreen'
            InfoData.Players += 1
            InfoData.Melee += 1
            document.getElementById("amelee").innerText = InfoData.Melee
            document.getElementById("aplayers").innerText = InfoData.Players
            InfoData.StatsP += 1
            document.getElementById("aStatsP").innerText = InfoData.StatsP
            document.getElementById("aStatsP").style.color = 'LimeGreen'
            InfoData.AttackPowerR += 1
            document.getElementById("aAttackPowerR").innerText = InfoData.AttackPowerR
            document.getElementById("aAttackPowerR").style.color = 'LimeGreen'
            InfoData.ReducedThreat += 1
            document.getElementById("aReducedThreat").innerText = InfoData.ReducedThreat
            document.getElementById("aReducedThreat").style.color = 'LimeGreen'
            InfoData.ManaRestoration += 1
            document.getElementById("aManaRestoration").innerText = InfoData.ManaRestoration
            document.getElementById("aManaRestoration").style.color = 'LimeGreen'
            break;
        case "13": //priest disc
            InfoData.Players += 1
            InfoData.Heal += 1
            InfoData.StaminaR += 1
            document.getElementById("aStaminaR").innerText = InfoData.StaminaR
            document.getElementById("aStaminaR").style.color = 'LimeGreen'
            InfoData.Spirit += 1
            document.getElementById("aSpirit").innerText = InfoData.Spirit
            document.getElementById("aSpirit").style.color = 'LimeGreen'
            document.getElementById("aheal").innerText = InfoData.Heal
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "14": // holy
            InfoData.Players += 1
            InfoData.Heal += 1
            document.getElementById("aheal").innerText = InfoData.Heal
            document.getElementById("aplayers").innerText = InfoData.Players
            InfoData.StaminaR += 1
            document.getElementById("aStaminaR").innerText = InfoData.StaminaR
            document.getElementById("aStaminaR").style.color = 'LimeGreen'
            break;
        case "15": //shadow
            InfoData.StaminaR += 1
            document.getElementById("aStaminaR").innerText = InfoData.StaminaR
            document.getElementById("aStaminaR").style.color = 'LimeGreen'
            InfoData.ShadowDamageTaken += 1
            document.getElementById("aShadowDamageTaken").innerText = InfoData.ShadowDamageTaken
            document.getElementById("aShadowDamageTaken").style.color = 'LimeGreen'
            InfoData.ManaReplenishment += 1
            document.getElementById("aManaReplenishment").innerText = InfoData.ManaReplenishment
            document.getElementById("aManaReplenishment").style.color = 'LimeGreen'
            InfoData.Players += 1
            InfoData.Range += 1
            document.getElementById("arange").innerText = InfoData.Range
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "16": //rogue A
            InfoData.ReducedArmorAssassination += 1
            document.getElementById("aReducedArmorAssassination").innerText = InfoData.ReducedArmorAssassination
            document.getElementById("aReducedArmorAssassination").style.color = 'LimeGreen'
            InfoData.Players += 1
            InfoData.Melee += 1
            document.getElementById("amelee").innerText = InfoData.Melee
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "17": //C
            InfoData.ReducedArmorRogue += 1
            document.getElementById("aReducedArmorRogue").innerText = InfoData.ReducedArmorRogue
            document.getElementById("aReducedArmorRogue").style.color = 'LimeGreen'
            InfoData.Players += 1
            InfoData.Melee += 1
            document.getElementById("amelee").innerText = InfoData.Melee
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "18": //S
            InfoData.ReducedArmorRogue += 1
            document.getElementById("aReducedArmorRogue").innerText = InfoData.ReducedArmorRogue
            document.getElementById("aReducedArmorRogue").style.color = 'LimeGreen'
            InfoData.Players += 1
            InfoData.Melee += 1
            document.getElementById("amelee").innerText = InfoData.Melee
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "19": //shaman ele
            InfoData.ManaRestorationShaman += 1
            document.getElementById("aManaRestorationShaman").innerText = InfoData.ManaRestorationShaman
            document.getElementById("aManaRestorationShaman").style.color = 'LimeGreen'
            InfoData.AttackCastingSpeed += 1
            document.getElementById("aAttackCastingSpeed").innerText = InfoData.AttackCastingSpeed
            document.getElementById("aAttackCastingSpeed").style.color = 'LimeGreen'
            InfoData.Strength += 1
            document.getElementById("aStrength").innerText = InfoData.Strength
            document.getElementById("aStrength").style.color = 'LimeGreen'
            InfoData.Agility += 1
            document.getElementById("aAgility").innerText = InfoData.Agility
            document.getElementById("aAgility").style.color = 'LimeGreen'
            InfoData.SpellDamage += 1
            document.getElementById("aSpellDamage").innerText = InfoData.SpellDamage
            document.getElementById("aSpellDamage").style.color = 'LimeGreen'
            InfoData.SpellHit += 1
            document.getElementById("aSpellHit").innerText = InfoData.SpellHit
            document.getElementById("aSpellHit").style.color = 'LimeGreen'
            InfoData.Players += 1
            InfoData.Range += 1
            document.getElementById("arange").innerText = InfoData.Range
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "20": // enh
            InfoData.ManaRestorationShaman += 1
            document.getElementById("aManaRestorationShaman").innerText = InfoData.ManaRestorationShaman
            document.getElementById("aManaRestorationShaman").style.color = 'LimeGreen'
            InfoData.Strength += 1
            document.getElementById("aStrength").innerText = InfoData.Strength
            document.getElementById("aStrength").style.color = 'LimeGreen'
            InfoData.Agility += 1
            document.getElementById("aAgility").innerText = InfoData.Agility
            document.getElementById("aAgility").style.color = 'LimeGreen'
            InfoData.AttackPowerPShaman += 1
            document.getElementById("aAttackPowerPShaman").innerText = InfoData.AttackPowerPShaman
            document.getElementById("aAttackPowerPShaman").style.color = 'LimeGreen'
            InfoData.AttackCastingSpeed += 1
            document.getElementById("aAttackCastingSpeed").innerText = InfoData.AttackCastingSpeed
            document.getElementById("aAttackCastingSpeed").style.color = 'LimeGreen'
            InfoData.ExtraMeleeAttack += 1
            document.getElementById("aExtraMeleeAttack").innerText = InfoData.ExtraMeleeAttack
            document.getElementById("aExtraMeleeAttack").style.color = 'LimeGreen'
            InfoData.SpellDamage += 1
            document.getElementById("aSpellDamage").innerText = InfoData.SpellDamage
            document.getElementById("aSpellDamage").style.color = 'LimeGreen'
            InfoData.Players += 1
            InfoData.Melee += 1
            document.getElementById("amelee").innerText = InfoData.Melee
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "21": //resto
            InfoData.ManaRestorationShaman += 1
            document.getElementById("aManaRestorationShaman").innerText = InfoData.ManaRestorationShaman
            document.getElementById("aManaRestorationShaman").style.color = 'LimeGreen'
            InfoData.ManaRestorationResto += 1
            document.getElementById("aManaRestorationResto").innerText = InfoData.ManaRestorationResto
            document.getElementById("aManaRestorationResto").style.color = 'LimeGreen'
            InfoData.Strength += 1
            document.getElementById("aStrength").innerText = InfoData.Strength
            document.getElementById("aStrength").style.color = 'LimeGreen'
            InfoData.Agility += 1
            document.getElementById("aAgility").innerText = InfoData.Agility
            document.getElementById("aAgility").style.color = 'LimeGreen'
            InfoData.SpellDamage += 1
            document.getElementById("aSpellDamage").innerText = InfoData.SpellDamage
            document.getElementById("aSpellDamage").style.color = 'LimeGreen'
            InfoData.AttackCastingSpeed += 1
            document.getElementById("aAttackCastingSpeed").innerText = InfoData.AttackCastingSpeed
            document.getElementById("aAttackCastingSpeed").style.color = 'LimeGreen'
            InfoData.Heal += 1
            InfoData.Players += 1
            document.getElementById("aheal").innerText = InfoData.Heal
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "22": //lock  aff
            InfoData.Players += 1
            InfoData.Range += 1
            document.getElementById("arange").innerText = InfoData.Range
            document.getElementById("aplayers").innerText = InfoData.Players
            InfoData.IncreasedSpellDamageTaken += 1
            document.getElementById("aIncreasedSpellDamageTaken").innerText = InfoData.IncreasedSpellDamageTaken
            document.getElementById("aIncreasedSpellDamageTaken").style.color = 'LimeGreen'
            InfoData.ReducedPhysicalDamage += 1
            document.getElementById("aReducedPhysicalDamage").innerText = InfoData.ReducedPhysicalDamage
            document.getElementById("aReducedPhysicalDamage").style.color = 'LimeGreen'
            InfoData.ShadowDamageTakenWarlock += 1
            document.getElementById("aShadowDamageTakenWarlock").innerText = InfoData.ShadowDamageTakenWarlock
            document.getElementById("aShadowDamageTakenWarlock").style.color = 'LimeGreen'
            InfoData.StaminaP += 1
            document.getElementById("aStaminaP").innerText = InfoData.StaminaP
            document.getElementById("aStaminaP").style.color = 'LimeGreen'
            InfoData.ReducedArmorWarlock += 1
            document.getElementById("aReducedArmorWarlock").innerText = InfoData.ReducedArmorWarlock
            document.getElementById("aReducedArmorWarlock").style.color = 'LimeGreen'
            break;
        case "23": // demo
            InfoData.Players += 1
            InfoData.Range += 1
            document.getElementById("arange").innerText = InfoData.Range
            document.getElementById("aplayers").innerText = InfoData.Players

            InfoData.StaminaPartyDemonology += 1
            document.getElementById("aStaminaPartyDemonology").innerText = InfoData.StaminaPartyDemonology
            document.getElementById("aStaminaPartyDemonology").style.color = 'LimeGreen'

            InfoData.SpellDamageTaken += 1
            document.getElementById("aSpellDamageTaken").innerText = InfoData.SpellDamageTaken
            document.getElementById("aSpellDamageTaken").style.color = 'LimeGreen'

            InfoData.ShadowDamageTakenWarlock += 1
            document.getElementById("aShadowDamageTakenWarlock").innerText = InfoData.ShadowDamageTakenWarlock
            document.getElementById("aShadowDamageTakenWarlock").style.color = 'LimeGreen'

            InfoData.ReducedArmorWarlock += 1
            document.getElementById("aReducedArmorWarlock").innerText = InfoData.ReducedArmorWarlock
            document.getElementById("aReducedArmorWarlock").style.color = 'LimeGreen'
            break;
        case "24": // destro
            InfoData.Players += 1
            InfoData.Range += 1
            document.getElementById("arange").innerText = InfoData.Range
            document.getElementById("aplayers").innerText = InfoData.Players
            InfoData.StaminaP += 1
            document.getElementById("aStaminaP").innerText = InfoData.StaminaP
            document.getElementById("aStaminaP").style.color = 'LimeGreen'
            InfoData.SpellDamageTaken += 1
            document.getElementById("aSpellDamageTaken").innerText = InfoData.SpellDamageTaken
            document.getElementById("aSpellDamageTaken").style.color = 'LimeGreen'
            InfoData.ShadowDamageTakenWarlock += 1
            document.getElementById("aShadowDamageTakenWarlock").innerText = InfoData.ShadowDamageTakenWarlock
            document.getElementById("aShadowDamageTakenWarlock").style.color = 'LimeGreen'
            InfoData.ReducedArmorWarlock += 1
            document.getElementById("aReducedArmorWarlock").innerText = InfoData.ReducedArmorWarlock
            document.getElementById("aReducedArmorWarlock").style.color = 'LimeGreen'
            break;
        case "25": //war
            InfoData.PhysicalDamageTaken += 1
            document.getElementById("aPhysicalDamageTaken").innerText = InfoData.PhysicalDamageTaken
            document.getElementById("aPhysicalDamageTaken").style.color = 'LimeGreen'
            InfoData.Health += 1
            document.getElementById("aHealth").innerText = InfoData.Health
            document.getElementById("aHealth").style.color = 'LimeGreen'
            InfoData.AttackPowerPWarrior += 1
            document.getElementById("aAttackPowerPWarrior").innerText = InfoData.AttackPowerPWarrior
            document.getElementById("aAttackPowerPWarrior").style.color = 'LimeGreen'
            InfoData.ReducedArmorWarrior += 1
            document.getElementById("aReducedArmorWarrior").innerText = InfoData.ReducedArmorWarrior
            document.getElementById("aReducedArmorWarrior").style.color = 'LimeGreen'
            InfoData.ReducedAttackPower += 1
            document.getElementById("aReducedAttackPower").innerText = InfoData.ReducedAttackPower
            document.getElementById("aReducedAttackPower").style.color = 'LimeGreen'
            InfoData.ReducedAttackSpeed += 1
            document.getElementById("aReducedAttackSpeed").innerText = InfoData.ReducedAttackSpeed
            document.getElementById("aReducedAttackSpeed").style.color = 'LimeGreen'
            InfoData.Players += 1
            InfoData.Melee += 1
            document.getElementById("amelee").innerText = InfoData.Melee
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "26": // fury
            InfoData.Health += 1
            document.getElementById("aHealth").innerText = InfoData.Health
            document.getElementById("aHealth").style.color = 'LimeGreen'
            InfoData.AttackPowerPWarrior += 1
            document.getElementById("aAttackPowerPWarrior").innerText = InfoData.AttackPowerPWarrior
            document.getElementById("aAttackPowerPWarrior").style.color = 'LimeGreen'
            InfoData.ReducedArmorWarrior += 1
            document.getElementById("aReducedArmorWarrior").innerText = InfoData.ReducedArmorWarrior
            document.getElementById("aReducedArmorWarrior").style.color = 'LimeGreen'
            InfoData.ReducedAttackPower += 1
            document.getElementById("aReducedAttackPower").innerText = InfoData.ReducedAttackPower
            document.getElementById("aReducedAttackPower").style.color = 'LimeGreen'
            InfoData.ReducedAttackSpeed += 1
            document.getElementById("aReducedAttackSpeed").innerText = InfoData.ReducedAttackSpeed
            document.getElementById("aReducedAttackSpeed").style.color = 'LimeGreen'
            InfoData.Players += 1
            InfoData.Melee += 1
            document.getElementById("amelee").innerText = InfoData.Melee
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "27": // prot
            InfoData.Health += 1
            document.getElementById("aHealth").innerText = InfoData.Health
            document.getElementById("aHealth").style.color = 'LimeGreen'
            InfoData.AttackPowerPWarrior += 1
            document.getElementById("aAttackPowerPWarrior").innerText = InfoData.AttackPowerPWarrior
            document.getElementById("aAttackPowerPWarrior").style.color = 'LimeGreen'
            InfoData.ReducedArmorWarrior += 1
            document.getElementById("aReducedArmorWarrior").innerText = InfoData.ReducedArmorWarrior
            document.getElementById("aReducedArmorWarrior").style.color = 'LimeGreen'
            InfoData.ReducedAttackPower += 1
            document.getElementById("aReducedAttackPower").innerText = InfoData.ReducedAttackPower
            document.getElementById("aReducedAttackPower").style.color = 'LimeGreen'
            InfoData.ReducedAttackSpeed += 1
            document.getElementById("aReducedAttackSpeed").innerText = InfoData.ReducedAttackSpeed
            document.getElementById("aReducedAttackSpeed").style.color = 'LimeGreen'
            InfoData.Tank += 1
            document.getElementById("atank").innerText = InfoData.Tank
            InfoData.Players += 1
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "28":
            InfoData.Players += 1
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "29":
            InfoData.Players += 1
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "30":
            InfoData.Players += 1
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "31":
            InfoData.Players += 1
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "32":
            InfoData.Players += 1
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "33":
            InfoData.Players += 1
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "34":
            InfoData.Players += 1
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "35":
            InfoData.Players += 1
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        case "36":
            InfoData.Players += 1
            document.getElementById("aplayers").innerText = InfoData.Players
            break;
        default:
            break
    }
}

function preloader() {
    if (document.images) {

        let img1 = new Image();
        let img2 = new Image();
        let img3 = new Image();
        let img4 = new Image();
        let img5 = new Image();
        let img6 = new Image();
        let img7 = new Image();
        let img8 = new Image();
        let img9 = new Image();
        let img10 = new Image();
        let img11 = new Image();
        let img12 = new Image();
        let img13 = new Image();
        let img14 = new Image();
        let img15 = new Image();
        let img16 = new Image();
        let img17 = new Image();
        let img18 = new Image();
        let img19 = new Image();
        let img20 = new Image();
        let img21 = new Image();
        let img22 = new Image();
        let img23 = new Image();
        let img24 = new Image();
        let img25 = new Image();
        let img26 = new Image();
        let img27 = new Image();
        let img28 = new Image();
        let img29 = new Image();
        let img30 = new Image();
        let img31 = new Image();
        let img32 = new Image();
        let img33 = new Image();
        let img34 = new Image();
        let img35 = new Image();
        let img36 = new Image();
        let img37 = new Image();
        let img38 = new Image();
        let img39 = new Image();
        let img40 = new Image();
        let img41 = new Image();
        let img42 = new Image();
        let img43 = new Image();
        let img44 = new Image();
        let img45 = new Image();
        let img46 = new Image();
        let img47 = new Image();
        let img48 = new Image();
        let img49 = new Image();
        let img50 = new Image();
        let img51 = new Image();

        img1.src = "imgfolder/MeleeCritParty.jpg"
        img2.src = "imgfolder/SpellCritPartyDruid.jpg"
        img3.src = "imgfolder/spellhitParty.jpg"
        img4.src = "imgfolder/healthParty.jpg"
        img5.src = "imgfolder/StaminaParty.jpg"
        img6.src = "imgfolder/StaminaPartyDemonology.jpg"
        img7.src = "imgfolder/strengthParty.jpg"
        img8.src = "imgfolder/AgiltyParty.jpg"
        img9.src = "imgfolder/AttackPowerPartyWarrior.jpg"
        img10.src = "imgfolder/AttackPowerPartyShaman.jpg"
        img11.src = "imgfolder/AttackPowerPartyHunter.jpg"
        img12.src = "imgfolder/hero.jpg"
        img13.src = "imgfolder/ExtraAttackParty.jpg"
        img14.src = "imgfolder/DamageParty.jpg"
        img15.src = "imgfolder/DamagePartyRet.jpg"
        img16.src = "imgfolder/SpellDamageParty.jpg"
        img17.src = "imgfolder/HealingReceivedParty.jpg"
        img18.src = "imgfolder/ManaRestorationPartyShaman.jpg"
        img19.src = "imgfolder/ManaRestorationPartyResto.jpg"
        img20.src = "imgfolder/ManaReplenishmentParty.jpg"
        img21.src = "imgfolder/StatsStaticRaid.jpg"
        img22.src = "imgfolder/StaminaRaid.jpg"
        img23.src = "imgfolder/SpiritRaid.jpg"
        img24.src = "imgfolder/IntellectRaid.jpg"
        img25.src = "imgfolder/StatsPRaid.jpg"
        img26.src = "imgfolder/apRaid.jpg"
        img27.src = "imgfolder/ReducedThreatRaid.jpg"
        img28.src = "imgfolder/ManaRestorationParty.jpg"
        img29.src = "imgfolder/PlayerAPDebuff.jpg"
        img30.src = "imgfolder/PlayerAPDebuffMarks.jpg"
        img31.src = "imgfolder/PhysicalDamageDebuff.jpg"
        img32.src = "imgfolder/SpellDamageDebuff.jpg"
        img33.src = "imgfolder/IncreasedSpellDamageTakenDebuff.jpg"
        img34.src = "imgfolder/impshadowbolt.jpg"
        img35.src = "imgfolder/ShadowSpellDamageDebuff.jpg"
        img36.src = "imgfolder/FireDamageDebuff.jpg"
        img37.src = "imgfolder/PlayerCritDebuff.jpg"
        img38.src = "imgfolder/PlayerFrostCrit.jpg"
        img39.src = "imgfolder/playerHitDebuff.jpg"
        img40.src = "imgfolder/BleedDamage.jpg"
        img41.src = "imgfolder/reducedAP.jpg"
        img42.src = "imgfolder/reducedattackspeed.jpg"
        img43.src = "imgfolder/ArmorReducedWarrior.jpg"
        img44.src = "imgfolder/ArmorReducedWarlock.jpg"
        img45.src = "imgfolder/ArmorReducedDruid.jpg"
        img46.src = "imgfolder/ArmorReducedRogue.jpg"
        img47.src = "imgfolder/ArmorReducedRogueAssassination.jpg"
        img48.src = "imgfolder/ReducedPhysicalHit.jpg"
        img49.src = "imgfolder/ReducedHitBalance.jpg"
        img50.src = "imgfolder/ReducedPhysicalDamage.jpg"
        img51.src = "imgfolder/judgementdebuff.jpg"


    }
}

function addLoadEvent(func) {
    let oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}
addLoadEvent(preloader);