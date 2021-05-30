function landscape() {
  let result = "";
  let result2 = "";
  function flat(size) {
    for (let count = 0; count < size; count++){
      result += "_";
      result2 += " ";
	}
  }

  function hill(size) {
    result += "/";
    result2 += " ";
    for (let count = 0; count < size; count++){
      result += " ";
      result2 += "_";
  }
    result2 += " ";
    result += "\\";
  }

  //START BUILD SCRIPT
  flat(3);
  hill(4);
  flat(6);
  hill(1);
  flat(1);
  //END BUILD SCRIPT

  return result2+"\n"+result

}

console.log("")
console.log(landscape())
