
const temprano = () => {
    console.log("Buenos días");
}

const tarde = () => {
    console.log("Buenas tardes");

}

const noche = () => {

    console.log("Buenas noches");

}

/* <----------- Common ----------->
module.exports = {
    temprano,
    tarde, 
    noche
}; 
   <----------- Common ----------->
*/

export {temprano, tarde, noche}