import { Account } from "./account";
import { Park } from "./park";
import "./style.css";
import { Vehicle } from "./vehicle";
import { VehicleType } from "./vehicletype";
var account = new Account();
var park = new Park();
var loginButton = document
    .getElementById("loginbutton")
    .addEventListener("click", login);
var parkInButton = document
    .getElementById("parkInButton")
    .addEventListener("click", parkIn);
fillVehicleTypeSelectList();
function login() {
    let userName = document.getElementById("username");
    let password = document.getElementById("password");
    account.login(userName.value, password.value);
}
function parkIn(event) {
    event.preventDefault();
    let plate = document.getElementById("plate");
    let vehicleType = (document.getElementById("vehicleTypeParentSelect"));
    park.parkIn(new Vehicle(plate.value, vehicleType.value));
    refreshList();
}
function parkOut(vehicle) {
    park.parkOut(vehicle);
    refreshList();
    refreshReportList();
}
function refreshList() {
    var table = document.getElementById("carlist");
    table.tBodies[1].innerHTML = "";
    const data = park.getParkIn();
    data.forEach(ticket => {
        var tbody = table.tBodies[1];
        var newRow = tbody.insertRow();
        let cell1 = newRow.insertCell(0);
        cell1.innerHTML = ticket.vehicle.plate;
        let cell2 = newRow.insertCell(1);
        cell2.innerHTML = ticket.vehicle.type.toString();
        let cell3 = newRow.insertCell(2);
        cell3.innerHTML = ticket.timeIn.toLocaleTimeString();
        let cell4 = newRow.insertCell(3);
        cell4.innerHTML = `<button style="color:red" id="delete_btn_${ticket.vehicle.plate}">ARAÇ ÇIKIŞ</button>`;
        var parkOutButton = document.getElementById(`delete_btn_${ticket.vehicle.plate}`);
        parkOutButton.addEventListener("click", () => parkOut(ticket.vehicle));
    });
}
function refreshReportList() {
    var table = document.getElementById("carlist1");
    table.tBodies[1].innerHTML = "";
    var parkOutList = park.getParkOut();
    parkOutList.forEach(ticket => {
        var tbody = table.tBodies[1];
        var newRow = tbody.insertRow();
        let cell1 = newRow.insertCell(0);
        cell1.innerHTML = ticket.vehicle.plate;
        let cell2 = newRow.insertCell(1);
        cell2.innerHTML = ticket.vehicle.type.toString();
        let cell3 = newRow.insertCell(2);
        cell3.innerHTML = ticket.timeIn.toLocaleTimeString();
        let cell4 = newRow.insertCell(3);
        cell4.innerHTML = ticket.timeOut.toLocaleTimeString();
        let cell5 = newRow.insertCell(4);
        cell5.innerHTML =
            (ticket.timeOut.getSeconds() - ticket.timeIn.getSeconds()).toString() + " Sn";
        let cell6 = newRow.insertCell(5);
        cell6.innerHTML = ticket.cost.toString() + " Tl";
    });
    var table = document.getElementById("carlist2");
    table.tBodies[1].innerHTML = "";
    var tbody = table.tBodies[1];
    let genelAdet = 0;
    let genelSure = 0;
    let genelCost = 0;
    for (let vehicleType in VehicleType) {
        let vehicleTypes = park.getParkOut().filter(x => x.vehicle.type === vehicleType);
        let totalSecond = 0;
        let totalCost = 0;
        vehicleTypes.forEach(x => {
            totalSecond += x.timeOut.getSeconds() - x.timeIn.getSeconds();
            totalCost += x.cost;
        });
        var newRow = tbody.insertRow();
        let cell1 = newRow.insertCell(0);
        cell1.innerHTML = vehicleType;
        let cell2 = newRow.insertCell(1);
        cell2.innerHTML = vehicleTypes.length.toString();
        let cell4 = newRow.insertCell(2);
        cell4.innerHTML = totalSecond.toString();
        let cell5 = newRow.insertCell(3);
        cell5.innerHTML = totalCost.toString();
        genelAdet += vehicleTypes.length;
        genelSure += totalSecond;
        genelCost += totalCost;
    }
    var newRow2 = tbody.insertRow();
    let cell16 = newRow2.insertCell(0);
    cell16.innerHTML = '<h3 style="color:red;">Toplam</h3>';
    let cell2 = newRow2.insertCell(1);
    cell2.innerHTML = genelAdet.toString();
    let cell3 = newRow2.insertCell(2);
    cell3.innerHTML = genelSure.toString();
    let cell4 = newRow2.insertCell(3);
    cell4.innerHTML = genelCost.toString();
}
function fillVehicleTypeSelectList() {
    let vehicleTypeParent = document.getElementById("selectlist");
    let selectVehicleTypeList = document.createElement("select");
    selectVehicleTypeList.id = "vehicleTypeParentSelect";
    selectVehicleTypeList.innerHTML = `<option value="none" selected disabled hidden>Araç Tipi Seçiniz`;
    vehicleTypeParent.appendChild(selectVehicleTypeList);
    for (let vehicleType in VehicleType) {
        let option = document.createElement("option");
        option.text = vehicleType;
        selectVehicleTypeList.appendChild(option);
    }
}
