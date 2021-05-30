public class ElectronicStore {
    String name;
    Desktop desktops[]={new Desktop(500, 8, 256, true),new Desktop(200, 6, 128, false),new Desktop(30, 4, 64, true)};
    Laptop laptops[]={new Laptop(200,32,32,true,14),new Laptop(100,16,400,false,12),new Laptop(400,8,972,false,10)};
    Fridge fridges[]={new Fridge(200,false,"green"),new Fridge(350,true,"white"),new Fridge(500,true,"platinum")};
    public ElectronicStore(String name) {   //makes arrays of constructors, and adds a name to the store
        this.name = name;
    }
    public static void printStock(Desktop[] desktops, Laptop[] laptops, Fridge[] fridges){  //prints all data on all objects
        for (int i=0;i<desktops.length;i++){
            System.out.println(desktops[i].toString());
        }
        for (int i=0;i<laptops.length;i++){
            System.out.println(laptops[i].toString());
        }
        for (int i=0;i<fridges.length;i++){
            System.out.println(fridges[i].toString());
        }
    }
    public static boolean searchStock(String thing,Desktop[] desktops, Laptop[] laptops, Fridge[] fridges){ //searches all objects for substring
        for (int i=0;i<desktops.length;i++){
            if (desktops[i].toString().toLowerCase().contains(thing.toLowerCase())){
                return true;
            }
        }
        for (int i=0;i<laptops.length;i++){
            if (laptops[i].toString().toLowerCase().contains(thing.toLowerCase())){
                return true;
            }
        }
        for (int i=0;i<fridges.length;i++){
            if (fridges[i].toString().toLowerCase().contains(thing.toLowerCase())){
                return true;
            }
        }
        return false;
    }
}