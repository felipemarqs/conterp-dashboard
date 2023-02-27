//Importing data from Excel
let workbook = xlsx.readFile("./data/excelFiles/refuel@.xlsx");

let worksheet = workbook.Sheets[workbook.SheetNames[0]];


export const insertVehicle = async () => {
    const cars = [];
  
    for (let i = 2; i <= 23; i++) {
      const contractName = worksheet["B" + i].v
      const plate = worksheet["E" + i].v
      const manufacturer = worksheet["M" + i].v  !== undefined ? worksheet["M" + i].v : "Não Informado";
      const type = worksheet["K" + i].v !== undefined ? worksheet["K" + i].v : "Não Informado";
      const model = worksheet["N" + i].v !== undefined ? worksheet["N" + i].v : "Não Informado";
      const color = worksheet["Q" + i].v !== undefined ? worksheet["Q" + i].v : "Não Informado";
      const yearExcel = worksheet["O" + i].v !== undefined ? worksheet["O" + i].v : "Não Informado";
      const isActiveExcel = worksheet["S" + i].v !== undefined ? worksheet["S" + i].v : "Não Informado";
  
      const year =  yearExcel.substring(yearExcel.indexOf("/") + 1)
      const isActve = isActiveExcel === "Ativo" ? true : false
  
      const [contract] = await Contract.find({ name: contractName });
      const contractId = contract._id;
  
      await Vehicle.create({
        contractId: contractId,
        plate: plate,
        type: type,
        manufacturer: manufacturer,
        model: model,
        color: color,
        year: year,
        isActive: isActive,
      });
  
      const [newVehicleDb] = await Vehicle.find({ plate: plate });
      console.log("novo carro:", newVehicleDb);
  
      contract.vehicles.push(newVehicleDb._id);
  
      await contract.save();
    }
  };

  export const insertRefuelData = async () => {
    const refuelData = [];
  
    function ExcelDateToJSDate(date) {
      return new Date(Math.round((date - 25569) * 86400 * 1000));
    }
  
    for (let i = 5; i <= 823; i++) {
      console.log("Veículo atual", i - 1);
      const plate = worksheet["A" + i].v;
      const date = worksheet["B" + i].v;
      const quantity = worksheet["C" + i].v;
      const price = worksheet["D" + i].v;
      const fuelType = worksheet["E" + i].v;
  
      console.log(plate);
  
      const [vehicle] = await Vehicle.find({ plate: plate });
  
      if (vehicle) {
        const vehicleId = vehicle._id;
  
        refuelData.push({
          plate: plate,
          date: ExcelDateToJSDate(date),
          vehicle: vehicleId,
          quantity: quantity,
          price: price,
          fuelType: fuelType,
        });
      }
    }
  
    Refuel.insertMany(refuelData);
  };

