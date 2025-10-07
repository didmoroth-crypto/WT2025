import fs from "fs";

class neadb {
  // Private function to update the lastUpdate field from the database json file
  private updateLastUpdated(data: any) {
    data["lastUpdated"] = new Date();
    return JSON.stringify(data);
  }
  // Creates DB instance file
  create() {
    const dbData = { createdAt: new Date(), lastUpdated: new Date() };
    fs.writeFile("./neadb.json", JSON.stringify(dbData), (err) => {
      if (err) throw err;
    });
  }

  // Creates database key
  createKey(key: string) {
    fs.readFile("./neadb.json", "utf-8", (err, data: string) => {
      if (err) throw err;
      let dbData = JSON.parse(data);
      dbData[key] = {};
      fs.writeFile("./neadb.json", this.updateLastUpdated(dbData), (err) => {
        if (err) throw err;
      });
    });
  }

  // Deletes given key from database
  deleteKey(key: string) {
    fs.readFile("./neadb.json", "utf-8", (err, data: string) => {
      if (err) throw err;
      let dbData = JSON.parse(data);
      if (dbData[key]) {
        delete dbData[key];
      } else {
        console.log("Key not found");
      }
      fs.writeFile("./neadb.json", this.updateLastUpdated(dbData), (err) => {
        if (err) throw err;
      });
    });
  }

  // Retrieves available keys from database
  getKeys() {
    fs.readFile("./neadb.json", "utf-8", (err, data: string) => {
      if (err) throw err;
      let dbData = JSON.parse(data);
      if (dbData) {
        return Object.keys(dbData);
      } else {
        console.log("No keys found");
      }
    });
  }

  // Adds data to given key
  storeValue(key: string, value: any) {
    fs.readFile("./neadb.json", "utf-8", (err, data: string) => {
      if (err) throw err;
      let dbData = JSON.parse(data);
      dbData[key] = value;
      fs.writeFile("./neadb.json", this.updateLastUpdated(dbData), (err) => {
        if (err) throw err;
      });
    });
  }

  // Removes data from given key
  deleteValue(key: string, value: any) {
    fs.readFile("./neadb.json", "utf-8", (err, data: string) => {
      if (err) throw err;
      let dbData = JSON.parse(data);
      dbData[key] = "";
      fs.writeFile("./neadb.json", this.updateLastUpdated(dbData), (err) => {
        if (err) throw err;
      });
    });
  }

  // Retrieves value from given key
  getValue(key: string) {
    fs.readFile("./neadb.json", "utf-8", (err, data: string) => {
      if (err) throw err;
      let dbData = JSON.parse(data);
      if (dbData[key]) {
        return dbData[key];
      } else {
        console.log("Key not found");
      }
    });
  }

  // Retrieves last updated date
  getLastUpdated() {
    fs.readFile("./neadb.json", "utf-8", (err, data: string) => {
      if (err) throw err;
      let dbData = JSON.parse(data);
      if (dbData["lastUpdated"]) {
        return dbData["lastUpdated"];
      } else {
        console.log("Date not found");
      }
    });
  }
}

module.exports = { neadb };
