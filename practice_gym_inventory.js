let choice;
let inventoryData = "";
let normalizedData = "";
let totalQuantity = 0;
let isValid = false;

do {
  console.log("---------- GYM INVENTORY----------");
  console.log("1. Nhap du lieu kiem ke kho");
  console.log("2. Boc tach va dem so luong thiet bi");
  console.log("3. Chuan hoa ma dinh danh");
  console.log("4. Xuat bao cao kiem ke");
  console.log("0. Thoat chuong trinh");
  console.log("---------------------------------");

  choice = prompt("Nhap lua chon cua ban:");

  switch (choice) {
    case "1": {
      let input = prompt("Nhap chuoi kiem ke:");

      if (input === null || input.trim() === "") {
        console.log("Du lieu khong duoc de trong!");
        inventoryData = "";
        normalizedData = "";
        totalQuantity = 0;
        isValid = false;
        break;
      }

      inventoryData = input.trim().toUpperCase();
      normalizedData = inventoryData;
      totalQuantity = 0;
      isValid = false;

      console.log("Nhap du lieu thanh cong!");
      console.log("Du lieu kho: " + inventoryData);

      break;
    }

    case "2": {
      if (inventoryData === "") {
        console.log("Vui long nhap du lieu kiem ke truoc!");
        break;
      }

      let remaining = normalizedData;
      let total = 0;
      let valid = true;

      while (remaining.length > 0) {
        let separator = remaining.indexOf("#");
        let item;

        if (separator === -1) {
          item = remaining;
          remaining = "";
        } else {
          item = remaining.slice(0, separator);
          remaining = remaining.slice(separator + 1);
        }

        let colon = item.indexOf(":");

        if (colon === -1) {
          valid = false;
          break;
        }

        let equipment = item.slice(0, colon).trim();
        let quantityText = item.slice(colon + 1).trim();
        let quantity = Number(quantityText);

        if (
          equipment === "" ||
          quantityText === "" ||
          !Number.isInteger(quantity) ||
          quantity < 0
        ) {
          valid = false;
          break;
        }

        if (
          equipment !== "DUMBBELL" &&
          equipment !== "BARBELL" &&
          equipment !== "TREADMILL" &&
          equipment !== "MAT" &&
          equipment !== "EQ-DB"
        ) {
          valid = false;
          break;
        }

        total += quantity;
      }

      if (!valid) {
        console.log("Chuoi du lieu kiem ke khong hop le!");
        isValid = false;
        totalQuantity = 0;
        break;
      }

      totalQuantity = total;
      isValid = true;

      console.log("Boc tach du lieu thanh cong!");
      console.log("Tong so luong thiet bi: " + totalQuantity);

      break;
    }

    case "3": {
      if (inventoryData === "") {
        console.log("Vui long nhap du lieu kiem ke truoc!");
        break;
      }

      normalizedData = inventoryData.replaceAll("DUMBBELL", "EQ-DB");

      console.log("Chuan hoa ma dinh danh thanh cong!");
      console.log("Du lieu sau chuan hoa: " + normalizedData);

      isValid = false;
      totalQuantity = 0;

      break;
    }

    case "4": {
      if (inventoryData === "") {
        console.log("Vui long nhap du lieu kiem ke truoc!");
        break;
      }

      let remaining = normalizedData;
      let total = 0;
      let valid = true;
      let report = "";

      while (remaining.length > 0) {
        let separator = remaining.indexOf("#");
        let item;

        if (separator === -1) {
          item = remaining;
          remaining = "";
        } else {
          item = remaining.slice(0, separator);
          remaining = remaining.slice(separator + 1);
        }

        let colon = item.indexOf(":");

        if (colon === -1) {
          valid = false;
          break;
        }

        let equipment = item.slice(0, colon).trim();
        let quantityText = item.slice(colon + 1).trim();
        let quantity = Number(quantityText);
        let equipmentName = "";

        if (
          equipment === "" ||
          quantityText === "" ||
          !Number.isInteger(quantity) ||
          quantity < 0
        ) {
          valid = false;
          break;
        }

        if (equipment === "DUMBBELL" || equipment === "EQ-DB") {
          equipmentName = "Ta don";
        } else if (equipment === "BARBELL") {
          equipmentName = "Don ta";
        } else if (equipment === "TREADMILL") {
          equipmentName = "May chay bo";
        } else if (equipment === "MAT") {
          equipmentName = "Tham yoga";
        } else {
          valid = false;
          break;
        }

        let warning = "";

        if (quantity < 10) {
          warning = "[CAN BAO TRI/B0 SUNG]";
        }

        report +=
          equipmentName.padEnd(20) +
          String(quantity).padStart(10) +
          "     " +
          warning +
          "\n";

        total += quantity;
      }

      if (!valid) {
        console.log("Du lieu khong hop le, khong the xuat bao cao!");
        isValid = false;
        break;
      }

      totalQuantity = total;
      isValid = true;

      console.log("             BAO CAO KIEM KE KHO GYM");
      console.log(
        "Thiet bi".padEnd(20) + "So luong".padStart(10) + "     Trang thai",
      );
      console.log(report);
      console.log(
        "Tong so luong:".padEnd(20) + String(totalQuantity).padStart(10),
      );

      break;
    }

    case "0":
      console.log("Da thoat chuong trinh!");
      break;

    default:
      console.log("Lua chon khong hop le! Vui long chon lai.");
  }
} while (choice !== "0");

/*
TRUONG HOP KIEM THU

1. Chuoi kiem ke hop le:
DUMBBELL:20#BARBELL:15#TREADMILL:05#MAT:40
Ket qua tong so luong: 80

2. Chuan hoa ma:
DUMBBELL:20#BARBELL:15
Ket qua: EQ-DB:20#BARBELL:15

3. Chuoi rong:
Nhap chuoi kiem ke: ""
Ket qua: Du lieu khong duoc de trong!

4. So luong duoi 10:
TREADMILL:05
Ket qua: Canh bao [CAN BAO TRI/B0 SUNG]
*/
