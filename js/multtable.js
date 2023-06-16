/*
	Name: Joan Montas
	Email: Joan_Montas@student.uml.edu
	File: multable.js
	GUI Assignment: GUI, HW3 : Creating an Interactive Dynamic Table
	Date:06/12/2023
	Description: Create a dynamic multiplication table.
        Certain error handling was added.
	Copyright (c) 2023 by Joan Montas. All rights reserved.
*/


/*
*Function Given a form and table's id, the form's value is use to
*@param Name    String String                   The ID of the form from where to gather argument
                                                and the ID of the table should be given
*@return        None                            As of now no output
*@throws "INVALID INPUT" "RESOURCE INPUT"       "INVALID INPUT" is thrown when poorly formated input
                                                is given. "RESOURCE INPUT" is thrown when the
                                                computation exceeds 2 minutes.
*/

function createtable(event, theformarg, thetablearg) {

    /* 
        allows single page web app
        https://www.w3schools.com/jsref/dom_obj_event.asp
    */
    event.preventDefault();

    /* the form to gather input */
    var theform = document.getElementById(theformarg);


    /* the tabke where to output */
    var thetable = document.getElementById(thetablearg);

    /* If there is already a table... remove and create again */
    if (thetable.rows.length != 0) {
        console.log("already a table");
        while (thetable.firstChild) {
            // https://www.w3schools.com/jsref/met_node_removechild.asp
            thetable.removeChild(thetable.firstChild);
        }
    }

    /* gather elements of the form*/
    var element0 = theform.elements[0];
    var element1 = theform.elements[1];
    var element2 = theform.elements[2];
    var element3 = theform.elements[3];

    /* gather value of inputs */
    var num0 = element0.value;
    var num1 = element1.value;
    var num2 = element2.value;
    var num3 = element3.value;

    /* Handle invalid input, meaningful message given */
    var flag = 0;
    if (num0.length == 0) {
        flag = 1;
        element0.style.backgroundColor = "red";
    }
    if (num1.length == 0) {
        flag = 1;
        element1.style.backgroundColor = "red";
    }
    if (num2.length == 0) {
        flag = 1;
        element2.style.backgroundColor = "red";
    }
    if (num3.length == 0) {
        flag = 1;
        element3.style.backgroundColor = "red";
    }
    if (flag == 1) {
        console.log("invalid inputs, not a number");
        var therow = document.createElement("tr");
        thedata = document.createElement("td");
        thedata.textContent = "INVALID INPUT: Not a number";
        thedata.style.backgroundColor = "red";
        therow.appendChild(thedata);
        thetable.appendChild(therow);
        throw "INVALID INPUT";
        return;
    }

    num0 = Number(num0);
    num1 = Number(num1);
    num2 = Number(num2);
    num3 = Number(num3);

    // change color to white, no errors
    element0.style.backgroundColor = "white";
    element1.style.backgroundColor = "white";
    element2.style.backgroundColor = "white";
    element3.style.backgroundColor = "white";

    /*
         Handle invalid input, meaningful message given
         Minimum should be lesser than Maximum
         Source of error is highlighted
    */
    if (num0 > num1) {
        flag = 1;
        element0.style.backgroundColor = "red";
        element1.style.backgroundColor = "red";
    }

    if (num2 > num3) {
        flag = 1;
        element2.style.backgroundColor = "red";
        element3.style.backgroundColor = "red";
    }

    if (flag == 1) {
        var therow = document.createElement("tr");
        thedata = document.createElement("td");
        thedata.textContent = "INVALID INPUT: Minimum value should be smaller than Maximum";
        thedata.style.backgroundColor = "red";
        therow.appendChild(thedata);
        thetable.appendChild(therow);
        throw "INVALID INPUT";
        return;
    }

    // change color to white, no errors
    element0.style.backgroundColor = "white";
    element1.style.backgroundColor = "white";
    element2.style.backgroundColor = "white";
    element3.style.backgroundColor = "white";

    /*
        The range should be set between -50 and 50
        The source of error are highlighted
    */
    if (num0 > 50 || num0 < -50) {
        flag = 1;
        element0.style.backgroundColor = "red";
    }

    if (num1 > 50 || num1 < -50) {
        flag = 1;
        element1.style.backgroundColor = "red";
    }

    if (num2 > 50 || num2 < -50) {
        flag = 1;
        element2.style.backgroundColor = "red";
    }

    if (num3 > 50 || num3 < -50) {
        flag = 1;
        element3.style.backgroundColor = "red";
    }

    if (flag == 1) {
        var therow = document.createElement("tr");
        thedata = document.createElement("td");
        thedata.textContent = "INVALID INPUT: Inputs shoud be witin range [-50, 50]";
        thedata.style.backgroundColor = "red";
        therow.appendChild(thedata);
        thetable.appendChild(therow);
        throw "INVALID INPUT";
        return;
    }

    // change color to white, no errors
    element0.style.backgroundColor = "white";
    element1.style.backgroundColor = "white";
    element2.style.backgroundColor = "white";
    element3.style.backgroundColor = "white";


    (theform.elements[0]).document
    /* The first data is empty */
    var therow = document.createElement("tr");
    var thedata = document.createElement("td");
    therow.appendChild(thedata);

    /* First row contains the number multiplicand */
    for (var i = num0; i <= num1; i++) {
        thedata = document.createElement("td");
        thedata.textContent = i;
        therow.appendChild(thedata);
    }
    thetable.appendChild(therow);
    
    /* 
        dynamically create the multiplicatibe table
        Handles event where computation time exceeds
        2 minutes
    */
    var initialunixtime = Date.now();
    var i = num2;
    var j = num0;
    while (i <= num3) {
        therow = document.createElement("tr");
        thedata = document.createElement("td");
        thedata.textContent = i;
        therow.appendChild(thedata);
        while (j <= num1) {
            var thedata = document.createElement("td");
            thedata.textContent = i * j;
            therow.appendChild(thedata);
            j++;
            /* Accounts for slow calculation */
            if ( Date.now() - initialunixtime >= 120000) {
                flag = 1
                thetable.innerHTML = "";
                var therow = document.createElement("tr");
                thedata = document.createElement("td");
                thedata.textContent = "RESOURCE ERROR: Computation was longer than 2 minutes";
                thedata.style.backgroundColor = "red";
                therow.appendChild(thedata);
                thetable.appendChild(therow);
                throw "RESOURCE ERROR";
                return;
            }
        };
        j = num0;
        thetable.appendChild(therow);
        i++;
    };

    /* The last row contains empties */
    therow = document.createElement("tr");
    thedata = document.createElement("td");
    therow.appendChild(thedata);
    for (var i = num0; i <= num1; i++) {
        thedata = document.createElement("td");
        thedata.textContent = "";
        therow.appendChild(thedata);
    }
    thetable.appendChild(therow);
};

// https://plainenglish.io/blog/passing-arguments-to-event-listeners-in-javascript-1a81bc397ecb
theform.addEventListener("submit", (event) => { createtable(event,"theform", "thetable")});
