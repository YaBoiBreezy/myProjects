
let list=[];

function add(){
    let inputText=document.getElementById("namelist").value;

    function checkDup(nameTemp){
        return nameTemp.name.toUpperCase() == inputText.toUpperCase();
    }

    if(!inputText=="" && !list.find(checkDup)){
        let item = {name:inputText, checked:false, highlighted:false, position:0};
        list.push(item);
        list.sort(function (a, b) {
            if(a.name.toUpperCase() < b.name.toUpperCase()){
                return -1;
            }
            if(a.name.toUpperCase() > b.name.toUpperCase()){
                return 1;
            }
            return 0;
          });
        updateList();
    }
    document.getElementById("namelist").value="";
}

function remove(){
    list = [];
    updateList();
}

function highlight(){
    list.forEach(function(item, index){
        if(item.checked){
            item.highlighted=!item.highlighted;
        }
    });
    updateList();
}


//Function to redraw all elements in the list.
function updateList(){
    let displayed = document.getElementById("textList");
    while(displayed.hasChildNodes()){
        displayed.removeChild(displayed.firstChild);
    }

    list.forEach(draw);
    function draw(value, index, array){
        let node = document.createElement("P");
        let textnode = document.createTextNode(value.name);
        node.append(textnode);
        if(value.highlighted){
            node.style.border = "2px solid yellow";
        }
        let checkbox = document.createElement("INPUT");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", value.name);
        checkbox.checked = value.checked;
        checkbox.onclick = function() {
            list.find(function(listObj){return listObj.name==checkbox.id;}).checked = checkbox.checked;
            //console.log(`Found: ${value.name}, check=${value.checked}`);//
        };
        node.appendChild(checkbox);
        displayed.appendChild(node);
    }
}
