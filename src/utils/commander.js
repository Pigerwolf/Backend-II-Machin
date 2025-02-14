const { Command } = require("commander");

const program = new Command();

program

  .option("-p <port>", "puerto en el que se inicia el servidor", 8080)
  .option("--mode <mode>", "produccion", "desarrollo");

program.parse();

console.log("Opciones: ", program.opts());

module.exports = program;